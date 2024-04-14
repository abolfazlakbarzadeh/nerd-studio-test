"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SwapIcon } from "@/components/icons";
import classNames from "classnames";
import * as _ from "lodash";
import { translate } from "@/services/translate.service";
import dynamic from "next/dynamic";
import {
  Lang,
  auto,
  langs,
  langsList,
} from "@/components/popovers/lang_selection";
const TranslateBox = dynamic(
  () => import("./components/translate_box/translate_box"),
  { ssr: false }
);

const TranslatePage = () => {
  const [inputLang, setInputLang] = useState(auto);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<string>();
  const [translateLang, setTranslateLang] = useState(langs.english);
  const [translated, setTranslated] = useState<string>();
  const [detected, setDetected] = useState<(typeof langsList)[number]>();
  const abortController = useRef<AbortController>();

  const swappable = useMemo(
    () =>
      (inputLang?.id !== auto.id && inputLang?.id !== translateLang.id) ||
      detected,
    [detected, inputLang, translateLang]
  );

  function onSwap() {
    if (inputLang.id !== auto.id || detected) {
      if (detected) {
        console.log({
          detected,
        });
        setTranslateLang({ ...detected });
      } else {
        setTranslateLang(inputLang);
      }

      setInput(translated);
      setTranslated(input);
      setInputLang(translateLang);
      setDetected(undefined);
    }
  }

  const performTranslation = useCallback(
    _.debounce((input: string, inputLang: Lang, translateLang: Lang) => {
      setTranslated("");
      if (!input) return;
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();
      setLoading(true);
      translate(
        abortController.current,
        inputLang,
        translateLang,
        input!,
        (data) => {
          const resutl = data
            .map((item: any) => item.choices?.[0].delta.content)
            .join("");
          const results = resutl.split("\n");
          const translated = results.slice(1).join("").trim();
          const language = results[0]
            ?.toLowerCase()
            .trim() as keyof typeof langs;
          const lang = langs[language];
          setTranslated(translated);
          if (lang && inputLang.id == auto.id) {
            setDetected({ ...lang });
          } else {
            setDetected(undefined);
          }
        },
        () => {
          setLoading(false);
        }
      );
    }, 400),
    [detected]
  );

  useEffect(() => {
    performTranslation(input!, inputLang, translateLang);
  }, [input, inputLang, translateLang]);

  return (
    <div className="max-w-3xl mx-auto p-[1.5rem]">
      <div className="text-[1.5rem] font-bold">Translate</div>
      <div className="flex flex-col items-center gap-4 mt-8 ">
        <TranslateBox
          selectedLang={inputLang}
          onLangChange={setInputLang}
          value={input}
          className="w-full"
          input
          detected={detected}
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
          loading={loading}
        />
      </div>
    </div>
  );
};

export default TranslatePage;
