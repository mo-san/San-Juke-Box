import React from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";
import { BiPlayCircle } from "react-icons/bi";
import { locales } from "../data/locales";

interface PropType {
  onClick: React.MouseEventHandler;
  playButtonShown: boolean;
}

export default ({ onClick, playButtonShown }: PropType) => {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        width: 100%;
        position: fixed;
        bottom: ${playButtonShown ? "1rem" : "-50vh"};
        left: 0;
        z-index: 10;
        transition: bottom 0.2s linear;
      `}>
      <button
        css={css`
          display: grid;
          grid-template-columns: auto 2rem;
          align-items: center;
          background-color: rgb(51, 51, 51);
          box-shadow: rgba(0, 0, 0, 0.2) 0 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px;
          color: rgba(255, 255, 255, 0.87);
          max-width: 42rem;
          min-height: 3rem;
          min-width: 5rem;
          position: relative;
          margin: 8px;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 1rem;
          border: none;
          cursor: pointer;
        `}
        onClick={onClick}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
            min-width: 5rem;
            height: auto;
            line-height: 2;
          `}
        >
          {locales.play}
        </div>
        <BiPlayCircle
          css={css`
            width: 2rem;
            height: 2rem;
          `}
        />
      </button>
    </div>
  );
};
