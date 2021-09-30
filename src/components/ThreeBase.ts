import * as THREE from "three";
import { OutlineEffect } from "three-stdlib";
import { useStore } from "./Store";

/**
 * THREE.js のプロジェクトのテンプレート。
 */
export class ThreeBase {
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  renderer: THREE.WebGLRenderer;
  effect?: OutlineEffect;
  frameRateWeight: 1 | 2 | 3 = 1;
  frames = 0;

  constructor(canvas: HTMLCanvasElement, cameraType: "Perspective" | "Orthographic") {
    this.canvas = canvas;
    this.renderer = this.#createRenderer();
    if (cameraType === "Perspective") {
      this.effect = new OutlineEffect(this.renderer);
    }
    this.camera = this.#createCamera(cameraType);
    this.scene = this.#createScene();
    this.scene.add(this.#createAmbientLight("#666666"));
    this.scene.add(this.#createDirectionalLight("#887766"));
    this.frameRateWeight = this.getFrameRateWeight();

    window.addEventListener("resize", this.#onWindowResize);
  }

  #createRenderer = (): THREE.WebGLRenderer => {
    const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: true, antialias: true, });
    // to make the background fully transparent
    renderer.setClearColor("#ffffff", 0);
    // to reduce computation load on mobile devices
    // renderer.setPixelRatio(1);
    renderer.setPixelRatio(window.devicePixelRatio);
    // fullscreen
    renderer.setSize(window.innerWidth, window.innerHeight);
    return renderer;
  }

  #createScene = (): THREE.Scene => {
    const scene = new THREE.Scene();
    scene.background = null;
    return scene;
  }

  #createCamera = (cameraType: "Perspective" | "Orthographic") => {
    // for the canvas element for hand tracking
    if (cameraType === "Orthographic") {
      // arguments: left, right, top, bottom, near, far
      const camera = new THREE.OrthographicCamera(0, 100, 100, 0, 0.1, 10_000);
      camera.position.set(0, 0, 20); // カメラを遠ざける
      return camera;
    }
    // for the canvas for main rendering
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100_000);
    // arguments: field of view, aspect ratio, near, far
    camera.position.set(0, 0, 20);// カメラを遠ざける
    return camera;
  }

  #createAmbientLight = (color: THREE.Color | string | number) => new THREE.AmbientLight(color)

  #createDirectionalLight = (color: THREE.Color | string | number) => {
    const directionalLight = new THREE.DirectionalLight(color);
    directionalLight.position.set(-1, 1, 1).normalize();
    return directionalLight;
  }

  #onWindowResize = () => {
    if (this.camera instanceof THREE.PerspectiveCamera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    (this.effect ?? this.renderer).setSize(window.innerWidth, window.innerHeight);
  }

  getFrameRateWeight = () => {
    const gpuTier = useStore.getState().gpuTier;
    if (useStore.getState().isMobileGpu) {
      if (gpuTier > 2) return 1;
      if (gpuTier === 2) return 2;
      if (gpuTier < 2) return 3;
    }
    if (gpuTier > 2) return 1;
    if (gpuTier === 2) return 2;
    if (gpuTier < 2) return 3;
    return 1;
  }
}
