import { FC, HTMLAttributes } from "react";

declare interface ITranslateBoxProps extends HTMLAttributes<HTMLDivElement> {
  detected?: string;
  selectedLang: string;
  onLangChange: (lang: string) => void;
  value?: string;
  input?: boolean;
  onChange?: (value: string) => void;
}
declare type ITranslateBox = FC<ITranslateBoxProps>;
