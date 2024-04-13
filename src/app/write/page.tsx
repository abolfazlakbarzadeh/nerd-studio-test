"use client";
import React, { useMemo, useState } from "react";
import { ButtonGroup } from "../components/button_group";
import ComposeType from "./types/compose/compose";
import ReplyType from "./types/reply/reply";
import GrammarType from "./types/grammar/grammar";

const write_type = [
  {
    id: "compose",
    title: "Compose",
  },
  {
    id: "reply",
    title: "Reply",
  },
  {
    id: "grammar",
    title: "Grammar",
  },
];

const WritePage = () => {
  const [selectedType, setSelectedType] = useState(write_type[0].id);

  const type = useMemo(() => {
    switch (selectedType) {
      case write_type[0].id: {
        return <ComposeType />;
      }
      case write_type[1].id: {
        return <ReplyType />;
      }
      case write_type[2].id: {
        return <GrammarType />;
      }
    }
  }, [selectedType]);

  return (
    <div className="py-[1.5rem] px-[1.25rem] flex flex-col gap-2 h-full">
      <div className="font-semibold text-[1.5rem]">Write</div>
      <ButtonGroup
        items={write_type}
        selectedItem={selectedType}
        onSelect={setSelectedType}
      />
      <div className="grow">{type}</div>
    </div>
  );
};

export default WritePage;
