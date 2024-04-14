"use client";
import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { ITranslateBox } from "./types";
import classNames from "classnames";
import {
  ChevronIcon,
  CopyIcon,
  SpeakerIcon,
  TrashIcon,
} from "@/components/icons";
import { Tooltip } from "react-tooltip";
import { Popover } from "antd/lib";
import * as _ from "lodash";
import { ButtonGroup } from "@/app/components/button_group";
import {
  LangSelection,
  auto,
  langs,
  langsList,
} from "@/components/popovers/lang_selection";

export const TranslateBox: ITranslateBox = ({
  input,
  detected,
  className,
  selectedLang,
  onLangChange,
  value,
  loading,
  onChange,
  ...props
}) => {
  const [currentLangs, setCurrentLangs] = useState(langsList);
  const [selectingLang, setSelectingLang] = useState(false);

  useEffect(() => {
    if (
      currentLangs &&
      !currentLangs
        .slice(0, input ? 2 : 3)
        .find((item: any) => item.id == selectedLang.id)
    ) {
      setCurrentLangs(
        _.uniqBy(
          [
            currentLangs.find((item: any) => item.id == selectedLang.id)!,
            ...currentLangs,
          ].filter(Boolean),
          (item) => item?.id
        )
      );
    }
  }, [selectedLang, input]);

  function handleCopy() {
    navigator.clipboard.writeText(value!);
  }

  const handleSpeech = () => {
    const synth = window.speechSynthesis;
    const speach = new SpeechSynthesisUtterance(value);

    synth.speak(speach);
  };

  return (
    <div className={classNames("flex flex-col gap-2", className)} {...props}>
      <div className="flex items-center gap-4">
        <ButtonGroup
          items={
            input
              ? [
                  {
                    ...auto,
                    title: detected ? `${detected.title} - Auto` : "Auto",
                  },
                  ...currentLangs,
                ].slice(0, 3)
              : currentLangs
          }
          selectedItem={detected ? auto.id : selectedLang.id}
          onSelect={(id) =>
            onLangChange([auto, ...langsList].find((item) => item.id == id)!)
          }
        />
        <Popover
          open={selectingLang}
          onOpenChange={setSelectingLang}
          arrow={false}
          trigger={"click"}
          placement="bottomRight"
          overlay
          rootClassName="rounded-[1.5rem] overflow-hidden border"
          content={
            <LangSelection
              selected={detected?.id || selectedLang.id}
              onSelected={(selected) => {
                onLangChange(langsList.find((item) => item.id == selected)!);
                setCurrentLangs(
                  _.uniqBy(
                    [
                      langsList.find((item) => item.id == selected)!,
                      ...currentLangs,
                    ],
                    (item) => item?.id
                  )
                );
              }}
            />
          }
        >
          <div
            className="p-[.25rem] rounded-md hover:bg-grayblue"
            onClick={() => setSelectingLang(!selectingLang)}
          >
            <ChevronIcon
              className={classNames("transition-transform duration-200", {
                "-rotate-180": selectingLang,
              })}
            />
          </div>
        </Popover>
      </div>
      <div
        className={classNames(
          "bg-grayblue-8 relative rounded-[1rem] overflow-hidden",
          {
            "border-transparent border hover:border-brand transition-colors duration-200":
              input,
          }
        )}
      >
        <textarea
          rows={10}
          value={value}
          onChange={({ target: { value } }) => onChange?.(value)}
          className="resize-none w-full bg-transparent px-4 py-[.75rem] outline-none text-[.875rem]"
          readOnly={!input}
          placeholder={loading ? "Waiting for response..." : "Enter text"}
        />
        <div className="absolute flex items-center gap-4 left-4 bottom-4 text-grayblue-400">
          <SpeakerIcon
            width={16}
            height={16}
            className="cursor-pointer"
            data-tooltip-id={`${input}-speak`}
            onClick={handleSpeech}
          />
          <CopyIcon
            width={16}
            height={16}
            className="cursor-pointer"
            data-tooltip-id={`${input}-copy`}
            onClick={handleCopy}
          />
          {value && input && (
            <TrashIcon
              width={16}
              height={16}
              className="cursor-pointer"
              data-tooltip-id={`${input}-clear`}
              onClick={() => onChange?.("")}
            />
          )}

          <Tooltip
            id={`${input}-speak`}
            openOnClick
            content="Speak"
            place="top"
            className="!rounded-[.75rem]"
          />
          <Tooltip
            id={`${input}-copy`}
            openOnClick
            content="Copy"
            place="top"
            className="!rounded-[.75rem]"
          />
          <Tooltip
            id={`${input}-clear`}
            openOnClick
            content="Clear"
            place="top"
            className="!rounded-[.75rem]"
          />
        </div>

        {loading &&
          (!value ? (
            <div className="bg-grayblue-8 absolute inset-0" />
          ) : (
            <div className="absolute bottom-4 left-[50%] text-grayblue-600 text-[.625rem] translate-x-[-50%]">
              Generating...
            </div>
          ))}
      </div>
    </div>
  );
};
export default TranslateBox;
