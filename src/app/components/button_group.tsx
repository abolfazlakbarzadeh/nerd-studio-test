"use client";
import classNames from "classnames";
import React, { FC, useEffect, useMemo, useRef } from "react";

interface IButtonGroupProps {
  items: {
    id: string;
    title: string;
  }[];
  selectedItem: string;
  onSelect: (selected: string) => void;
}

export const ButtonGroup: FC<IButtonGroupProps> = ({
  items,
  selectedItem,
  onSelect,
}) => {
  const pointerRef = useRef<HTMLSpanElement>(null);
  const langsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (langsRef.current && pointerRef.current) {
      const element = langsRef.current.querySelector(
        `[data-id='${selectedItem}']`
      );
      pointerRef.current.style.width = `${element?.clientWidth}px`;
      //@ts-ignore
      pointerRef.current.style.left = `${element?.offsetLeft}px`;
    }
  }, [selectedItem, items]);
  const langItems = useMemo(() => {
    return items.map((item) => (
      <div
        key={item!.id}
        data-id={item!.id}
        onClick={() => onSelect(item!.id)}
        className={classNames(
          "px-[.75rem] text-[.875rem] leading-[1.5rem] rounded-[2rem] py-1.5 z-10 cursor-pointer transition-all duration-200",
          { "text-white": selectedItem == item!.id }
        )}
      >
        {item!.title}
      </div>
    ));
  }, [selectedItem, items]);

  return (
    <div
      ref={langsRef}
      className="flex items-center bg-grayblue w-fit rounded-[2rem] px-2 relative"
    >
      <span
        ref={pointerRef}
        className="absolute h-[80%] bg-active rounded-[2rem] z-0 transition-all duration-200"
      />
      {langItems}
    </div>
  );
};
