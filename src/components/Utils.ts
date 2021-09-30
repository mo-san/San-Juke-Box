import * as THREE from "three";
import Stats from "three/examples/jsm/libs/stats.module";
import * as WebFont from "webfontloader";
import { googleFontNames, MmdModelName } from "../@types/types";
import { useStore } from "./Store";
import { Pane } from "tweakpane";
import { MMD } from "./MMD";


export const tweakPane = new Pane({ title: "Config" });

export const statsStage = Stats();
export const statsHands = Stats();


/**
 * Webフォントを読み込む。
 * Webフォントが使用可能になったら呼び出し元に戻る。
 */
export const loadFont = (fontName: googleFontNames | googleFontNames[]): Promise<void> => new Promise((resolve) => {
  WebFont.load({
    active: () => resolve(),
    google: {
      families: Array.isArray(fontName) ? fontName : [fontName],
      text: useStore.getState().allGlyphs,
    }
  });
});

export const create3dText = (fontJson: string, text: string, group: THREE.Group | THREE.Scene) => {
  new THREE.FontLoader().load(fontJson, (font) => {
    const textGeo = new THREE.TextGeometry(text, {
      font: font,
      size: 7,
      height: 1,
      curveSegments: 10,
      bevelThickness: 1,
      bevelSize: 0.2,
      bevelEnabled: true
    });

    const materials = [
      new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
      new THREE.MeshPhongMaterial({ color: 0xffffff }) // side
    ];

    textGeo.computeBoundingBox();
    const centerOffset = !textGeo.boundingBox ? 0 : (-0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x));

    const textMesh = new THREE.Mesh(textGeo, materials);
    textMesh.position.set(centerOffset, -20, 0);
    group.add(textMesh);
  });
};

export function guiMmdModels() {
  const models: { [key in MmdModelName]: boolean } = {
    nendo_miku: false,
    nendo_kaito: false,
    nendo_len: false,
    nendo_luka: false,
    nendo_meiko: false,
    nendo_rin: false,
  };

  const modelsPos: { [key in MmdModelName]: { x: number; y: number; z: number } } = {
    nendo_miku: { x: 0, y: 0, z: 0 },
    nendo_kaito: { x: 0, y: 0, z: 0 },
    nendo_len: { x: 0, y: 0, z: 0 },
    nendo_luka: { x: 0, y: 0, z: 0 },
    nendo_meiko: { x: 0, y: 0, z: 0 },
    nendo_rin: { x: 0, y: 0, z: 0 },
  };

  const mmdFolder = tweakPane.addFolder({ title: "MMD モデル", expanded: true, });
  Object.keys(models).forEach((name) => {
    const folder = mmdFolder.addFolder({ title: name, expanded: false });
    folder
      .addInput(models, name)
      .on("change", (ev) => {
        ev.value ? useStore.getState().addMmdModel(name as MmdModelName) : useStore.getState().removeMmdModel(name as MmdModelName);
      });
    folder
      .addInput(modelsPos, name, { min: -1000, max: 1000 })
      .on("change", (ev) => {
        const value = ev.value as any as { x: number; y: number; z: number };
        useStore.getState().instanceStage?.scene.getObjectByName(name)?.position.set(value.x, value.y, value.z);
      });
  });
}

export function guiFonts() {
  const allFontNames = useStore.getState().fontsGoogle;
  const allFonts = Object.fromEntries([...allFontNames].map((fontName) => [fontName, false]));
  const fontFolder = tweakPane.addFolder({ title: "Fonts", expanded: false, });

  allFontNames.forEach((fontName) => {
    fontFolder.addInput(allFonts, fontName)
      .on("change", (ev) => {
        ev.value && useStore.setState({ fontName: fontName });
      });
  });
}

// export function guiPanelForPoses(modelName: MmdModelName) {
//   const getBaseName = (s: string): string => s.slice(s.lastIndexOf("/") + 1);
//
//   const poseChoices = Object.fromEntries([
//     ["default", -1],
//     ...poseFiles.map((value, index) => [getBaseName(value), index])
//   ]) as { [key: string]: number };
//
//   tweakPane
//     .addFolder({ title: `Poses (${modelName})`, expanded: true })
//     .addInput(MMD.findModelByName(modelName), "poseIndex", { options: poseChoices })
//     .on("change", (ev) => MMD.updatePose(modelName, ev.value as number));
// }

export function guiPanelForMorphs(modelName: MmdModelName) {
  const dictionary = MMD.findModelByName(modelName).modelMesh?.morphTargetDictionary ?? {};
  MMD.findModelByName(modelName).morphs = Object.fromEntries(Object.keys(dictionary).map((morphName) => [morphName, 0]));

  const morphFolder = tweakPane.addFolder({ title: `Morphs (${modelName})`, expanded: false });
  Object.keys(dictionary).forEach((morphName) =>
    morphFolder
      .addInput(MMD.findModelByName(modelName).morphs, morphName, { min: 0, max: 1, step: 0.1 })
      .on("change", (ev) => MMD.updateMorph(modelName, morphName, ev.value))
  );
}

// export function guiPenLight() {
//   const light = { visible: false };
//   tweakPane.addFolder({ title: "Pen Light" })
//     .addInput(light, "visible")
//     .on("change", (ev) => ev.value ? "on" : "off");
// }

// function guiPaper(geometry: THREE.InstancedBufferGeometry, instances: number) {
//   tweakPane
//     .addFolder({ title: "紙吹雪", expanded: true })
//     .addInput(geometry, "instanceCount", { min: 0, max: instances, step: 1 });
// }

/* enables drag-to-move on TweakPane window */
// function enableDragMovePane(clickTarget: string, moveTarget?: string) {
//   function onMouseMove(event: MouseEvent) {
//     const x = event.clientX;
//     const y = event.clientY;
//     const width = titleBar.offsetWidth;
//     const height = titleBar.offsetHeight;
//     pane.style.top = (y - height / 2) + "px";
//     pane.style.left = (x - width / 2) + "px";
//   }
//
//   const titleBar = document.querySelector(clickTarget) as HTMLElement;
//   const pane = !moveTarget ? titleBar : document.querySelector(moveTarget) as HTMLElement;
//
//   titleBar.addEventListener("mousedown", () => document.addEventListener("mousemove", onMouseMove));
//   titleBar.addEventListener("mouseup", () => document.removeEventListener("mousemove", onMouseMove));
// }
//
// enableDragMovePane(".tp-rotv_t", ".tp-dfwv");
