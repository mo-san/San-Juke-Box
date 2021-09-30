import React from "react";
import { Hands, Results, NormalizedLandmarkList } from "@mediapipe/hands";
import Stats from "three/examples/jsm/libs/stats.module";
import { Line as KonvaLine } from "konva/lib/shapes/Line";
import { Rect as KonvaRect } from "konva/lib/shapes/Rect";
import { Stage as KonvaStage } from "konva/lib/Stage";
import { Camera } from "@mediapipe/camera_utils";
import { useStore } from "./Store";
import { WhichHand, Vector3 } from "../@types/types";

type Figures = {
  [key in WhichHand]: {
    fingers: KonvaLine[];
    penlight: KonvaRect;
    palm: KonvaLine;
    lastCoord: { [key in "x" | "y"]: number };
    lastProcessedTime: number;
  };
};

const findFingers = (which: "L" | "R", group: KonvaStage) => group.getLayers()[0]
  .getChildren((item) => item.name().startsWith(`Finger-${which}-`))
  .sort((a, b) => parseInt(a.name().substring(10)) - parseInt(b.name().substring(10))) as KonvaLine[];

const findPenLight = (group: KonvaStage) => group.getLayers()[1]
  .getChildren((item) => /Light-\d+/.test(item.name())) as KonvaRect[];

const findPalm = (which: "L" | "R", group: KonvaStage) => group.getLayers()[2]
  .getChildren((item) => item.name() === `Palm-${which}`)[0] as KonvaLine;


/**
 * On coordinates of joints of hands (called 'landmarks' in the MediaPipe's document)
 *
 * - x: 0.0 on the leftmost of the camera ～ 1.0 on the right end.
 * - y: 0.0 on the topmost of the camera ～ 1.0 on the bottom end.
 * - z: 0 for the wrist; more negative as your hand gets closer to the camera, more positove as it gets farther.
 * Z値の範囲は -0.15～+0.1 の間にあることが多い。カメラに向かって指差したときの指先のZ値で最大 -0.15 くらいになり、逆に向けると最大 +0.1 くらい。
 *
 * Hand connections
 *
 * | index | note | 備考 |
 * |--:|:--:|:--:|
 * | 0 | wrist | 手首 |
 * | 1 | thumb_cmc | 親指 付け根 |
 * | 2 | thumb_mcp | 親指 第二関節 |
 * | 3 | thumb_ip | 親指 第一関節 |
 * | 4 | thumb_tip | 親指 先端 |
 * | 5 | index_finger_mcp | 人差し指 付け根 |
 * | 6 | index_finger_pip | 人差し指 第二関節 |
 * | 7 | index_finger_dip | 人差し指 第一関節 |
 * | 8 | index_finger_tip | 人差し指 先端 |
 * | 9 | middle_finger_mcp | 中指 付け根 |
 * | 10 | middle_finger_pip | 中指 第二関節 |
 * | 11 | middle_finger_dip | 中指 第一関節 |
 * | 12 | middle_finger_tip | 中指 先端 |
 * | 13 | ring_finger_mcp | 薬指 付け根 |
 * | 14 | ring_finger_pip | 薬指 第二関節 |
 * | 15 | ring_finger_dip | 薬指 第一関節 |
 * | 16 | ring_finger_tip | 薬指 先端 |
 * | 17 | pinky_mcp | 小指 付け根 |
 * | 18 | pinky_pip | 小指 第二関節 |
 * | 19 | pinky_dip | 小指 第一関節 |
 * | 20 | pinky_tip | 小指 先端 |
 *
 * ![landmarks](https://google.github.io/mediapipe/images/mobile/hand_landmarks.png)
 */
export class HandHandler {
  videoElement: HTMLVideoElement;
  stats: Stats;
  canUseCamera: boolean;

  handsRecognizer?: Hands;
  handOptions: { maxNumHands: number; minDetectionConfidence: number; minTrackingConfidence: number; selfieMode: boolean };
  figures: Figures;
  penLights: KonvaRect[];

  /** the time between sampling the position of a hand (or a mouse). */
  timeThreshold = 1000 / 5; // 200ms
  sumMovement = 0;
  touchingFIngers: { [key: number]: KonvaRect } = {};

  constructor(refStage: React.RefObject<KonvaStage>, videoElement: HTMLVideoElement, canUseCamera: boolean, stats: Stats) {
    this.videoElement = videoElement;
    this.stats = stats;
    this.canUseCamera = canUseCamera;
    this.handOptions = {
      maxNumHands: useStore.getState().maxHands,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
      selfieMode: useStore.getState().selfieMode,
    };

    this.penLights = findPenLight(refStage.current!);
    this.figures = {
      Left: {
        fingers: findFingers("L", refStage.current!),
        penlight: this.penLights[0],
        palm: findPalm("L", refStage.current!),
        lastCoord: { x: 0, y: 0 },
        lastProcessedTime: 0,
      },
      Right: {
        fingers: findFingers("R", refStage.current!),
        penlight: this.penLights[1],
        palm: findPalm("R", refStage.current!),
        lastCoord: { x: 0, y: 0 },
        lastProcessedTime: 0,
      }
    };

    useStore.subscribe(
      (selfieMode) => this.handsRecognizer?.setOptions({ ...this.handOptions, selfieMode: selfieMode as boolean, }),
      (state) => state.selfieMode
    );

    if (!this.canUseCamera) {
      const lightHeight = this.penLights[0].height();
      this.penLights.forEach((light) => light.offsetY(lightHeight * 4 / 5));

      if (useStore.getState().isTouchDevice) {
        document.addEventListener("touchstart", this.#onTouchStart);
        document.addEventListener("touchend", this.#onTouchEnd);
        document.addEventListener("touchmove", this.#onTouchMoved);
      } else {
        document.addEventListener("mousedown", this.#onMouseDown);
        document.addEventListener("mouseup", this.#onMouseUp);
        document.addEventListener("mousemove", this.#onMouseMoved);
      }
    }

    this.#animate(0);
  }

  startRecognition = () => {
    if (this.handsRecognizer) return;
    setTimeout(this.initializeRecognizer, 1);

    new Camera(this.videoElement, {
      onFrame: async () => await this.handsRecognizer?.send({ image: this.videoElement }),
      width: 1, // default: 640
      height: 1, // default: 480
    }).start();
  };

  stopRecognition = () => {
    if (!this.handsRecognizer) return;
    this.handsRecognizer.close();
    this.handsRecognizer = undefined;
  };

  initializeRecognizer = () => {
    this.handsRecognizer = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3/${file}` // 消すと動かない
    });

    this.handsRecognizer.setOptions(this.handOptions);

    this.handsRecognizer.onResults(this.#onResult);
  };

  /**
   * Called after each recognition of an image to process the reognized finger points.
   * @param multiHandLandmarks An array of arrays of positions of fingers.
   * @param multiHandedness Index, confidence score, and label (left or right) of each recognized hand.
   * @param image Images of elements such as canvas or video or image, which are applicable to ctx.drawImage
   */
  #onResult = ({ multiHandLandmarks, multiHandedness }: Results) => {
    if (this.stats) this.stats.update();

    if (multiHandedness.length < 1) return;

    // video input for debug
    // const debugCanvasCtx = (document.querySelector("#canvas-debug") as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;
    // debugCanvasCtx.drawImage(image, 0, 0, debugCanvasCtx.canvas.width, debugCanvasCtx.canvas.height);

    const leftHandIndex = multiHandedness[0].label === "Left" ? 0 : 1;

    multiHandLandmarks.forEach((landmarkList, handIndex) => {
      const which: WhichHand = handIndex === leftHandIndex ? "Left" : "Right";

      this.#updateSkeleton(which, landmarkList);
      this.#updatePenLight(which, landmarkList);
      this.#updateEffectRank(which, landmarkList[9]);
    });
  }

  /**
   * Updates the position and shape of a hand.
   */
  #updateSkeleton = (which: WhichHand, landmarkList: NormalizedLandmarkList) => {
    const targets = [
      [2, 3, 4], // thumb
      [6, 7, 8], // index finger
      [10, 11, 12], // middle finger
      [14, 15, 16], // ring finger
      [18, 19, 20], // pinky
      [0, 1, 5, 9, 13, 17], // palm
    ];

    // set vertices for fingers
    this.figures[which].fingers.forEach((line, index) => {
      line.points(
        targets[index].map((num) => [landmarkList[num].x * window.innerWidth, landmarkList[num].y * window.innerHeight]).flat()
      );
    });

    // set vertices for the palm and close the path
    this.figures[which].palm
      .closed(true)
      .points(
        targets[5].map((num) => [landmarkList[num].x * window.innerWidth, landmarkList[num].y * window.innerHeight]).flat()
      );
  }

  /**
   * Updates the positions of a penlight.
   */
  #updatePenLight = (which: WhichHand, landmarkList: NormalizedLandmarkList) => {
    const folded = this.#isHandFolded(landmarkList);
    this.figures[which].penlight.visible(folded);
    if (folded) {
      this.figures[which].penlight.position({
        x: (landmarkList[0].x + landmarkList[9].x) / 2 * window.innerWidth,
        y: (landmarkList[0].y + landmarkList[9].y) / 2 * window.innerHeight
      });
      const angle = this.#rad2deg(this.#calcAngle(landmarkList));
      this.figures[which].penlight.rotation(which === "Left" ? -1 * angle : angle);
    }
  }

  /**
   * Determines if the movements of mice or fingers exceed the threshold. If so, dispatch the new rank.
   */
  #updateEffectRank = (which: WhichHand, point: { x: number; y: number }) => {
    const now = performance.now();
    if (now - this.figures[which].lastProcessedTime <= this.timeThreshold) return;
    this.figures[which].lastProcessedTime = now;

    const distance = this.#calcDistance(point, this.figures[which].lastCoord);
    this.figures[which].lastCoord = { x: point.x, y: point.y };

    const prevSum = this.sumMovement;
    const effectRankThreshold = useStore.getState().effectRankThreshold;
    for (let index = 0; index < effectRankThreshold.length; index++) {
      const threshold = effectRankThreshold[index];
      if (prevSum < threshold && (prevSum + distance) >= threshold) {
        const effectRank = index === 0 ? 4 : index === 1 ? 3 : index === 2 ? 2 : index === 3 ? 1 : 0;
        useStore.setState({ effectRank: effectRank });
        break;
      }
    }
    this.sumMovement += distance;
  }

  /**
   * Determines whether the fingers are folded, based on whether the index finger and the middle finger are both folded.
   */
  #isHandFolded = (landmarks: Vector3[]) => {
    const { x: v0x, y: v0y, z: v0z } = landmarks[0];
    const { x: v5x, y: v5y, z: v5z } = landmarks[5];
    const { x: v8x, y: v8y, z: v8z } = landmarks[8];
    const { x: v9x, y: v9y, z: v9z } = landmarks[9];
    const { x: v12x, y: v12y, z: v12z } = landmarks[12];

    const vec5to0 = { x: v0x - v5x, y: v0y - v5y, z: v0z - v5z };
    const vec5to8 = { x: v8x - v5x, y: v8y - v5y, z: v8z - v5z };
    const isIndexFingerFolded = this.#hasSharpAngle(vec5to0, vec5to8);

    const vec9to0 = { x: v0x - v9x, y: v0y - v9y, z: v0z - v9z };
    const vec9to12 = { x: v12x - v9x, y: v12y - v9y, z: v12z - v9z };
    const isMiddleFingerFolded = this.#hasSharpAngle(vec9to0, vec9to12);

    return isIndexFingerFolded && isMiddleFingerFolded;
  }

  /**
   * Calculates the distance between two points.
   */
  #calcDistance = ({ x: x1, y: y1 }: { x: number; y: number }, { x: x2, y: y2 }: { x: number; y: number }) => (
    Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  );

  /**
   * Determines whether the angle made by the two vectors is sharp.
   */
  #hasSharpAngle = (vec1: Vector3, vec2: Vector3) => {
    const denominator = this.#calcDenominator(vec1, vec2);
    if (denominator === 0) return true; // when 90 degree (PI / 2)
    const dot = this.#calcDot(vec1, vec2);
    return (dot / denominator) >= 0; // when cosine is zero or more (== 90 degree or less)
  };

  /**
   * Returns the angle in degrees between the bottom of the index finger and the bottom of the ring finger.
   */
  #calcAngle = (landmarks: Vector3[]) => {
    const { x: v5x, y: v5y, z: v5z } = landmarks[5];
    const { x: v13x, y: v13y, z: v13z } = landmarks[13];

    const vec13to5 = { x: v5x - v13x, y: v5y - v13y, z: v5z - v13z };
    const vecUpright = { x: 0, y: 1, z: 0 };
    const denominator = this.#calcDenominator(vec13to5, vecUpright);
    // avoid zero division if denominator is zero (i.e. vectors are vertical)
    return Math.acos(denominator === 0 ? 0 : (this.#calcDot(vec13to5, vecUpright) / denominator));
  }

  /**
   * Calculates the number to be used as a denominator of cosine.
   */
  #calcDenominator = (vec1: Vector3, vec2: Vector3) => Math.sqrt(
    (vec1.x * vec1.x + vec1.y * vec1.y + vec1.z * vec1.z) * (vec2.x * vec2.x + vec2.y * vec2.y + vec2.z * vec2.z)
  );

  /**
   * Calculates the dot product of two vectors.
   */
  #calcDot = (vec1: Vector3, vec2: Vector3) => (vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z);

  #rad2deg = (num: number) => num * 57.29578;

  // #clamp = (a: number, lower: number, upper: number) => Math.max(Math.min(lower, upper), Math.min(Math.max(lower, upper), a));
  //
  // #lerp = (middle: number, x0: number, x1: number, y0: number, y1: number) => {
  //   const inner = (y0 * (1 - (middle - x0) / (x1 - x0))) + (y1 * (1 - (x1 - middle) / (x1 - x0)));
  //   return this.#clamp(inner, y0, y1);
  // }

  #onMouseDown = (event: MouseEvent) => {
    this.penLights[0].visible(true);
    this.penLights[0].x(event.screenX);
    this.penLights[0].y(event.screenY);
  }

  #onMouseUp = (_: MouseEvent) => {
    this.penLights[0].visible(false);
  }

  /**
   * Move one light following the mouse.
   */
  #onMouseMoved = (event: MouseEvent) => {
    this.penLights[0].x(event.screenX);
    this.penLights[0].y(event.screenY);
  }

  /**
   * Set lights visible depending on touching fingers.
   */
  #onTouchStart = (event: TouchEvent) => {
    const num = Object.keys(this.touchingFIngers).length;
    if (num >= 10) return;

    for (let i = 0; i < Math.min(9, event.changedTouches.length); i++) {
      this.touchingFIngers[event.changedTouches[i].identifier] = this.penLights[num];
    }

    Object.entries(this.touchingFIngers).forEach(([, penlight]) => penlight.visible(true));
  }

  /**
   * Set lights invisible corresponding the released touch IDs.
   */
  #onTouchEnd = (event: TouchEvent) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      this.touchingFIngers[event.changedTouches[i].identifier].visible(false);
      delete this.touchingFIngers[event.changedTouches[i].identifier];
    }
  }

  /**
   * Move lights following currently touching fingers position.
   */
  #onTouchMoved = (event: TouchEvent) => {
    for (let i = 0; i < event.changedTouches.length; i++) {
      const touch = event.changedTouches[i];
      const penlight = this.touchingFIngers[touch.identifier];
      penlight.x(touch.clientX);
      penlight.y(touch.clientY);
    }
  }

  #animate = (time: number) => {
    requestAnimationFrame(this.#animate);

    if (useStore.getState().effectRank >= 1) {
      // Brightness accepts number from -1 to 1
      const brightness = Math.sin(time / 1000 * Math.PI) * (1 / 3) + (1 / 3);
      this.penLights.filter((light) => light.visible()).forEach((light) => light.brightness(brightness));
    }

    if (!this.canUseCamera) {
      const rad = Math.asin(Math.sin(time / 1000 * Math.PI) / 1.41);
      const angle = this.#rad2deg(rad);
      this.penLights.filter((light) => light.visible()).forEach((light) => light.rotation(angle));
    }
  }
}
