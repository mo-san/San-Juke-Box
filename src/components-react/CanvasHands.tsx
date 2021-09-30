import React, { useRef, useEffect } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { css, jsx } from "@emotion/react";
import { Brighten } from "konva/lib/filters/Brighten";
import { Stage as KonvaStage } from "konva/lib/Stage";
import { Stage, Layer, Rect, Line } from "react-konva/es/ReactKonvaCore";
import "konva/lib/shapes/Line";
import "konva/lib/shapes/Circle";
import "konva/lib/shapes/Rect";
import { HandHandler } from "../components/HandHandler";
import { statsHands } from "../components/Utils";
import { useStore } from "../components/Store";


interface PropType {
  zIndex: number;
}

interface PropTypePenLight {
  name: string;
  ref?: React.RefObject<any>;
  fillStops?: (string | number)[];
}


const Skeleton = ({ points, name }: { points?: number[]; name: string }) => {
  return (
    <Line
      name={name}
      points={points}
      tension={0.5}
      stroke={`#444444`}
      strokeWidth={30}
      fill={`#e0e0e0`}
      lineCap="round"
      lineJoin="round"
    />
  );
};


const PenLight = ({ ref, name, fillStops }: PropTypePenLight) => {
  const height = window.innerHeight * 2 / 3;
  const width = height / 5;

  return (
    <Rect
      ref={ref}
      name={name}
      x={0}
      y={0}
      width={width}
      height={height}
      fillLinearGradientStartPoint={{ x: 0, y: height / 2 }}
      fillLinearGradientEndPoint={{ x: width, y: height / 2 }}
      fillLinearGradientColorStops={fillStops}
      filters={[Brighten]}
      cornerRadius={10}
      offsetX={width / 2}
      offsetY={height / 4}
      visible={false}
    />
  );
};


export default ({ zIndex }: PropType) => {
  const refVideo = useRef<HTMLVideoElement>(null);
  const refStage = useRef<KonvaStage>(null);
  const fillStops = useStore.getState().colorLightFillStops;
  const chara = useStore.getState().selectedModelNames[0];

  const onWindowResize = () => {
    refStage.current?.width(window.innerWidth);
    refStage.current?.height(window.innerHeight);
  };

  useEffect(() => {
    (document.querySelector("#fps-hands") as HTMLElement).appendChild(statsHands.dom);

    const videoElement = refVideo.current as HTMLVideoElement;
    const canUseCamera = useStore.getState().useCamera;
    const handler = new HandHandler(refStage, videoElement, canUseCamera, statsHands);

    if (canUseCamera) {
      useStore.setState({ startRecognition: handler.startRecognition });
      useStore.setState({ stopRecognition: handler.stopRecognition });
    }

    window.addEventListener("resize", onWindowResize);
  }, []);

  return (
    <>
      <video
        id="video-hands"
        ref={refVideo}
        css={css`
          display: none;
          z-index: ${zIndex - 1};
          position: fixed;
          top: 0;
          left: 0;
          transform: scaleX(-1); /* flip horizontally */
        `}
      />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        ref={refStage}
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
          <Skeleton name={`Finger-L-1`} />
          <Skeleton name={`Finger-L-2`} />
          <Skeleton name={`Finger-L-3`} />
          <Skeleton name={`Finger-L-4`} />
          <Skeleton name={`Finger-L-5`} />
          <Skeleton name={`Finger-R-1`} />
          <Skeleton name={`Finger-R-2`} />
          <Skeleton name={`Finger-R-3`} />
          <Skeleton name={`Finger-R-4`} />
          <Skeleton name={`Finger-R-5`} />
        </Layer>
        <Layer>
          <PenLight name={`Light-0`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-1`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-2`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-3`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-4`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-5`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-6`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-7`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-8`} fillStops={fillStops[chara]} />
          <PenLight name={`Light-9`} fillStops={fillStops[chara]} />
        </Layer>
        <Layer>
          <Skeleton name={`Palm-L`} />
          <Skeleton name={`Palm-R`} />
        </Layer>
      </Stage>
      {/*<canvas*/}
      {/*  id="canvas-debug"*/}
      {/*  css={css`*/}
      {/*    z-index: ${zIndex + 1};*/}
      {/*  `}*/}
      {/*/>*/}
    </>
  );
};
