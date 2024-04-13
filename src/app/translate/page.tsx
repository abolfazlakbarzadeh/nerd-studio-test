"use client";
import React, { useMemo, useState } from "react";
import { TranslateBox } from "./components/translate_box/translate_box";
import { SwapIcon } from "@/components/icons";
import classNames from "classnames";

const TranslatePage = () => {
  const [inputLang, setInputLang] = useState("auto");
  const [input, setInput] = useState<string>();
  const [translateLang, setTranslateLang] = useState("english");
  const [translated, setTranslated] = useState<string>();
  const [detected, setDetected] = useState();

  const swappable = useMemo(
    () => (inputLang !== "auto" && inputLang !== translateLang) || detected,
    [detected, inputLang, translateLang]
  );

  function onSwap() {
    if (inputLang !== "auto" || detected) {
      if (detected) {
        setTranslateLang(detected);
      } else {
        setTranslateLang(inputLang);
      }

      setInput(translated);
      setTranslated(input);
      setInputLang(translateLang);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-[1.5rem]">
      <div className="text-[1.5rem] font-bold">Translate</div>
      <div className="flex flex-col items-center gap-4 mt-8 ">
        <TranslateBox
          selectedLang={inputLang}
          onLangChange={setInputLang}
          value={input}
          className="w-full"
          input
          onChange={setInput}
        />
        <div
          className={classNames("p-2 bg-grayblue rounded-full", {
            "text-disable pointer-events-none": !swappable,
          })}
        >
          <SwapIcon width={20} height={20} onClick={onSwap} />
        </div>
        <TranslateBox
          selectedLang={translateLang}
          onLangChange={setTranslateLang}
          className="w-full"
          value={translated}
          onChange={setTranslated}
        />
      </div>
    </div>
  );
};

export default TranslatePage;
