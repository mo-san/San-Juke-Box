import React from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";

interface PropType {
  corner: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
  children: React.ReactNode;
  onClick: React.MouseEventHandler;
}

export default ({ children, onClick, corner }: PropType) => {
  return (
    <>
      <button
        onClick={onClick}
        css={css`
          min-width: 2rem;
          min-height: 2rem;
          position: fixed;
          margin: 1rem;
          z-index: 100;
          top: ${corner.startsWith("top") ? 0 : "initial"};
          left: ${corner.endsWith("Left") ? 0 : "initial"};
          bottom: ${corner.startsWith("bottom") ? 0 : "initial"};
          right: ${corner.endsWith("Right") ? 0 : "initial"};

          & > svg {
            width: 2rem;
            height: 2rem;
          }
        `}
      >
        {children}
      </button>
    </>
  );
};
