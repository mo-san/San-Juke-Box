import * as THREE from "three";
import gsap, { Cubic, Expo } from "gsap";
import MotionPathPlugin from "gsap/dist/MotionPathPlugin";
import { googleFontNames } from "../@types/types";
import { useStore } from "./Store";

gsap.registerPlugin(MotionPathPlugin);

/**
 * 文字たちが絵や別の文字を構成するエフェクト
 */
class LetterPainter {
  public movingParticles = new THREE.Object3D();

  protected particlesList: THREE.Mesh<THREE.PlaneBufferGeometry, THREE.MeshLambertMaterial>[] = [];

  /**
   * 背景となる、画像へのURL(同一オリジン)や文字列。
   * index.html からの相対パス。
   */
  protected silhouette = "img/logo.min.svg";

  /**
   * 背景に画像でなく文字を使う場合の、背景のフォントサイズ
   */
  protected fontSize = 42;

  /**
   * スプライトが描かれるキャンバスの幅
   */
  protected spriteCanvasWidth = 250;

  /**
   * スプライトが描かれるキャンバスの高さ
   */
  protected spriteCanvasHeight = 100;

  /**
   * スプライトの一行あたりの文字数
   */
  protected spriteCharsPerLine = 8;

  /**
   * スプライトでの一文字あたりの幅のピクセル数
   */
  protected spritePixelsPerDimension = 256;

  /**
   * 一文字ごとに浮遊する文字たち。最終的に背景の輪郭を構成する。
   */
  protected spriteString: string;

  /**
   * 浮遊する文字たちのフォント
   */
  protected spriteFont: googleFontNames = useStore.getState().fontName;

  constructor(words: string) {
    this.spriteString = words;
    this.init();
  }

  private init = async () => {
    const texture = this.createSprite();
    this.particlesList = this.createLetterParticle(texture);
    // 背景となる絵や文字をつくり、その形にあわせて文字を浮遊させる
    const canvas = await this.createCanvasForSilhouette();
    this.createMovingLetters(canvas);
  }

  public changeFont = (font: googleFontNames) => {
    this.spriteFont = font;
    this.particlesList = [];
    this.movingParticles = new THREE.Object3D();
    this.init();
  }

  /**
   * 絵の部品となる文字たちが集まったシートを作る
   */
  private createSprite = () => {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${this.spritePixelsPerDimension * this.spriteCharsPerLine}px`);
    canvas.setAttribute("height", `${this.spritePixelsPerDimension * this.spriteCharsPerLine}px`);

    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    context.fillStyle = "white";
    context.font = `200px ${this.spriteFont}`;
    context.textAlign = "center";
    context.textBaseline = "middle";

    const len = this.spriteCharsPerLine * this.spriteCharsPerLine;
    for (let i = 0; i < len; i++) {
      const x = this.spritePixelsPerDimension * (i % this.spriteCharsPerLine) + this.spritePixelsPerDimension / 2;
      const y = this.spritePixelsPerDimension * Math.floor(i / this.spriteCharsPerLine) + this.spritePixelsPerDimension / 2;
      context.fillText(this.spriteString[i], x, y);
    }

    return new THREE.CanvasTexture(canvas);
  };

  /**
   * スプライトの中でジオメトリをずらす
   */
  private getUvRandomizedGeometry = () => {
    // 一文字分のマス目の幅(と高さ)。テクスチャの座標は 0.0 ～ 1.0
    const unit = 1 / this.spriteCharsPerLine;
    // 何文字分ずらすか
    const offsetX = Math.floor(this.spriteCharsPerLine * Math.random());
    const offsetY = Math.floor(this.spriteCharsPerLine * Math.random());

    const geometry = new THREE.PlaneBufferGeometry(40, 40);
    const uvAttribute = geometry.getAttribute("uv") as THREE.BufferAttribute;
    const uv = new THREE.Vector2();

    for (let i = 0; i < uvAttribute.count; i++) {
      const vector2 = uv.fromBufferAttribute(uvAttribute, i); // pseudo code: vector2 = uvAttribute[i]
      uvAttribute.setXY(i, unit * (vector2.x + offsetX), unit * (vector2.y + offsetY)); // pseudo code: uvAttribute[i] = (x, y)
    }

    return geometry;
  }

  /**
   * 浮遊する文字たちの一つ一つをパーティクルにする
   */
  private createLetterParticle = (texture: THREE.Texture) => {
    const particleList: THREE.Mesh[] = [];
    for (let i = 0; i < this.spriteCanvasWidth; i++) {
      for (let j = 0; j < this.spriteCanvasHeight; j++) {
        const geometry = this.getUvRandomizedGeometry();

        const material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          map: texture,
          transparent: true,
          side: THREE.DoubleSide,
        });

        material.blending = THREE.AdditiveBlending;

        const word = new THREE.Mesh(geometry, material);
        particleList.push(word);
      }
    }
    return particleList as THREE.Mesh<THREE.PlaneBufferGeometry, THREE.MeshLambertMaterial>[];
  };

  private loadImage = (src: string): Promise<HTMLImageElement> => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });

  /**
   * 輪郭となる文字列が書かれたキャンバスを作る。文字列の代わりに画像のURLが指定された場合はそれを読み込んだ上で返す。
   */
  private createCanvasForSilhouette = async (): Promise<HTMLCanvasElement> => {
    const label = this.silhouette;
    const canvas = document.createElement("canvas");
    canvas.setAttribute("width", `${this.spriteCanvasWidth}px`);
    canvas.setAttribute("height", `${this.spriteCanvasHeight}px`);
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;

    if (/\.(png|jpg|webp|bmp|gif|svg)$/.test(label)) {
      const res = await this.loadImage(label);
      console.info(`Image loaded. width: ${res.width}, height: ${res.height}`);
      context.drawImage(res, 0, 0);
    } else {
      context.fillStyle = "white";
      context.font = `${this.fontSize}px ${this.spriteFont}`;
      context.textAlign = "center";
      context.textBaseline = "top";
      context.fillText(label, this.spriteCanvasWidth / 2, 0);
    }

    return canvas;
  }

  /**
   * 一文字ごとの移動を作成する
   */
  private createMovingLetters = (canvas: HTMLCanvasElement) => {
    const pathFrom = () => ({
      x: 2000 * (Math.random() - 0.5) - 500,
      y: 1000 * (Math.random() - 0.5),
      z: 10_000,
    });

    const pathTo = (horizontalPos: number, verticalPos: number) => ({
      x: (horizontalPos - canvas.width / 2) * 30,
      y: (canvas.height / 2 - verticalPos) * 30,
      z: 0,
    });

    const setStateOnParticle = (particle: THREE.Mesh<THREE.PlaneBufferGeometry, THREE.MeshLambertMaterial>, from: { x: number; y: number; z: number }) => {
      const item = particle;
      item.position.x = from.x;
      item.position.y = from.y;
      item.position.z = from.z;
      item.rotation.z = 10 * Math.PI * (Math.random() - 0.5);
      return item;
    };

    const setTimeLine = (
      particle: THREE.Mesh<THREE.PlaneBufferGeometry, THREE.MeshLambertMaterial>,
      delay: number,
      from: { x: number; y: number; z: number },
      to: { x: number; y: number; z: number }
    ) => {
      gsap.timeline()
        .set(particle, { visible: true }, delay)
        .to(particle.rotation, { z: 0, ease: Cubic.easeInOut, duration: 6.0, }, delay)
        .to(particle.position, {
          delay: delay,
          ease: Expo.easeInOut,
          duration: 7.0,
          motionPath: {
            path: [
              from,
              {
                x: (to.x) / 2 + 300,
                y: (from.y + to.y) / 2 + 500 * Math.random(),
                z: (from.z + to.z) / 2,
              },
              to,
            ],
          },
        },
        0);
    };

    this.particlesList.forEach((item) => {
      item.visible = false;
      item.material.blending = THREE.AdditiveBlending;
    });

    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const pixcelColors = ctx.getImageData(0, 0, this.spriteCanvasWidth, this.spriteCanvasHeight).data;
    let index = -1;
    for (let hori = 0; hori < this.spriteCanvasWidth; hori++) {
      for (let vert = 0; vert < this.spriteCanvasHeight; vert++) {
        // 透過していたら処理を打ち切る
        if (pixcelColors[(hori + vert * this.spriteCanvasWidth) * 4 + 3] === 0) continue;

        index += 1;
        const from = pathFrom();
        const to = pathTo(hori, vert);
        const delay = Cubic.easeInOut(index / 1600) * 3.0 + 1.5 * Math.random();
        const particle = setStateOnParticle(this.particlesList[index], from);
        this.movingParticles.add(particle);
        setTimeLine(particle, delay, from, to);
      }
    }
  }
}

export { LetterPainter };
