import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import { render } from "react-dom";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";
import { locales } from "./data/locales";
import { useStore } from "./components/Store";
import { statsStage, statsHands } from "./components/Utils";

const App = lazy(() => import("./components-react/App"));
const Landing = lazy(() => import("./components-react/Landing"));
const Info = lazy(() => import("./components-react/Info"));

function detectTouchOrMouse() {
  function detectDeviceType(event: TouchEvent | MouseEvent) {
    useStore.setState({ isTouchDevice: "changedTouches" in event });
    document.removeEventListener("touchstart", detectDeviceType);
    document.removeEventListener("mousemove", detectDeviceType);
  }

  document.addEventListener("touchstart", detectDeviceType);
  document.addEventListener("mousemove", detectDeviceType);
}

function Main() {
  const [, _dummyFunc] = useState("ja");
  const [appStarted, setAppStarted] = useState(false);
  const detectGpuTier = useStore((state) => state.detectGpuTier);
  const gpuTier = useStore((state) => state.gpuTier);
  const isMobile = useStore((state) => state.isMobileGpu);
  const refFpsStage = useRef<HTMLDivElement>(null);
  const refFpsHand = useRef<HTMLDivElement>(null);
  const [fpsShown, setFpsShown] = useState(false);

  function onLangSelectorCLicked(lang: string) {
    locales.setLanguage(lang);
    // force re-render
    _dummyFunc(lang);
  }

  function startPlaying() {
    useStore.subscribe(
      (startRecognition) => startRecognition && setTimeout(() => (startRecognition as () => void)(), 10),
      (state) => state.startRecognition
    );
    setAppStarted(true);
  }

  /**
   * Called when the user came back to the top page to reset the state.
   */
  function appRestart() {
    useStore.setState({
      isSongGridClicked: false,
      songsQueue: [],
    });
    const myNode = document.getElementById("media") as HTMLDivElement;
    while (myNode.firstChild) myNode.removeChild(myNode.firstChild);
    const stopRecognition = useStore.getState().stopRecognition;
    if (stopRecognition) stopRecognition();
    setAppStarted(false);
  }

  useEffect(() => {
    detectGpuTier();
    detectTouchOrMouse();
    console.info(`GPU Tier: ${gpuTier} (mobile: ${isMobile ? "yes" : "no"})`);
  }, [detectGpuTier]);

  useEffect(() => {
    refFpsStage.current?.appendChild(statsStage.dom);
    refFpsHand.current?.appendChild(statsHands.dom);
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        {appStarted && <App />}
        <Landing startPlaying={startPlaying} appStarted={appStarted} />
        <Info onLangSelectorCLicked={onLangSelectorCLicked} toggleFps={() => setFpsShown(!fpsShown)} />
      </Suspense>
      <aside
        css={css`
          position: fixed;
          bottom: 1rem;
          right: 1rem;
          display: ${fpsShown ? "flex" : "none"};
          gap: 1rem;
          background-color: #dbdbdb;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          text-align: center;
          border: 1px solid #7b7b7b;

          & #fps-stage::before {
            content: "Stage";
            display: block;
          }

          & #fps-hands::before {
            content: "Hand";
            display: block;
          }
        `}
      >
        <div id="fps-stage" ref={refFpsStage} />
        <div id="fps-hands" ref={refFpsHand} />
      </aside>
      <div className="modal" />
    </>
  );
}

render(<Main />, document.getElementById("App"));
