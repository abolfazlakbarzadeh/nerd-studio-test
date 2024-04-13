import { ChevronIcon, CtrlIcon, EnterIcon } from "@/components/icons";
import { Section } from "@/components/section";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Popover, Select } from "antd/lib";
import { LangSelection, langs } from "@/components/popovers/lang_selection";
import classNames from "classnames";

type Form = {
  original: string;
  reply: string;
  length: string;
  format: string;
  tone: string;
  language: string;
};

const ReplyType = () => {
  const [selectingLang, setSelectingLang] = useState(false);
  const { handleSubmit, register, setValue, watch } = useForm<Form>({
    defaultValues: {
      length: "Auto",
      tone: "Auto",
      format: "Auto",
      language: "english",
    },
  });

  const onSubmit = () => {};

  const radioButton = useCallback(
    (item: string, name: keyof Form) => (
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
                {langs.find((item) => item.id == watch("language"))?.title}{" "}
                <ChevronIcon />
              </div>
            </Popover>
          </Section>
        </div>
        <div
          className={classNames(
            "cursor-pointer flex items-center justify-center gap-2 text-[.75rem] ml-auto rounded-[2rem] w-fit min-w-[50%] min-h-[2.75rem] text-white transition-colors duration-200",
            {
              "bg-brand": watch("original") && watch("reply"),
              "bg-brand/50": !watch("original") || !watch("reply"),
            }
          )}
        >
          <div>Regenerate</div>
          <div className="flex gap-1 w-fit">
            <CtrlIcon />
            <EnterIcon />
          </div>
        </div>
      </form>
      <div className="w-[1px] bg-grayblue"></div>
      <Section className="flex-1" title="Preview">
        <div className="text-grayblue-400 text-[.75rem]">
          Generated content will be displayed here.
        </div>
      </Section>
    </div>
  );
};

export default ReplyType;
