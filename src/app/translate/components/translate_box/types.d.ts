import { langs, langsList } from "@/components/popovers/lang_selection";
import { FC, HTMLAttributes } from "react";

declare interface ITranslateBoxProps extends HTMLAttributes<HTMLDivElement> {
  detected?: (typeof langsList)[number];
  selectedLang: (typeof langsList)[number];
  onLangChange: (lang: (typeof langsList)[number]) => void;
  value?: string;
  input?: boolean;
  loading?: boolean;
  onChange?: (value: string) => void;
}
declare type ITranslateBox = FC<ITranslateBoxProps>;
