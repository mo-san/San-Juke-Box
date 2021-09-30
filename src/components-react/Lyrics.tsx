import React, { useEffect, useState, useRef } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { css, jsx } from "@emotion/react";
import { IoPlaySkipForward, IoPlay, IoPause, IoStop } from "react-icons/io5";
import { TextAlive } from "../components/TextAlive";
import { useStore } from "../components/Store";
import { MMD } from "../components/MMD";
import { locales } from "../data/locales";


const setSeekBarStatus = (seekBarWidth: number) => {
  const chara = useStore.getState().selectedModelNames[0];
  const seekBar = document.querySelector(".seekbar-container") as HTMLDivElement;
  seekBar.style.backgroundImage = `linear-gradient(90deg, ${useStore.getState().seekBarColors[chara]} ${seekBarWidth}%, rgb(240, 240, 240) ${seekBarWidth}%)`;
};


function loadTextAlive(refTextAlive: React.MutableRefObject<TextAlive>, setControllerShown: React.Dispatch<React.SetStateAction<boolean>>) {
  if (refTextAlive.current) refTextAlive.current = undefined as any as TextAlive;

  const textAlive = new TextAlive(useStore.getState().token);
  refTextAlive.current = textAlive;

  textAlive.player.addListener({
    /* fired when you will be able to control play or pause */
    onTimerReady: () => {
      setControllerShown(true);
    },

    /* fired each time (many times in a second) playing position proceeds */
    onTimeUpdate: (position) => {
      setSeekBarStatus((position / textAlive.player.video.duration) * 100);
      textAlive.onTimeUpdate(position);
    },

    /* fired when the song starts */
    onPlay: () => {
      const { selectedModelNames } = useStore.getState();
      for (const name of selectedModelNames) {
        MMD.findMotion(name, "スクワット").stop();
        MMD.findMotion(name, "スクワット").play();
        MMD.findMotion(name, "スクワット").fadeIn(1);
      }
    },

    /* fired when the song pauses */
    onPause: () => {
      const { selectedModelNames } = useStore.getState();
      for (const name of selectedModelNames) {
        MMD.findMotion(name, "スクワット").fadeOut(1);
      }
    },

    /* fired when the song stops */
    onStop: () => {
      const { selectedModelNames } = useStore.getState();
      for (const name of selectedModelNames) {
        MMD.findMotion(name, "スクワット").fadeOut(1);
      }
      textAlive.currentBpm = undefined;
      textAlive.currentLetter = undefined;
      textAlive.currentFurigana = "";
    },
  });
}


export default () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [controllerShown, setControllerShown] = useState(false);
  const [songFinished, setSongFinished] = useState(Math.random());
  const isModalWindowOpen = useStore((state) => state.isModalWindowOpen);
  const refTextAlive = useRef({} as TextAlive);
  useStore.setState({ refTextAlive: refTextAlive });

  useEffect(() => loadTextAlive(refTextAlive, setControllerShown), [songFinished]);

  function nextSong() {
    if (useStore.getState().songsQueue.length === 0) return;
    useStore.setState(({ songsQueue }) => ({
      currentSongTitle: songsQueue[0],
      songsQueue: songsQueue.slice(1)
    }));
    setIsPlaying(false);
    setSongFinished(Math.random());
  }

  return (
    <>
      <div
        css={css`
          position: fixed;
          left: 0;
          top: 50%;
          background: rgba(0, 0, 0, 0.8);
          color: rgb(255, 255, 255);
          padding: 10px 16px;
          align-items: center;
        `}>
        <div>
          BPM: <span id="BPM" />
        </div>
        <div>
          ♪: <span id="Letter" />
        </div>
        <div>
          ♫: <span id="Furigana" />
        </div>
      </div>

      <div
        className="player-control"
        css={css`
          display: ${controllerShown ? "grid" : "none"};
          grid-template-columns: repeat(3, 1fr);
          position: fixed;
          bottom: 5rem;
          left: 0;
          background: rgba(0, 0, 0, 0.8);
          color: rgb(255, 255, 255);
          padding: 1rem;
          align-items: center;

          & button {
            padding: 0.5rem;
            display: block;
            width: 100%;
          }

          & button svg {
            width: 2rem;
            height: 2rem;
          }
        `}
      >
        <button
          className="start-pause"
          onClick={() => {
            refTextAlive.current.playOrPause();
            setIsPlaying(!isPlaying);
          }}
        >
          {isPlaying
            ? <><IoPause />{locales.pause}</>
            : <><IoPlay />{locales.play}</>
          }
        </button>
        <button
          className="stop"
          disabled={!isPlaying}
          onClick={() => {
            refTextAlive.current.stop();
            setIsPlaying(false);
          }}
        >
          <IoStop />
          {locales.stop}
        </button>
        <button
          className="next"
          onClick={nextSong}
        >
          <IoPlaySkipForward />
          {locales.next}
        </button>
      </div>

      <div
        className="seekbar-container"
        onClick={refTextAlive.current.seek}
        css={css`
          display: ${isModalWindowOpen ? "none" : "block"};
          background-color: rgb(240, 240, 240);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 10px;
          border-radius: 8px;
        `}
      >
      </div>
    </>
  );
};
