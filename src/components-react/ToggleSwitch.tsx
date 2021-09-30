import React, { ReactElement } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";


interface PropType {
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}

interface PropTypeToggleWithLabel {
  label: ReactElement | string | number;
  checked: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}


export const ToggleSwitchWithLabel = ({ checked, onChange, label }: PropTypeToggleWithLabel) => {
  const randomChars = (digit = 4) => [...Array(digit)].map(() => "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 36)]).join("");
  const id = "toggle-" + randomChars(4);

  return (
    <div css={css`
      display: grid;
      grid-template-columns: 1fr auto;
      cursor: pointer;

      & > label {
        cursor: pointer;
      }
    `}>
      <label htmlFor={id}>{label}</label>
      <ToggleSwitch id={id} checked={checked} onChange={onChange} />
    </div>
  );
};


export const ToggleSwitch = ({ id, checked, onChange }: PropType) => {
  return (
    <div
      className="toggle-switch"
      css={css`
        display: inline-block;
        width: 66px;
        height: 30px;
      `}
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        css={css`
          display: none;

          &:checked + label {
            background-color: #4bd865;
          }

          &:checked + label:after {
            left: 36px;
          }
        `}
      />
      <label
        htmlFor={id}
        css={css`
          width: 60px;
          height: 30px;
          background: #ccc;
          position: relative;
          display: inline-block;
          border-radius: 46px;
          transition: 0.4s;
          cursor: pointer;

          &:after {
            content: "";
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 100%;
            top: 0;
            left: 0;
            background: #fff;
            box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
            transition: 0.2s;
          }
        `}
      />
    </div>
  );
};
