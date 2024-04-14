import { auto, langsList } from "@/components/popovers/lang_selection";
import { axios } from "@/http/axios";
import axiosPkg from "axios";

export const translate = (
  abortController: AbortController,
  from: (typeof langsList)[number],
  to: (typeof langsList)[number],
  text: string,
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
            you are a translator assistant.
            do not explain anything only translate.
            You have to give from language as which language you are translating from and to language as which language you are translating to, in following a plain text will provided that you have to translate to the language that mentioned as "to", may from language be "Auto Detect" so you have to detect from language by looking to text that user provided.
            note that you have to return from language in universal names, FOR EXAMPLE: persian NOT farsi.

            INPUT EXAMPLE: \`translate this text from "Auto Detect" to "persian": "Hello there"\`
            OUTPUT EXAMPLE: \`
            english
            سلام
            \`

            OUTPUT FORMAT:
            {FORM_LANGUAGE}
            {TRANSLATED_INPUI}
            `,
            role: "system",
          },
          {
            content: `translate this text from "${
              from.id == auto.id ? "Auto Detect" : from.id
            }" to "${to.id}": "${text}"`,
            role: "user",
          },
        ],
        model: "deepseek-chat",
        stream: true,
      },
      {
        signal: abortController.signal,
        responseType: "stream",
        onDownloadProgress: (event) => {
          const xhr = event.event.target;
          const { response } = xhr;
          const data = (response as string)
            .split(/\n\n/)
            .filter(Boolean)
            .map((item) => {
              const clean = item.replace("data: ", "");
              try {
                return JSON.parse(clean);
              } catch (error) {
                if (item.includes("[DONE]")) onFinish();
                return undefined;
              }
            });
          onData(data.filter(Boolean));
        },
      }
    )
    .catch((err) => {
      if (!axiosPkg.isCancel(err)) return Promise.reject(err);
    });
};
