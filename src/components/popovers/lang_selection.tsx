import classNames from "classnames";
import React, { FC, useMemo, useState } from "react";
import { SearchIcon, CheckIcon } from "../icons";

export const auto = {
  id: "auto",
  title: "Auto",
  code: "",
};

export const langs = {
  english: {
    id: "english",
    title: "English",
    code: "en-US",
  },
  spanish: {
    id: "spanish",
    title: "Spanish",
    code: "es",
  },
  persian: {
    id: "persian",
    title: "Persian",
    code: "fa-IR",
  },
};
export const langsList = Object.values(langs);
export type Lang = (typeof langsList)[number];

export const LangSelection: FC<{
  selected: string;
  onSelected: (selected: string) => void;
}> = ({ selected, onSelected }) => {
  const [search, setSearch] = useState<string>("");

  const langsItems = useMemo(() => {
    const items = langsList.filter((lang) =>
      lang.title.toLowerCase().includes(search?.toLowerCase())
    );
    if (!items.length)
      return (
        <div className="flex flex-col gap-4 items-center text-grayblue-400 py-8">
          <SearchIcon width={50} height={50} />
          <div>This language is not available.</div>
        </div>
      );
    return items.map((lang) => (
      <div
        key={lang.id}
        onClick={() => onSelected(lang.id)}
        className={classNames(
          "px-4 py-[.75rem] rounded-[.5rem] hover:bg-grayblue cursor-pointer flex items-center gap-2",
          {
            "text-brand": selected == lang.id,
          }
        )}
      >
        {lang.title}
        {selected == lang.id && <CheckIcon />}
      </div>
    ));
  }, [search, selected]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-4 relative bg-grayblue-8 rounded-[1rem] overflow-hidden">
        <SearchIcon
          className="absolute left-4 top-[50%] translate-y-[-50%]"
          width={16}
          height={16}
        />
        <input
          type="text"
          className="text-[.875rem] pl-[2.625rem] py-[.5rem] pr-[2rem] outline-none bg-transparent rounded-[1rem] border-transparent border focus:border-brand transition-colors duration-200"
          placeholder="Search"
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          tabIndex={0}
          autoFocus
        />
      </div>
      <div className="flex flex-col gap-2">{langsItems}</div>
    </div>
  );
};
