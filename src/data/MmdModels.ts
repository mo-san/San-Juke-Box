import { MmdModelName, MmdMotionName } from "../@types/types";

export const modelFiles: Map<MmdModelName, string> = new Map([
  ["nendo_kaito", "assets/models/nendo_kaito/nendo_kaito_ver1_00.pmx"],
  ["nendo_len", "assets/models/nendo_len/nendo_len_ver1_00.pmx"],
  ["nendo_luka", "assets/models/nendo_luka/nendo_luka_ver1_00.pmx"],
  ["nendo_meiko", "assets/models/nendo_meiko/nendo_meiko_v1_00.pmx"],
  ["nendo_miku", "assets/models/nendo_miku/nendo_miku_ver3_00.pmx"],
  ["nendo_rin", "assets/models/nendo_rin/nendo_rin_ver1_20.pmx"],
]);

export const motionFiles = new Map<MmdMotionName, string>([
  ["スクワット", "assets/vmds/center_posY.vmd"],
  ["ヘドバン", "assets/vmds/center_rotX.vmd"],
  ["首振り", "assets/vmds/center_rotY.vmd"],
  ["メトロノーム", "assets/vmds/center_rotZ.vmd"],
  ["右手上下", "assets/vmds/left-shoulder_rotZ.vmd"],
  ["左手上下", "assets/vmds/right-shoulder_rotZ.vmd"],
]);
