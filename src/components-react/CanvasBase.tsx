import React, { useEffect } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { css, jsx } from "@emotion/react";

interface PropType {
  id: string;
  zIndex: number;
  css?: any;
}

export const CanvasBase = React.forwardRef(({ id, zIndex }: PropType, ref) => {
  function resizeCanvas(canvasElement: HTMLCanvasElement, ratio: number) {
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerWidth * ratio;
  }

  useEffect(() => {
    // @ts-ignore
    const canvas = ref.current as HTMLCanvasElement;

    const ratio = window.innerHeight / window.innerWidth;
    resizeCanvas(canvas, ratio);
    window.addEventListener("resize", () => resizeCanvas(canvas, ratio));
  }, []);

  return (
    <canvas
      id={id}
      // @ts-ignore
      ref={ref}
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
    />
  );
});
