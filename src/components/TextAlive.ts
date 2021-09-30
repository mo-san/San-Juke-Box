import React from "react";
import { Player, IPlayerApp } from "textalive-app-api";
import gsap from "gsap";
import { SongData } from "../@types/types";
import { MUSIC } from "../data/music";
import { useStore } from "./Store";


/**
 * Class 'Char' in 'textalive-app-api.d.ts' is not exported by default.
 * For this line of code to work you need to modify the line, i.e.:
 * --- declare class Char extends TextUnit implements IChar {
 * +++ export declare class Char extends TextUnit implements IChar {
 */
import { Char } from "textalive-app-api";
import { Layer } from "konva/lib/Layer";

export declare class ExtendedChar extends Char {
  /**
   * serial number of a character in whole lyric characters
   */
  index: number;
  /**
   * This is equivalent to the 'Char.text' property (thus single character)
   * if the original char object has no correspondent furigana;
   * otherwise two or more characters of kanji representing a word.
   * Or empty string if the previous character is a word.
   */
  letter: string;
  furigana?: string;
  // furigana?: { position: number; span: number; text: string };
}


export class TextAlive {
  player: Player;
  currentSongData?: SongData;
  currentBpm?: number;
  currentLetter?: ExtendedChar;
  currentFurigana = "";
  queue: [number, ExtendedChar][] = [];
  queueFlag: boolean[] = [];

  constructor(token: string) {
    this.player = new Player({
      app: { token: token, },
      mediaElement: document.querySelector("#media") as HTMLDivElement,
      mediaBannerPosition: "bottom left",
    });

    this.player.addListener({
      onAppReady: this.onAppReady,

      /* fired when all the data you need to play the song are ready */
      onVideoReady: this.onVideoReady,
    });
  }

  onAppReady = (app: IPlayerApp) => {
    if (!app.songUrl) {
      const songTitle = useStore.getState().currentSongTitle;
      const songData = MUSIC.find((item) => item.title === songTitle) as SongData;
      this.currentSongData = songData;
      this.player.createFromSongUrl(songData.videoUrl, { video: songData.video });
    }
  };

  onVideoReady = () => {
    // if the song has no lyrics
    if (!this.player.video.firstChar) return;

    const { furigana, words } = (this.currentSongData as SongData);

    // This array has all every characters, in each of row startTime is in the first column, followed by the character.
    const charsAll: [number, ExtendedChar][] = [];

    let index = 0;
    let char = this.player.video.firstChar as ExtendedChar;

    while (char) {
      char.index = index;
      char.letter = char.text;
      charsAll.push([char.startTime, char]);
      char = char.next as ExtendedChar;
      index += 1;
    }

    charsAll.forEach(([_, char], index) => {
      const startIndex = words.findIndex((pos) => pos === index);
      const length = words[startIndex + 1] - words[startIndex];

      char.furigana = furigana
        .filter(({ position }) => words[startIndex] <= position && position < words[startIndex + 1])
        .map(({ text }) => text)
        .join("　");

      for (let k = 1; k < length; k++) {
        char.letter += charsAll[index + k][1].letter;
        charsAll[index + k][1].letter = "";
      }
    });

    this.queue = charsAll;
    this.queueFlag = new Array(charsAll.length).fill(false);
    useStore.setState({ lyricChars: new Map<number, ExtendedChar>(charsAll) });
  }

  // onVideoReady_ = () => {
  //   // if the song has no lyrics
  //   if (!this.player.video.firstChar) return;
  //
  //   const furiganaAll = (this.currentSongData as SongData).furigana;
  //   // This array has all every characters, in each of row startTime is in the first column, followed by the character.
  //   const charsAll: [number, ExtendedChar][] = [];
  //
  //   let index = 0;
  //   let char = this.player.video.firstChar as ExtendedChar;
  //
  //   while (char) {
  //     char.index = index;
  //     char.letter = char.text;
  //     char.furigana = furiganaAll.find(({ position }) => position === index);
  //     charsAll.push([char.startTime, char]);
  //     char = char.next as ExtendedChar;
  //     index += 1;
  //   }
  //
  //   charsAll.forEach(([_, char], index) => {
  //     // having correspondent furigana, and, its length being two or more (i.e. 熟語)
  //     if (!char.furigana) return;
  //     const length = char.furigana.span;
  //     if (length <= 1) return;
  //     for (let k = 1; k < length; k++) {
  //       char.letter += charsAll[index + k][1].letter;
  //       charsAll[index + k][1].letter = "";
  //     }
  //   });
  //
  //   this.lyricChars = new Map<number, ExtendedChar>(charsAll);
  //   useStore.setState({ lyricChars: this.lyricChars });
  // };

  stop = () => {
    this.player.requestStop();
  };

  seek = (event: React.MouseEvent) => {
    this.player.requestMediaSeek(
      this.player.video.duration * (event.clientX / (event.currentTarget as HTMLDivElement).clientWidth)
    );
  };

  playOrPause = () => {
    if (!this.player.video) return;
    if (this.player.isPlaying) {
      this.player.requestPause();
    } else {
      this.player.requestPlay();
    }
  };

  /**
   * converts a duration of a beat to bpm
   * beatDurationSeconds = beat.duration (in milli seconds) / 1000
   * bpm = 60(seconds) / beatDurationSeconds
   */
  #calcurateBpm = async (positionMs: number) => {
    const beat = this.player.findBeat(positionMs);
    if (!beat) return;
    let bpm: number;

    if (useStore.getState().currentSongTitle === "First Note") {
      bpm = Math.round(1000 * 60 / beat.duration / 3);
    } else if (useStore.getState().currentSongTitle === "その心に灯る色は") {
      bpm = Math.round(1000 * 60 / beat.duration / 2);
    } else {
      bpm = Math.round(1000 * 60 / beat.duration);
    }

    if (bpm === this.currentBpm) return;
    this.currentBpm = bpm;
  };

  #calcurateLetter = async (positionMs: number) => {
    const char = this.player.video.findChar(positionMs);
    if (!char) return;

    const currentChar = useStore.getState().lyricChars?.get(char.startTime);
    if (!currentChar) return;

    if (currentChar.letter !== "") {
      this.currentLetter = currentChar;
    }

    if (currentChar.furigana) {
      this.currentFurigana = currentChar.furigana;
    }
  };

  #moveSprite = (index: number) => {
    const layer = useStore.getState().refKonvaLayer as Layer;
    if (!layer) return;

    const sprite = layer.getChildren((item) => item.name() === `Text-${index}`)[0];
    gsap
      .timeline()
      .set(sprite, {
        x: window.innerWidth * 1.2,
        y: window.innerHeight * 1.2,
      })
      .to(sprite, {
        x: window.innerWidth * 0.8,
        y: window.innerHeight * 0.2,
      })
      .to(sprite, {
        x: window.innerWidth * 0.6,
        y: window.innerHeight * 0.33,
        duration: 1,
      })
      .to(sprite, {
        y: window.innerHeight * 0.5,
        duration: 1,
      })
      .to(sprite, {
        y: window.innerHeight * 0.8,
        duration: 1,
      })
      .to(sprite, {
        y: -100,
      });
  };

  #positionMsToIndex = (positionMs: number) => {
    if (this.queue.length === 0) {
      return;
    }

    if (this.queue.length === 1) {
      return this.queue[0][1].index;
    }

    let result = 0;

    for (let i = 0; i < this.queue.length - 1; i++) {
      const char = this.queue[i][1];
      const nextChar = this.queue[i + 1][1];
      const diff = Math.abs(char.startTime - positionMs) - Math.abs(nextChar.startTime - positionMs);
      if (diff <= 0) {
        result = char.index;
        break;
      }
    }
    if (this.queueFlag[result]) {
      return;
    } else {
      this.queueFlag[result] = true;
      return result;
    }
  }

  onTimeUpdate = (positionMs: number) => {
    this.#calcurateBpm(positionMs);
    this.#calcurateLetter(positionMs);
    const charIndex = this.#positionMsToIndex(positionMs);
    if (charIndex) this.#moveSprite(charIndex);
  };
}
