import React, { lazy, Suspense } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";

const Lyrics = lazy(() => import("./Lyrics"));
const CanvasHands = lazy(() => import("./CanvasHands"));
const CanvasStage = lazy(() => import("./CanvasStage"));


export default () => {
  return (
    <>
      <article
        css={css`
          display: block;
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
        `}>
        <Suspense fallback={null}>
          <CanvasHands zIndex={-10} />
          <CanvasStage zIndex={-20} />
          <Lyrics />
        </Suspense>
      </article>
    </>
  );
};
