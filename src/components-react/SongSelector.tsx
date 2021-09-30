import React, { useRef } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";
import gsap from "gsap";
import { DropResult, Container, Draggable } from "react-smooth-dnd";
import { GrDrag } from "react-icons/gr";
import { useStore } from "../components/Store";
import { SongTitle } from "../@types/types";
import { locales } from "../data/locales";
import { ExclusiveChoices } from "./ExclusiveChoices";

interface PropType {
  songArr: { title: SongTitle; composer: string; thumbnailUrl: string }[];
  setSongArr: React.Dispatch<React.SetStateAction<{ title: SongTitle; composer: string; thumbnailUrl: string }[]>>;
  sequential: boolean;
  setSequential: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSongs: (arr: SongTitle[]) => void;
  refs: React.MutableRefObject<any>[];
  playButtonShown: boolean;
  setPlayButtonShown: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PropTypeSongGrid {
  title: string;
  composer: string;
  thumbnailUrl: string;
  clickHandler: () => void;
  playButtonShown: boolean;
  setPlayButtonShown: React.Dispatch<React.SetStateAction<boolean>>;
}

const onDrop = (
  { removedIndex, addedIndex }: DropResult,
  setItems: React.Dispatch<React.SetStateAction<{ title: SongTitle; composer: string; thumbnailUrl: string }[]>>
) => {
  if (removedIndex === null || addedIndex === null) return;

  setItems((prevItems) => {
    const itemToAdd = prevItems.splice(removedIndex, 1)[0];
    prevItems.splice(addedIndex, 0, itemToAdd);
    return [...prevItems];
  });
};
export const SongSelector = (
  {
    songArr,
    setSongArr,
    sequential,
    setSequential,
    setSelectedSongs,
    playButtonShown,
    setPlayButtonShown
  }: PropType) => {
  return (
    <div
      className="song-select"
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
        <span>03</span>
        {locales.songTitle}
      </h2>
      <p>{locales.song1}</p>
      <div
        css={css`
          display: grid;
          justify-items: center;
          grid-gap: 1rem;
        `}
      >
        <ExclusiveChoices
          selectedIndex={sequential ? 2 : 1}
          choices={[locales.songPlayOnce, locales.songPlaySequential]}
          onChange={(index) => setSequential(index === 1)}
          extraCss={css`
            margin-left: 36px;
          `}
        />
        <Container
          dragHandleSelector=".drag-handle"
          lockAxis="y"
          onDrop={(result) => onDrop(result, setSongArr)}
        >
          {songArr.map(({ title, composer, thumbnailUrl }, index) => (
            <Draggable key={index}>
              <div
                className="draggable-item"
                css={css`
                  display: flex;
                  align-items: center;
                  margin: 0.5rem 0 0.5rem;
                `}
              >
                <div
                  className="drag-handle"
                  css={css`
                    display: flex;
                    align-items: center;
                    width: 36px;
                    height: 24px;
                    background-color: #f5f5f5;
                    border-radius: 4px;

                    & > svg {
                      width: 100%;
                      height: 1rem;
                    }
                  `}
                >
                  <GrDrag />
                </div>
                <SongGrid
                  key={index}
                  title={title}
                  composer={composer}
                  thumbnailUrl={thumbnailUrl}
                  playButtonShown={playButtonShown}
                  setPlayButtonShown={setPlayButtonShown}
                  clickHandler={() => {
                    setSelectedSongs(!sequential ? [title] : songArr.slice(index).map(({ title }) => title));
                  }}
                />
              </div>
            </Draggable>
          ))}
        </Container>
      </div>
    </div>
  );
};


const SongGrid = (
  {
    title,
    composer,
    thumbnailUrl,
    clickHandler,
    playButtonShown,
    setPlayButtonShown
  }: PropTypeSongGrid) => {
  const refImage = useRef<HTMLDivElement>({} as HTMLDivElement);

  return (
    <div
      className="song-item"
      onClick={() => { onMouseClickOnGrid(refImage, clickHandler, playButtonShown, setPlayButtonShown) }}
      onMouseEnter={() => onMouseEnterOnGrid(refImage)}
      onMouseLeave={() => onMouseLeaveOnGrid(refImage)}
      css={css`
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px;
        border-radius: 4px;
        background-color: rgb(255, 255, 255);
        color: rgba(0, 0, 0, 0.87);
        position: relative;
      `}
    >
      <div
        className="record"
        ref={refImage}
        css={css`
          position: absolute;
          width: 320px;
          height: 0;
          top: 0;
          z-index: 1;
          background-image: url("../img/record.png");
          background-size: cover;
          transition: all 0.2s ease-in-out 0s;
        `}
      />
      <img
        src={thumbnailUrl}
        alt={`Youtube thumbnail for "${title}"`}
        draggable="false"
        css={css`
          display: block;
          width: 100%;
          max-width: 100%;
          object-fit: cover;
          z-index: 2;
          position: relative;
        `}
      />
      <div
        css={css`
          padding: 1rem;
          position: relative;
          z-index: 2;
          background-color: rgb(255, 255, 255);
        `}
      >
        <p
          css={css`
            margin: 0 0 0.35em;
            font-size: 1.5rem;
            line-height: 1.3;
            letter-spacing: 0;
          `}
        >
          {title}
        </p>
        <p
          css={css`
            margin: 0;
            font-size: 0.9rem;
            line-height: 1.43;
            color: rgba(0, 0, 0, 0.6);
          `}
        >
          {composer}
        </p>
      </div>
    </div>
  );
};


const onMouseEnterOnGrid = ({ current }: { current: HTMLElement }) => {
  // if smartphone
  if (useStore.getState().isTouchDevice) return;
  // if already selected something
  if (useStore.getState().isSongGridClicked) return;

  gsap.to(current, {
    height: 320,
    top: -120,
    duration: 0.1,
    ease: "back.out(1.5)"
  });
};


const onMouseLeaveOnGrid = ({ current }: { current: HTMLElement }) => {
  if (useStore.getState().isTouchDevice) return;
  if (useStore.getState().isSongGridClicked) return;

  gsap.to(current, {
    height: 0,
    top: 0,
    duration: 0.1,
  });
};


const onMouseClickOnGrid = (
  { current }: { current: HTMLElement },
  clickHandler: () => void,
  playButtonShown: boolean,
  setPlayButtonShown: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (useStore.getState().isTouchDevice) {
    if (!playButtonShown) {
      gsap.to(current, {
        height: 320,
        top: -120,
        duration: 0.1,
        ease: "back.out(1.5)",
        onComplete: clickHandler,
      });
    } else {
      gsap.to(current, {
        height: 0,
        top: 0,
        duration: 0.1,
      });
    }
    setPlayButtonShown(!playButtonShown);

  } else {
    gsap
      .timeline()
      .to(current, {
        height: 320,
        top: -320,
        duration: 0.5,
        onComplete: clickHandler,
      })
      .set(current, {
        width: 320,
        height: 0,
        top: 0,
        left: 0,
      });
  }
};
