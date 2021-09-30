import React from "react";
import * as THREE from "three";
import TextSprite from "@seregpie/three.text-sprite";
import { GLTFLoader, OrbitControls } from "three-stdlib";
import Stats from "three/examples/jsm/libs/stats.module";
import gsap from "gsap";
import { MmdModelName } from "../@types/types";
import { loadFont, guiPanelForMorphs } from "./Utils";
import { useStore } from "./Store";
import { MMD } from "./MMD";
import { LetterPainter } from "./LetterPainter";
import { TextAlive } from "./TextAlive";
import { ThreeBase } from "./ThreeBase";
import { Util } from "konva/lib/Util";

// eslint-disable-next-line no-var
declare var Ammo: any;

export class Stage extends ThreeBase {
  /**
   * currently selected font for rendering sprite particles
   */
  font?: string;
  /**
   * the lyric text of currently playing song
   */
  lyricText?: string;
  lyricsChars: Map<number, TextSprite> = new Map<number, TextSprite>();

  refTextAlive?: React.MutableRefObject<TextAlive>;

  // controls?: OrbitControls;
  timer: THREE.Clock;
  stats?: Stats;

  _previousBpm = 0;
  effectRank: 0 | 1 | 2 | 3 | 4 = 0;

  constructor(canvas: HTMLCanvasElement, stats?: Stats) {
    super(canvas, "Perspective");
    if (stats) this.stats = stats;
    this.timer = new THREE.Clock();
    const floor = new THREE.PolarGridHelper(500);
    this.scene.add(floor);
    this.camera.position.y = 5;
    // this.controls = this.createController();
    useStore.subscribe(
      (effectRank) => {
        console.info(`new effect rank: ${effectRank}`);
        this.effectRank = effectRank as 0 | 1 | 2 | 3 | 4;
      },
      (state) => state.effectRank
    );

    this.refTextAlive = useStore.getState().refTextAlive;
    this.init();
  }

  /**
   * Starts app with loading physics engine.
   * I think some explanations needed about this queer initializing for a physics engine.
   * Here is the reason why ( cited from https://www.npmjs.com/package/ammojs-typed ):
   *
   * **********
   * Then import ammo like this
   * ```javascript
   * import Ammo from 'ammojs-typed'
   * ```
   *
   * This works but be cautious here. The default import gives you the bootstrap function.
   * After bootstrapping the api is not available through the Ammo symbol by default.
   *
   * ```javascript
   * Ammo().then(api => {
   *   const v1 = new api.btVector3(1, 2, 3)
   *   const v2 = new Ammo.btVector3(1, 2, 3) // <-- runtime error here
   * })
   * ```
   *
   * You can work around that by booting like this
   * ```javascript
   * Ammo(Ammo).then(() => { const v2 = new Ammo.btVector3(1, 2, 3) }) // <-- works
   * ```
   */
  init = async () => {
    await Ammo(Ammo);

    this.scene.add(await this.#addAudience());
    this.#animate(0);
  }

  #animate = (time: number) => {
    const deltaSeconds = this.timer.getDelta();

    setTimeout(() => {
      requestAnimationFrame((time) => this.#animate(time));
    }, 1000 / 60 / this.frameRateWeight);

    const { selectedModelNames } = useStore.getState();
    this.#withTextAlive(selectedModelNames);

    for (const modelName of selectedModelNames) {
      time % 1000 <= 40 && MMD.blink(modelName, 0);
      time % 1000 >= 500 && time % 1000 <= 550 && MMD.blink(modelName, 1);
      Math.random() > 0.95 && MMD.mouthFlap(modelName, Math.random());
    }

    this.camera.lookAt(new THREE.Vector3(0, 6, 0));
    // this.controls?.update();
    this.stats?.update();

    (this.effect ?? this.renderer).render(this.scene, this.camera);
    MMD.helper.update(deltaSeconds);
  }

  letterPainter = async () => {
    await loadFont(useStore.getState().fontName);
    return new LetterPainter(this.lyricText as string).movingParticles;
  }

  addModel = async (modelName: MmdModelName) => {
    const model = await MMD.loadMmdModel(modelName);
    await MMD.loadMotion(modelName, model);

    // guiPanelForPoses(modelName);
    guiPanelForMorphs(modelName);

    model.visible = false;
    this.scene.add(model);
    const sampled = MMD.createSampler(model, modelName);
    this.scene.add(sampled);
    gsap
      .timeline()
      .to(sampled.material.uniforms.progress, {
        value: 1.0,
        duration: 2,
        onComplete: () => {
          sampled.visible = false;
          model.visible = true;
        },
      });
  }

  removeModel = async (modelName: MmdModelName) => {
    this.scene.getObjectByName(modelName)?.removeFromParent();
  }

  createController = () => {
    const controls = new OrbitControls(this.camera, document.querySelector("article") as HTMLElement);
    controls.rotateSpeed = 3.0;
    return controls;
  }

  #addAudience = async () => {
    const gpuTier = useStore.getState().gpuTier;
    const count = gpuTier > 2 ? 700 : gpuTier === 2 ? 300 : 150;
    const originVector = new THREE.Vector3(0, 0, 0);
    // forbid enter of the audience into the center of the stage
    const limitRadius = 20;
    const dummyColor = new THREE.Color();

    const getPosition = (): THREE.Vector3 => {
      const theta = Math.random() * 2 * Math.PI;
      const radius = Math.random() * 400;
      const pos = new THREE.Vector3(Math.sin(theta) * radius, 0, Math.cos(theta) * radius);
      return (pos.lengthSq() >= limitRadius * limitRadius) ? pos : getPosition();
    };

    const gltf = await new GLTFLoader().loadAsync("assets/models/BlockMan/BlockMan.glb");
    const { geometry, material } = gltf.scene.getObjectByName("Proxy") as THREE.Mesh;
    const _geometry = geometry.clone();
    _geometry.scale(0.1, 0.1, 0.1);

    const blockman = new THREE.InstancedMesh(_geometry, material, count);

    for (let i = 0; i < count; i++) {
      // make the random color a little brighter
      const color = Math.min(parseInt(Util.getRandomColor().slice(1), 16) * 1.2, 0xffffff);
      dummyColor.set(color);
      blockman.setColorAt(i, dummyColor);

      const newPosition = getPosition();
      blockman.setMatrixAt(i, new THREE.Matrix4().setPosition(newPosition).lookAt(originVector, newPosition, blockman.up));
    }

    blockman.instanceMatrix.needsUpdate = true;
    return blockman;
  }

  #withTextAlive = (selectedModelNames: MmdModelName[]) => {
    const bpmElm = document.getElementById("BPM");
    const letterElm = document.getElementById("Letter");
    const furiganaElm = document.getElementById("Furigana");
    if (!bpmElm || !letterElm || !furiganaElm) return;

    const currentBpm = this.refTextAlive?.current.currentBpm ?? 0;
    if (currentBpm !== this._previousBpm) {
      this._previousBpm = currentBpm;
    }
    for (const modelName of selectedModelNames) {
      const motion = MMD.findMotion(modelName, "スクワット");
      if (!motion) continue;
      motion.timeScale = currentBpm / 120;
    }
    bpmElm.textContent = String(this.refTextAlive?.current.currentBpm ?? 0);
    letterElm.textContent = this.refTextAlive?.current.currentLetter?.letter ?? "";
    furiganaElm.textContent = this.refTextAlive?.current.currentFurigana ?? "";
  }

  onModelUpdated = (modelsAfter: MmdModelName[], modelsBefore: MmdModelName[]) => {
    const added = (modelsAfter as MmdModelName[]).filter((item) => !(modelsBefore as MmdModelName[]).includes(item));
    const removed = (modelsBefore as MmdModelName[]).filter((item) => !(modelsAfter as MmdModelName[]).includes(item));
    added.forEach((model) => this.addModel(model));
    removed.forEach((model) => this.removeModel(model));
  };

  // #createTextSprite = (text: string, fontName: googleFontNames = useStore.getState().fontName) => {
  //   return new TextSprite({
  //     color: "rgb(87,161,150)",
  //     fontFamily: fontName,
  //     fontSize: 6,
  //     // strokeColor: "rgba(0, 0, 0, 1)",
  //     // strokeWidth: 0.007,
  //     text: text,
  //   });
  // }

  // #renderSprite = () => {
  //   this.lyricsChars.forEach((sprite) => {
  //     sprite.position.set(Math.random() * 200 - 100, Math.random() * 200 - 80, Math.random() * 200);
  //     this.scene.add(sprite);
  //   });
  // }
}
