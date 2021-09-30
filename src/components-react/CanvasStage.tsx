import React, { useRef, useEffect, useState } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { css, jsx } from "@emotion/react";
import { Stage as KonvaStage } from "konva/lib/Stage";
import { Stage, Layer, Text } from "react-konva/es/ReactKonvaCore";
import "konva/lib/shapes/Text";
import { Stage as CanvasStage } from "../components/Stage";
import { CanvasBase } from "./CanvasBase";
import { googleFontNames } from "../@types/types";
import { ExtendedChar } from "../components/TextAlive";
import { useStore } from "../components/Store";
import { guiMmdModels, statsStage, guiFonts, loadFont } from "../components/Utils";

interface PropType {
  zIndex: number;
}

interface PropTypeText {
  text: string;
  id: number;
}

const MyText = ({ text, id }: PropTypeText) => {
  return (
    <Text
      text={text}
      fontSize={70}
      fontFamily={useStore.getState().fontName}
      name={`Text-${id}`}
      x={window.innerWidth * 1.2}
      y={window.innerHeight * 1.2}
      fill={"#151515"}
      stroke={"#f0f0f0"}
      strokeWidth={10}
      fillAfterStrokeEnabled={true}
    />
  );
};


const onLyricsLoaded = (setTextSPrites: (sprites: JSX.Element[]) => void, lyricsChars: Map<number, ExtendedChar> | undefined) => {
  if (!lyricsChars) {
    // 曲が変わって歌詞が破棄されたとき
    setTextSPrites([]);
    return;
  }

  // 歌詞が読み込まれたとき
  const lyrics = [...lyricsChars.values()]
    .filter(({ letter }) => letter !== "")
    .map((char) => (
      <MyText text={char.letter} id={char.index} key={char.index} />
    ));

  setTextSPrites(lyrics);
};

const onFontChanged = async (setTextSPrites: (sprites: JSX.Element[]) => void, fontName: googleFontNames) => {
  await loadFont(fontName);
  // スプライトを破棄して
  onLyricsLoaded(setTextSPrites, undefined);
  // スプライトを再生成する
  onLyricsLoaded(setTextSPrites, useStore.getState().lyricChars);
};


export default ({ zIndex }: PropType) => {
  const [textSPrites, setTextSPrites] = useState<JSX.Element[]>([]);
  const refCanvasStage = useRef<HTMLCanvasElement>(null);
  const refKonvaStage = useRef<KonvaStage>(null);


  useEffect(() => {
    const canvasElement = refCanvasStage.current as HTMLCanvasElement;
    const stage = new CanvasStage(canvasElement, statsStage);

    useStore.setState({
      instanceStage: stage,
      refKonvaLayer: refKonvaStage.current!.getLayers()[0],
    });

    guiFonts();
    guiMmdModels();

    setTimeout(() => (
      useStore.getState().selectedModelNames.forEach((modelName) => stage.addModel(modelName))
    ), 500);

    /** Event listner. When "lyricsChars" in Store.ts updates, "onLyricsLoaded" is called. */
    useStore.subscribe(
      (lyricsChars) => onLyricsLoaded((sprites) => setTextSPrites(sprites), lyricsChars as Map<number, ExtendedChar>),
      (state) => state.lyricChars
    );

    /** Event listner. When "fontName" in Store.ts updates, "onFontChanged" is called. */
    useStore.subscribe(
      (fontName) => onFontChanged((sprites) => setTextSPrites(sprites), fontName as googleFontNames),
      (state) => state.fontName
    );

  }, []);


  return (
    <>
      <CanvasBase
        id="canvas-stage"
        ref={refCanvasStage}
        zIndex={zIndex}
      />
      <Stage
        ref={refKonvaStage}
        width={window.innerWidth}
        height={window.innerHeight}
        css={css`
          display: block;
          z-index: ${zIndex};
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          max-width: 100vw;
          height: 100vh;
          max-height: 100vh;
        `}
      >
        <Layer>
          {textSPrites}
        </Layer>
      </Stage>
    </>
  );
};
