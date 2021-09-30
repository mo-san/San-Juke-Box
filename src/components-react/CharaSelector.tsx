import React from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";
import { MdCheckCircle } from "react-icons/md";
import { locales } from "../data/locales";
import { MmdModelName } from "../@types/types";
import { useStore } from "../components/Store";

const breakpoints = [0, 320, 640, 1200];
const query = breakpoints.map(
  (bp) => `@media (min-width: ${bp}px)`
);

interface PropType {
  onCharaChanged: () => void;
}

export const CharaSelector = ({ onCharaChanged }: PropType) => {
  return (
    <div
      className="character-select"
      css={css`
        margin: 3rem 0;

        & > p {
          margin: 0.5rem 0;
        }
      `}
    >
      <h2
        css={css`
          position: relative;
          overflow: hidden;
          padding: 1.5rem 2rem 1.5rem 130px;
          word-break: break-all;
          border-top: 3px solid #000;
          border-radius: 12px 0 0 0;

          & > span {
            font-size: 2rem;
            position: absolute;
            top: 0;
            left: 0;
            display: block;
            padding: 3px 20px;
            color: #fff;
            border-radius: 10px 0 20px 10px;
            background: #000;
          }
        `}
      >
        <span>02</span>
        {locales.charaTitle}
      </h2>
      <p>{locales.chara1}</p>
      <p>{locales.chara2}</p>
      <div
        css={css`
          display: grid;
          grid-gap: 1rem;
          margin: 2rem auto;
          justify-content: space-around;

          ${query[0]} {
            grid-template-columns: repeat(1, 1fr);
          }

          ${query[1]} {
            grid-template-columns: repeat(2, 1fr);
            max-width: calc(150px * 2 + 1rem);
          }

          ${query[2]} {
            grid-template-columns: repeat(3, 1fr);
            max-width: calc(150px * 3 + 1rem * 2);
          }
        `}
      >
        {([
          "nendo_miku", "nendo_kaito", "nendo_meiko",
          "nendo_rin", "nendo_len", "nendo_luka"] as MmdModelName[]).map((name, index) => (
          <div
            key={index}
            className={name}
            onClick={() => {
              useStore.setState({ selectedModelNames: [name] });
              onCharaChanged();
            }}
            css={css`
              margin: auto;
              position: relative;
            `}
          >
            <img
              src={`../img/${name}.png`}
              alt={`${name}`}
              draggable="false"
              css={css`
                width: 150px;
                height: 150px;
              `}
            />
            {useStore.getState().selectedModelNames.includes(name) && (
              <span css={css`
                position: absolute;
                inset: auto 0 0 auto;
                font-size: 2rem;
              `}><MdCheckCircle /></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
