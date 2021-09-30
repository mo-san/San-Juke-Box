import React from "react";
import create from "zustand";
import { getGPUTier } from "detect-gpu";
import { MmdModelName, SongTitle, googleFontNames, languages } from "../@types/types";
import { devtools } from "zustand/middleware";
import { ExtendedChar, TextAlive } from "./TextAlive";
import { Stage } from "./Stage";
import { Layer } from "konva/lib/Layer";

export interface DataStore {
  /** TextAlive api token */
  token: string;
  /** useRef object to the textalive class */
  refTextAlive: React.MutableRefObject<TextAlive> | undefined;
  isModalWindowOpen: boolean;
  isTouchDevice: boolean;

  /** Detect GPU grade to adjust rendering. */
  gpuTier: number;
  isMobileGpu: boolean;
  detectGpuTier: () => Promise<void>;
  maxHands: number;
  startRecognition: (() => void) | undefined;
  stopRecognition: (() => void) | undefined;

  /** camera is flipped or not */
  selfieMode: boolean;
  useCamera: boolean;
  showFps: boolean;
  language: languages;
  colorLightFillStops: { [name in MmdModelName]: (string | number)[] };
  /** becomes true when any one of the songs is clicked or tapped to avoid extra animations */
  isSongGridClicked: boolean;
  /** indicates how strong the current visual effect is */
  effectRank: 0 | 1 | 2 | 3 | 4;
  effectRankThreshold: number[];

  /** an instance of 'Stage' class */
  instanceStage: Stage | undefined;
  /** the names of the currently selected MMD models */
  selectedModelNames: MmdModelName[];
  addMmdModel: (modelName: MmdModelName) => void;
  removeMmdModel: (modelName: MmdModelName) => void;

  /** a list of what is played next */
  songsQueue: SongTitle[];
  currentSongTitle: SongTitle;
  /** the lyrics of currently selected song. 'startTime' in the first column, followed by the character. */
  lyricChars: Map<number, ExtendedChar> | undefined;
  /** useRef object to the text layer of Konva */
  refKonvaLayer: Layer | undefined;
  seekBarColors: { [name in MmdModelName]: string };

  /** the name of the currently selected font */
  fontName: googleFontNames;
  /** all font names which support Japanese language and are registered to Google Fonts */
  fontsGoogle: googleFontNames[];
  /** Predefine all 444 letters used in the lyrics of the prize winner songs (+ some hiraganas for furigana) to reduce download size of web fonts. */
  allGlyphs: string;
}

export const useStore = create<DataStore>(devtools((set) => ({
  token: "1ot2LEITJGKRmwpW",
  refTextAlive: undefined,
  isModalWindowOpen: false,
  isTouchDevice: false,

  gpuTier: 0,
  isMobileGpu: false,
  detectGpuTier: async () => {
    const { tier, isMobile = false } = await getGPUTier();
    set({ gpuTier: tier, isMobileGpu: isMobile });
  },
  maxHands: 2,
  startRecognition: undefined,
  stopRecognition: undefined,

  selfieMode: true,
  useCamera: true,
  showFps: true,
  language: "jp" as languages,
  colorLightFillStops: {
    nendo_miku: [0, "#ffffff", 5 / 100, "#91ffe0", 50 / 100, "#00ffc6", 95 / 100, "#91ffe0", 1, "#ffffff"],
    nendo_kaito: [0, "#ffffff", 5 / 100, "#187aea", 50 / 100, "#0055ad", 95 / 100, "#187aea", 1, "#ffffff"],
    nendo_meiko: [0, "#ffffff", 5 / 100, "#ffa291", 50 / 100, "#ff1e00", 95 / 100, "#ffa291", 1, "#ffffff"],
    nendo_rin: [0, "#ffffff", 5 / 100, "#f8ff91", 50 / 100, "#fffb00", 95 / 100, "#f8ff91", 1, "#ffffff"],
    nendo_len: [0, "#ffffff", 5 / 100, "#ffe091", 50 / 100, "#ff9900", 95 / 100, "#ffe091", 1, "#ffffff"],
    nendo_luka: [0, "#ffffff", 5 / 100, "#e091ff", 50 / 100, "#ff00dd", 95 / 100, "#e091ff", 1, "#ffffff"],
  },
  isSongGridClicked: false,
  effectRank: 0,
  effectRankThreshold: [100, 50, 30, 10],

  instanceStage: undefined,
  selectedModelNames: ["nendo_miku"],
  addMmdModel: (modelName: MmdModelName) => set((state) => ({ selectedModelNames: [...new Set([...state.selectedModelNames, modelName])] })),
  removeMmdModel: (modelName: MmdModelName) => set((state) => ({ selectedModelNames: state.selectedModelNames.filter((item) => item !== modelName) })),

  songsQueue: [],
  currentSongTitle: "First Note" as SongTitle,
  lyricChars: undefined,
  refKonvaLayer: undefined,
  seekBarColors: {
    nendo_miku: `rgb(70, 178, 155)`,
    nendo_kaito: `rgb(0, 24, 189)`,
    nendo_meiko: `rgb(255, 31, 31)`,
    nendo_rin: `rgb(211, 196, 0)`,
    nendo_len: `rgb(206, 148, 0)`,
    nendo_luka: `rgb(253, 0, 242)`,
  },

  fontName: "Noto Serif JP",
  fontsGoogle: [
    "Dela Gothic One",
    "DotGothic16",
    "Hachi Maru Pop",
    "Hina Mincho",
    "Kaisei Decol",
    "Kaisei HarunoUmi",
    "Kaisei Opti",
    "Kaisei Tokumin",
    "Kiwi Maru",
    "Klee One",
    "Kosugi Maru",
    "Kosugi",
    "M PLUS 1p",
    "M PLUS Rounded 1c",
    "New Tegomin",
    "Noto Sans JP",
    "Noto Serif JP",
    "Potta One",
    "Rampart One",
    "Reggae One",
    "RocknRoll One",
    "Sawarabi Gothic",
    "Sawarabi Mincho",
    "Shippori Mincho B1",
    "Shippori Mincho",
    "Stick",
    "Train One",
    "Yomogi",
    "Yusei Magic",
  ],
  allGlyphs: `!！？…（）「」々ー1abdeEfFGhilmnorstTvwyあアィいイうウえエおオかカがきキぎくクぐグけケげこごゴさざしシじジすスずせセぜそぞただダちっつづてテでデとトどドなナにぬねのノはばバパぱひびふぶへべほぼぽまみミむめメモもゃやゆょよらラりリるれレロろわワをんン愛逢悪案囲意異違育一溢員引隠嘘唄雲洩鋭駅越演遠凹屋音下何夏架歌我会解悔懐界絵開外確覚楽掛葛感環間嬉寄希気記貴偽吸泣居距境挟教橋狂胸響苦駆空偶隅繰君形景繋隙結献見鍵言孤誇互後光向垢好考行降高合込今差砂彩才在作昨錆残仕司士始子思指支止死私視事似持時耳自失捨車寂取手受終出初所傷唱少消焦照笑衝象上乗場情飾植色信心浸真身人吹衰澄世星晴正生声脆跡切舌先戦線鮮前全素奏想燥相窓走像臓息足続尊体帯退大奪辿誰探淡端弾知恥馳着中眺聴跳直的添伝電度灯当等藤踏逃頭動同瞳道独届虹日熱悩能波配抜煩悲扉比微描秒貧付浮部風物聞閉碧別変片返歩包放方法忘望紡僕本魔枚毎慢満味未夢無明迷鳴面盲木目夜由揺葉遥来落裏離流溜料良輪隣涙霊劣恋嗤攫栞眩瞼褪賽黎`,
})));
