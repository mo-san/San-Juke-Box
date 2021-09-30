import React from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { createPortal } from "react-dom";

interface PropType {
  children: React.ReactNode;
  close: () => void;
}

export default ({ children, close }: PropType) => {
  return createPortal(
    <>
      <div
        onClick={close}
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          backdrop-filter: blur(15px);
          @supports not (backdrop-filter: blur(15px)) {
            background-color: rgba(0, 0, 0, 0.5);
          }
        `}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          css={css`
            display: grid;
            width: 600px;
            max-height: 90vh;
            margin: auto;
            padding: 1rem;
            box-shadow: 0 0 4px #222222;
            position: relative;
            background-color: rgba(255, 255, 255, 0.95);
            overflow-y: scroll;
            overflow-x: hidden;

            @media (max-width: 700px) {
              width: 95vw;
            }
          `}
        >
          <button
            onClick={close}
            css={css`
              display: inline-block;
              width: 2rem;
              height: 2rem;
              position: sticky;
              justify-self: end;
              top: 0;
              right: 0;

              @media (max-width: 700px) {
                position: fixed;
                top: 1rem;
                right: 1rem;
              }
            `}
          >
            <AiOutlineCloseSquare
              css={css`
                width: 100%;
                height: 100%;
              `}
            />
          </button>
          {children}
        </div>
      </div>
    </>,
    document.querySelector(".modal") as HTMLElement);
};
