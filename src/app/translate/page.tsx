"use client";
import React, {
  Suspense,
  lazy,
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
import {
  Lang,
  auto,
  langs,
  langsList,
} from "@/components/popovers/lang_selection";
import { SupenseLoading } from "@/components/suspense_loading";
const TranslateBox = lazy(
  () => import("./components/translate_box/translate_box")
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
      if (!input) {
        abortController.current?.abort();
        setLoading(false);
        return;
      }
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
          // combine streamed data
          const result = data
            .map((item: any) => item.choices?.[0].delta.content)
            .join("");
          // split data by new lines
          const results = result.split("\n");
          // get language name from first line
          const language = results[0]
            ?.toLowerCase()
            .trim() as keyof typeof langs;
          // combine rest lines
          const translated = results.slice(1).join("").trim();
          // get language from language list
          const lang = langs[language];
          setTranslated(translated);

          // if source language is auto then set detected language as detected
          if (lang && inputLang.id == auto.id) {
            setDetected({ ...lang });
          } else {
            setDetected(undefined);
          }
        },
        () => {
          // when streaming finished disable loading
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
      <Suspense fallback={<SupenseLoading />}>
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
      </Suspense>
    </div>
  );
};

export default TranslatePage;
