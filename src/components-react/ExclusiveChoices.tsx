import React from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css, SerializedStyles } from "@emotion/react";

interface PropType {
  selectedIndex: number;
  choices: string[];
  onChange: (index: number) => void;
  extraCss?: SerializedStyles;
}

export const ExclusiveChoices = ({ selectedIndex, choices, onChange, extraCss }: PropType) => {
  return (
    <div
      css={css`
        display: inline-flex;

        & > button {
          display: inline-flex;
          margin: 0;
          padding: 0 1rem;
          height: 2.5rem;
          align-items: center;
          justify-content: center;
          position: relative;
          box-sizing: border-box;
          background-color: transparent;
          border: 1px solid rgba(0, 0, 0, 0.12);
          border-radius: 1.25rem;
          outline: currentcolor none 0;
          cursor: pointer;
          user-select: none;
          font-size: 0.875rem;
        }

        & > button:not(:last-of-type) {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }

        & > button:not(:first-of-type) {
          margin-left: -1px;
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }

        & > button:nth-of-type(${selectedIndex}) {
          background-color: rgba(75, 216, 101, 0.2);
          color: rgb(0, 89, 16);
          border-color: rgba(0, 0, 0, 0.3);
        }

        ${extraCss}
      `}
    >
      {choices.map((choice, index) => (
        <button key={index} onClick={() => onChange(index)}>{choice}</button>
      ))}
    </div>
  );
};
