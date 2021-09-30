import * as THREE from "three";
// import { SkinnedMesh } from "three/src/objects/SkinnedMesh";
// import { AnimationAction } from "three/src/animation/AnimationAction";

export type WhichHand = "Left" | "Right";
export type Vector3 = { x: number; y: number; z: number };

/**
 * 曲
 */
export type SongTitle =
  | "First Note"
  | "Freedom!"
  | "その心に灯る色は"
  | "嘘も本当も君だから"
  | "夏をなぞって"
  | "密かなる交信曲"

export type SongData = {
  title: SongTitle;
  composer: string;
  videoUrl: string;
  thumbnailUrl: string;
  initialOrder: number;
  video: {
    beatId: number;
    repetitiveSegmentId: number;
    lyricId: number;
    lyricDiffId: number;
  };
  bpm: number;
  words: number[];
  furigana: { position: number; span: number; text: string }[];
};

/**
 * MMD 関連
 */

export type MmdModelName =
  | "nendo_kaito"
  | "nendo_len"
  | "nendo_luka"
  | "nendo_meiko"
  | "nendo_miku"
  | "nendo_rin"

export type MmdMotionName =
  | "スクワット"
  | "ヘドバン"
  | "首振り"
  | "メトロノーム"
  | "左手上下"
  | "右手上下"

export interface MmdModelData {
  name: MmdModelName;
  url: string;
  modelMesh: THREE.SkinnedMesh | null;
  morphs: { [key: string]: number };
  mortions: THREE.AnimationAction[];
  poseIndex: number;
}

export interface MmdPoseData {
  metadata: { coordinateSystem: string; parentFile: string[]; boneCount: number };
  bones: any[];
}


/**
 * 設定
 */

export type languages =
  | "ja"
  | "en"
  | "it"

export type googleFontNames =
  | "Dela Gothic One"
  | "DotGothic16"
  | "Hachi Maru Pop"
  | "Hina Mincho"
  | "Kaisei Decol"
  | "Kaisei HarunoUmi"
  | "Kaisei Opti"
  | "Kaisei Tokumin"
  | "Kiwi Maru"
  | "Klee One"
  | "Kosugi Maru"
  | "Kosugi"
  | "M PLUS 1p"
  | "M PLUS Rounded 1c"
  | "New Tegomin"
  | "Noto Sans JP"
  | "Noto Serif JP"
  | "Otomanopee One"
  | "Palette Mosaic"
  | "Potta One"
  | "Rampart One"
  | "Reggae One"
  | "RocknRoll One"
  | "Sawarabi Gothic"
  | "Sawarabi Mincho"
  | "Shippori Mincho B1"
  | "Shippori Mincho"
  | "Stick"
  | "Train One"
  | "Yomogi"
  | "Yusei Magic"
