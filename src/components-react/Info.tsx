import React, { useState, lazy, Suspense } from "react";
/** @jsx jsx */
// noinspection ES6UnusedImports
import { jsx, css } from "@emotion/react";
import { IoMdSettings } from "react-icons/io";
import { MdLanguage, MdHelpOutline } from "react-icons/md";
import { locales } from "../data/locales";
import { useStore } from "../components/Store";
import { ToggleSwitchWithLabel } from "./ToggleSwitch";
import { googleFontNames } from "../@types/types";

const ButtonOnScreen = lazy(() => import("./ButtonOnScreen"));
const Modal = lazy(() => import("./Modal"));

interface PropType {
  onLangSelectorCLicked: (lang: string) => void;
  toggleFps: () => void;
}

export default ({ onLangSelectorCLicked, toggleFps }: PropType) => {
  const [windowShown, setWindowShown] = useState(false);
  const availableLnags = locales.getAvailableLanguages();

  function openWindow() {
    setWindowShown(true);
    useStore.setState({ isModalWindowOpen: true });
  }

  function closeWindow() {
    setWindowShown(false);
    useStore.setState({ isModalWindowOpen: false });
  }

  function toggleSelfieMode() {
    useStore.setState(({ selfieMode }) => ({ selfieMode: !selfieMode }));
  }

  return (
    <>
      <Suspense fallback={null}>
        <ButtonOnScreen onClick={openWindow} corner="topRight">
          <IoMdSettings title={locales.config} />
          {locales.config}
        </ButtonOnScreen>
      </Suspense>
      <Suspense fallback={null}>
        {windowShown && (
          <Modal close={closeWindow}>
            <div>
              <h3>
                <MdLanguage title="Change Language" />
                Language
              </h3>
              <select
                name="language"
                id="language"
                defaultValue={locales.getLanguage()}
                onChange={({ currentTarget }) => onLangSelectorCLicked(currentTarget.value)}
              >
                {availableLnags.map((lang, index) =>
                  <option value={lang} key={index}>{locales.getString("language", lang)}</option>
                )}
              </select>

              <h3><IoMdSettings title={locales.config} />{locales.config}</h3>
              <ToggleSwitchWithLabel label={locales.configFps} checked={false} onChange={toggleFps} />
              <div
                css={css`
                  display: grid;
                `}
              >
                <p>{locales.configFont}</p>
                <select
                  name="font"
                  id="font"
                  defaultValue={useStore.getState().fontName}
                  onChange={({ currentTarget }) => {useStore.setState({ fontName: currentTarget.value as googleFontNames })}}
                >
                  {useStore.getState().fontsGoogle.map((value, index) =>
                    <option value={value} key={index}>{value}</option>
                  )}
                </select>
                <p><a
                  href="https://fonts.google.com/?subset=japanese&preview.text=%E3%83%9E%E3%82%B8%E3%82%AB%E3%83%AB%E3%83%9F%E3%83%A9%E3%82%A4&preview.text_type=custom">フォントのプレビュー</a>
                </p>
              </div>
            </div>

            <h3><MdHelpOutline title={locales.about} />{locales.infoCredit}</h3>
            <ul>
              <li>
                ねんどカイトくん ver.1.00 by maebari via piapro (<a href="https://piapro.jp/t/eO5p">https://piapro.jp/t/eO5p</a>)
              </li>
              <li>
                ねんどレンくん ver.1.00 by maebari via piapro (<a href="https://piapro.jp/t/hmTb">https://piapro.jp/t/hmTb</a>)
              </li>
              <li>
                ねんどルカさん ver.1.00 by maebari via piapro (<a href="https://piapro.jp/t/3Kkd">https://piapro.jp/t/3Kkd</a>)
              </li>
              <li>
                ねんどメイコさん ver.1.00 by maebari via piapro (<a href="https://piapro.jp/t/_gcH">https://piapro.jp/t/_gcH</a>)
              </li>
              <li>
                ねんどミクさん ver.3.00 by maebari via piapro (<a href="https://piapro.jp/t/wyAD">https://piapro.jp/t/wyAD</a>)
              </li>
              <li>
                ねんどリンちゃん ver.1.20 by maebari via piapro (<a href="https://piapro.jp/t/0aEn">https://piapro.jp/t/0aEn</a>)
              </li>
              <li>
                BlockMan by Robert Mark [<a href="(https://creativecommons.org/licenses/by/3.0/)">CC-BY</a>]
                via <a href="https://poly.pizza/m/bHcxXYw8lnl">Poly Pizza</a>
              </li>
              <li>
                <a href="https://magicalmirai.com/2021/images/index/logo_main_w.svg">「マジカルミライ 2021」ロゴ画像</a>
              </li>
              <li>レコード盤イラスト: <a href="https://www.ac-illust.com/main/detail.php?id=126271">Illust AC</a></li>
            </ul>
            <hr />
            <p>{locales.infoCode}<a
              href="https://github.com/mo-san/San-Juke-Box">https://github.com/mo-san/San-Juke-Box</a></p>
          </Modal>
        )}
      </Suspense>
    </>
  );
};
