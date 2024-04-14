import { AxiosProgressEvent } from "axios";

export const onDownloadProgress =
  (onData: (data: any) => void, onFinish: () => void) =>
  (event: AxiosProgressEvent) => {
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
  };
