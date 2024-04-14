import {
  CopyIcon,
  CtrlIcon,
  EnterIcon,
  SpeakerIcon,
  TrashIcon,
} from "@/components/icons";
import { Section } from "@/components/section";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Tooltip } from "react-tooltip";
import { grammar } from "@/services/write.service";

export type GrammarForm = {
  text: string;
};

const GrammarType = () => {
  const [loading, setLoading] = useState(false);
  const abortController = useRef(new AbortController());
  const [generatedValue, setGeneratedValue] = useState<string>();
  const submitButton = useRef<HTMLButtonElement>(null);
  const resultElement = useRef<HTMLTextAreaElement>(null);
  const { handleSubmit, register, setValue, watch } = useForm<GrammarForm>({
    defaultValues: {},
  });

  const onSubmit = (data: GrammarForm) => {
    setGeneratedValue("");
    resultElement.current?.scrollIntoView({ behavior: "smooth" });
    setLoading(true);
    grammar(
      abortController.current,
      data,
      (data) => {
        const result = data
          .map((item: any) => item.choices?.[0].delta.content)
          .join("");
        setGeneratedValue(result);
      },
      () => {
        setLoading(false);
      }
    );
  };

  function handleCopy() {
    navigator.clipboard.writeText(watch("text"));
  }

  const handleCopyGenerated = () => {
    navigator.clipboard.writeText(generatedValue!);
  };
  const handleSpeech = () => {
    const synth = window.speechSynthesis;
    const speach = new SpeechSynthesisUtterance(generatedValue);

    synth.speak(speach);
  };

  useEffect(() => {
    const eventHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key == "Enter") {
        submitButton.current?.click();
      }
    };
    document.addEventListener("keydown", eventHandler);
    return () => {
      document.removeEventListener("keydown", eventHandler);
    };
  }, []);
  return (
    <div className="flex flex-col sm:flex-row gap-4 h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between gap-4 mt-2 flex-1"
      >
        <div className="bg-grayblue-8 rounded-[1rem] py-2 grow relative">
          <textarea
            maxLength={2000}
            className="resize-none w-full h-full px-4 py-[.75rem] outline-none text-[.75rem] bg-transparent"
            placeholder="You can paste the text below in order to check for grammar, spelling, and punctuation errors (this feature only supports English grammar)."
            {...register("text")}
          />
          <div className="absolute bottom-[1.25rem] left-0 right-0 flex items-center justify-between px-4 text-grayblue-600">
            <span>
              <div
                className={classNames("flex items-center gap-2", {
                  hidden: !watch("text"),
                })}
              >
                <CopyIcon
                  width={20}
                  height={20}
                  data-tooltip-id={`copy`}
                  onClick={handleCopy}
                />
                <TrashIcon
                  width={20}
                  height={20}
                  data-tooltip-id={`clear`}
                  onClick={() => setValue("text", "")}
                />

                <Tooltip
                  id={`copy`}
                  content="Copy"
                  place="top"
                  className="!rounded-[.75rem]"
                />
                <Tooltip
                  id={`clear`}
                  content="Clear"
                  place="top"
                  className="!rounded-[.75rem]"
                />
              </div>
            </span>
            <div className="text-[.75rem] text-grayblue-400">{`${
              watch("text")?.length || 0
            }/2000`}</div>
          </div>
        </div>
        <button
          ref={submitButton}
          type="submit"
          className={classNames(
            "cursor-pointer flex items-center justify-center gap-2 text-[.75rem] ml-auto rounded-[2rem] w-fit min-w-[50%] min-h-[2.75rem] text-white transition-colors duration-200",
            {
              "bg-brand": watch("text") && !loading,
              "bg-brand/50 pointer-events-none": !watch("text") || loading,
            }
          )}
        >
          <div>Improve with AI</div>
          <div className="flex gap-1 w-fit">
            <CtrlIcon />
            <EnterIcon />
          </div>
        </button>
      </form>
      <div className="w-[1px] bg-grayblue"></div>
      <Section
        contentClassName="h-full flex flex-col gap-4"
        className="flex-1"
        title={
          <div className="flex items-center justify-between">
            <div>Suggestions</div>
            <div
              className={classNames(
                "flex items-center gap-4 left-4 bottom-4 text-grayblue-400",
                {
                  hidden: !generatedValue,
                }
              )}
            >
              <SpeakerIcon
                width={16}
                height={16}
                className="cursor-pointer"
                data-tooltip-id={`speak`}
                onClick={handleSpeech}
              />

              <Tooltip
                id={`speak`}
                openOnClick
                content="Speak"
                place="top"
                className="!rounded-[.75rem]"
              />
            </div>
          </div>
        }
      >
        <div
          className={classNames("w-full h-full auto-rtl", {
            "bg-grayblue-8 rounded-[1rem] p-4 text-[.875rem]":
              generatedValue || loading,
            "text-grayblue-400 text-[.75rem]": !generatedValue,
          })}
        >
          <textarea
            rows={5}
            ref={resultElement}
            className="w-full h-full resize-none py-[.75rem] outline-none text-[.75rem] bg-transparent"
            placeholder="Generated content will be displayed here."
            readOnly={loading}
            value={
              generatedValue ||
              (loading ? "Waiting for response..." : generatedValue)
            }
            onChange={({ target: { value } }) => setGeneratedValue(value)}
          />
        </div>
        {generatedValue && (
          <div
            className="rounded-[2rem] bg-grayblue-300 py-3 text-center text-[.875rem] cursor-pointer active:brightness-90 animated"
            onClick={handleCopyGenerated}
          >
            Copy
          </div>
        )}
      </Section>
    </div>
  );
};

export default GrammarType;
