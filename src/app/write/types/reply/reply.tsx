import {
  ChevronIcon,
  CtrlIcon,
  EnterIcon,
  SpeakerIcon,
} from "@/components/icons";
import { Section } from "@/components/section";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { Button, Popover, Select } from "antd/lib";
import {
  LangSelection,
  langs,
  langsList,
} from "@/components/popovers/lang_selection";
import classNames from "classnames";
import { Tooltip } from "react-tooltip";
import { LoadingSpinner } from "@/components/loading_spinner";
import { reply } from "@/services/write.service";

export type ReplyForm = {
  original: string;
  reply: string;
  length: string;
  format: string;
  tone: string;
  language: string;
};

const ReplyType = () => {
  const [loading, setLoading] = useState(false);
  const abortController = useRef(new AbortController());
  const [generatedValue, setGeneratedValue] = useState<string>();
  const submitButton = useRef<HTMLButtonElement>(null);
  const resultElement = useRef<HTMLTextAreaElement>(null);
  const [selectingLang, setSelectingLang] = useState(false);
  const { handleSubmit, register, setValue, watch } = useForm<ReplyForm>({
    defaultValues: {
      length: "Auto",
      tone: "Auto",
      format: "Auto",
      language: "english",
    },
  });

  const onSubmit = (data: ReplyForm) => {
    setGeneratedValue("");
    resultElement.current?.scrollIntoView({ behavior: "smooth" });
    setLoading(true);
    reply(
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

  const radioButton = useCallback(
    (item: string, name: keyof ReplyForm) => (
      <>
        <input
          type="radio"
          id={`${name}-${item}`}
          className="hidden peer"
          {...register(name)}
          value={item}
        />
        <label
          className="peer-checked:bg-brand/20 p-2 text-[.75rem] bg-grayblue rounded-[.5rem]"
          htmlFor={`${name}-${item}`}
        >
          {item}
        </label>
      </>
    ),
    [register]
  );

  const lengths = useMemo(() => {
    return ["Auto", "Short", "Medium", "Long"].map((item) => (
      <div key={item}>{radioButton(item, "length")}</div>
    ));
  }, [radioButton]);

  const formats = useMemo(() => {
    return ["Auto", "Comment", "Email", "Message", "Twitter"].map((item) => (
      <div key={item}>{radioButton(item, "format")}</div>
    ));
  }, [radioButton]);
  const tones = useMemo(() => {
    return [
      "Auto",
      "Amicable",
      "Casual",
      "Friendly",
      "Professional",
      "Witty",
      "Funny",
      "Formal",
    ].map((item) => <div key={item}>{radioButton(item, "tone")}</div>);
  }, [radioButton]);

  const handleCopy = () => {
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
        <div className="flex flex-col gap-4">
          <Section title="Original Text">
            <div className="bg-grayblue-8 rounded-[1rem] p-2">
              <textarea
                rows={5}
                className="w-full px-4 py-[.75rem] outline-none text-[.75rem] bg-transparent"
                placeholder="The original text to which you want to reply."
                {...register("original")}
              />
            </div>
          </Section>
          <Section title="What To Reply">
            <div className="bg-grayblue-8 rounded-[1rem] p-2">
              <textarea
                rows={5}
                className="w-full px-4 py-[.75rem] outline-none text-[.75rem] bg-transparent"
                placeholder="The general content of you reply to above text. Hit Ctrl+Enter to generate draft."
                {...register("reply")}
              />
            </div>
          </Section>
          <Section title="Length">
            <div className="flex items-center flex-wrap gap-2">{lengths}</div>
          </Section>
          <Section title="Format">
            <div className="flex items-center flex-wrap gap-2 gap-y-4">
              {formats}
            </div>
          </Section>
          <Section title="Tone">
            <div className="flex items-center flex-wrap gap-2 gap-y-4">
              {tones}
            </div>
          </Section>
          <Section title="Output Language">
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
                  selected={watch("language")}
                  onSelected={(selected) => {
                    setValue("language", selected);
                  }}
                />
              }
            >
              <div className="cursor-pointer min-w-[8.75rem] flex justify-between items-center px-[.75rem] py-[.315rem] rounded-[1rem] bg-grayblue w-fit text-[.75rem]">
                {langsList.find((item) => item.id == watch("language"))?.title}{" "}
                <ChevronIcon />
              </div>
            </Popover>
          </Section>
        </div>
        <button
          ref={submitButton}
          type="submit"
          className={classNames(
            "cursor-pointer flex items-center justify-center gap-2 text-[.75rem] ml-auto rounded-[2rem] w-fit min-w-[50%] min-h-[2.75rem] text-white transition-colors duration-200",
            {
              "bg-brand": watch("original") && watch("reply") && !loading,
              "bg-brand/50 pointer-events-none":
                !watch("original") || !watch("reply") || loading,
            }
          )}
        >
          {loading && <LoadingSpinner />}
          <div>Regenerate</div>
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
            <div>Preview</div>
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
            onClick={handleCopy}
          >
            Copy
          </div>
        )}
      </Section>
    </div>
  );
};

export default ReplyType;
