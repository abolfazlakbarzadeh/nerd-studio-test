import { CopyIcon, CtrlIcon, EnterIcon, TrashIcon } from "@/components/icons";
import { Section } from "@/components/section";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { Tooltip } from "react-tooltip";

type Form = {
  text: string;
};

const GrammarType = () => {
  const { handleSubmit, register, setValue, watch } = useForm<Form>({
    defaultValues: {},
  });

  const onSubmit = () => {};

  function handleCopy() {
    navigator.clipboard.writeText(watch("text"));
  }

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
        <div
          className={classNames(
            "cursor-pointer flex items-center justify-center gap-2 text-[.75rem] ml-auto rounded-[2rem] w-fit min-w-[50%] min-h-[2.75rem] text-white transition-colors duration-200",
            {
              "bg-brand": watch("text"),
              "bg-brand/50": !watch("text"),
            }
          )}
        >
          <div>Improve with AI</div>
          <div className="flex gap-1 w-fit">
            <CtrlIcon />
            <EnterIcon />
          </div>
        </div>
      </form>
      <div className="w-[1px] bg-grayblue"></div>
      <Section className="flex-1" title="Suggestions">
        <div className="text-grayblue-400 text-[.75rem]">
          Provide any text and get suggestions for grammar, spelling, and
          punctuation.
        </div>
      </Section>
    </div>
  );
};

export default GrammarType;
