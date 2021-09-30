import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";
import { MdInfoOutline } from "react-icons/md";
import { MUSIC } from "../data/music";
import { ToggleSwitchWithLabel } from "./ToggleSwitch";
import { SongTitle } from "../@types/types";
import { useStore } from "../components/Store";
import { locales } from "../data/locales";
import { SongSelector } from "./SongSelector";
import { CharaSelector } from "./CharaSelector";

const PlayButton = lazy(() => import("./PlayButton"));

interface PropType {
  startPlaying: () => void;
  appStarted: boolean;
}

interface PropTypeCameraConfirm {
  canUseCamera: boolean;
  toggleCanUseCamera: () => void;
}


const songs = [...MUSIC]
  .sort(({ initialOrder: a }, { initialOrder: b }) => a - b)
  .map(({ title, composer, thumbnailUrl }) => ({ title, composer, thumbnailUrl }));


const Title = () => {
  return (
    <div
      className="title"
    >
      <h1
        css={css`
          font-family: "Zen Tokyo Zoo", serif;
          font-size: 10vmin;
          font-weight: normal;
          margin: 0;
        `}
      >
        San-Juke Box
      </h1>
    </div>
  );
};


const Introduction = () => {
  return (
    <div
      className="introduction"
      css={css`
        & > p {
          margin: 0.5rem 0;
        }
      `}
    >
      <div
        css={css`
          display: grid;
          gap: 0.3rem;
          margin-bottom: 6vmin;

          & > img {
            width: 100%;
            max-width: 300px;
            object-fit: cover;
            margin: auto;
          }
        `}
      >
        <img src="img/screenshot.jpg" alt="play demo 1" title="play demo 1" />
      </div>
      <p>{locales.intro1}</p>
      <p>{locales.intro2}</p>
      <p>{locales.intro3}</p>
      <p>{locales.intro4}</p>
      <aside
        css={css`
          display: flex;
          margin: 1rem 0 0;
          padding: 0.4rem 1rem;
          box-shadow: none;
          border-radius: 4px;
          font-size: 0.88rem;
          color: rgb(1, 67, 97);
          background-color: rgb(229, 246, 253);
        `}
      >
        <div
          css={css`
            margin-right: 12px;
            padding: 7px 0;
            display: flex;
            font-size: 22px;
            opacity: 0.9;
            color: rgb(3, 169, 244);
          `}>
          <MdInfoOutline />
        </div>
        <p
          css={css`
            margin: 8px 0;
          `}>
          You can change the language from the button on the top right corner on this page.<br />
          改变语言 / 改變語言 / Changer de langue / Sprache ändern / Ganti BAHASA / 언어 변경 / Tukar bahasa / Mudar idioma /
          Cambiar idioma / Thay đổi ngôn ngữ
        </p>
      </aside>
    </div>
  );
};


const CameraConfirm = ({ canUseCamera, toggleCanUseCamera }: PropTypeCameraConfirm) => {
  return (
    <div
      className="notice"
      css={css`
        margin: 3rem 0;
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
        <span>01</span>
        {locales.noticeTitle}
      </h2>
      <p>{locales.notice1}</p>
      <p>{locales.notice2}</p>
      <p>{locales.notice3}</p>
      <p>{locales.notice4}</p>
      <div
        css={css`
          margin: 1rem 0;
          border-radius: 10px;
          border: 0.3rem solid rgba(0, 0, 0, 0.7);
          padding: 1rem;
        `}
      >
        <ToggleSwitchWithLabel
          checked={canUseCamera}
          onChange={toggleCanUseCamera}
          label={<span>{canUseCamera ? locales.noticeUseCamera : locales.noticeNoUseCamera}</span>}
        />
      </div>
      <p>{locales.notice5a}
        <b
          css={css`
            background: linear-gradient(transparent 50%, yellow);
          `}
        >{locales.notice5b}</b>
        {locales.notice5c}
      </p>
      <p>{locales.notice6}</p>
      <p>{locales.notice7}</p>
    </div>
  );
};


export default ({ startPlaying, appStarted }: PropType) => {
  const [songArr, setSongArr] = useState(songs);
  const [canUseCamera, setCanUseCamera] = useState(true);
  const [sequentialPlay, setSequentialPlay] = useState(false);
  const [, setIsTouchDevice] = useState(false);
  /**
   * a dummy state; will be changed upon character selection
   */
  const [, setChara] = useState(Math.random());
  const refRecordImages = [...new Array(6)].map(() => useRef<HTMLElement>());
  const [playButtonShown, setPlayButtonShown] = useState(false);

  const setSelectedSongs = (titles: SongTitle[]) => {
    useStore.setState({
      currentSongTitle: titles[0],
      songsQueue: titles.slice(1),
    });

    if (useStore.getState().isTouchDevice) {
      setIsTouchDevice(true);
    } else {
      startPlaying();
    }
  };

  const toggleCanUseCamera = () => {
    const canUse = !canUseCamera;
    setCanUseCamera(canUse);
    useStore.setState({ useCamera: canUse });
  };

  useEffect(() => {
    /**
     * A workaround for a bug that you cannot scroll on mobile browsers.
     * Source: https://github.com/kutlugsahin/react-smooth-dnd/issues/75
     */
    const cleanClasses = () => document.body.className = "";
    document.addEventListener("touchend", cleanClasses, false);
    return () => document.removeEventListener("touchend", cleanClasses, false);
  }, []);

  return (
    <div
      className="container"
      css={css`
        max-width: 1000px;
        margin: auto;
        padding: 1rem;
        display: ${appStarted ? "none" : "block"};
      `}
    >

      <Suspense fallback={null}>
        <Title />

        <Introduction />

        <CameraConfirm canUseCamera={canUseCamera} toggleCanUseCamera={toggleCanUseCamera} />

        <CharaSelector onCharaChanged={() => setChara(Math.random())} />

        <SongSelector
          songArr={songArr}
          setSongArr={setSongArr}
          sequential={sequentialPlay}
          setSequential={setSequentialPlay}
          setSelectedSongs={setSelectedSongs}
          refs={refRecordImages}
          playButtonShown={playButtonShown}
          setPlayButtonShown={setPlayButtonShown}
        />

        <PlayButton onClick={startPlaying} playButtonShown={playButtonShown} />
      </Suspense>
    </div>
  );
};
