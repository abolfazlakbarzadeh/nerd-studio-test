import { ComposeForm } from "@/app/write/types/compose";
import { GrammarForm } from "@/app/write/types/grammar";
import { ReplyForm } from "@/app/write/types/reply";
import { auto, langsList } from "@/components/popovers/lang_selection";
import { axios } from "@/http/axios";
import axiosPkg from "axios";
import { onDownloadProgress } from "./helpers";

export const compose = (
  abortController: AbortController,
  data: ComposeForm,
  onData: (data: any[]) => void,
  onFinish: () => void
) => {
  return axios
    .post(
      `/chat/completions`,
      {
        messages: [
          {
            content: `
            you are a composer assistant.
            do not explain anything only compose.`,
            role: "system",
          },
          {
            content: `please rewrite below text in length ${data.length} and format ${data.format} and tone ${data.tone} in ${data.language}:
            ${data.value}`,
            role: "user",
          },
        ],
        model: "deepseek-chat",
        stream: true,
      },
      {
        signal: abortController.signal,
        responseType: "stream",
        onDownloadProgress: onDownloadProgress(onData, onFinish),
      }
    )
    .catch((err) => {
      if (!axiosPkg.isCancel(err)) return Promise.reject(err);
    });
};
export const reply = (
  abortController: AbortController,
  data: ReplyForm,
  onData: (data: any[]) => void,
  onFinish: () => void
) => {
  return axios
    .post(
      `/chat/completions`,
      {
        messages: [
          {
            content: `
            you are a composer assistant.
            do not explain anything only compose.`,
            role: "system",
          },
          {
            content: `I have a ORIGINAL TEXT and a REPLY for it, please rewrite my REPLY to this ORIGINAL TEXT in length ${data.length} and format ${data.format} and tone ${data.tone} in ${data.language}, mind that only compose rewritten reply:
            ORIGINAL TEXT: "${data.original}"
            
            REPLY: "${data.reply}"
            `,
            role: "user",
          },
        ],
        model: "deepseek-chat",
        stream: true,
      },
      {
        signal: abortController.signal,
        responseType: "stream",
        onDownloadProgress: onDownloadProgress(onData, onFinish),
      }
    )
    .catch((err) => {
      if (!axiosPkg.isCancel(err)) return Promise.reject(err);
    });
};
export const grammar = (
  abortController: AbortController,
  data: GrammarForm,
  onData: (data: any[]) => void,
  onFinish: () => void
) => {
  return axios
    .post(
      `/chat/completions`,
      {
        messages: [
          {
            content: `
            you are a composer assistant.
            do not explain anything only compose.`,
            role: "system",
          },
          {
            content: `I have a TEXT that may has grammar, spelling, and etc mistakes or problems, correct them and return me back, do not ruine original meaning of TEXT:
            TEXT: "${data.text}"
            `,
            role: "user",
          },
        ],
        model: "deepseek-chat",
        stream: true,
      },
      {
        signal: abortController.signal,
        responseType: "stream",
        onDownloadProgress: onDownloadProgress(onData, onFinish),
      }
    )
    .catch((err) => {
      if (!axiosPkg.isCancel(err)) return Promise.reject(err);
    });
};
