import React from "react";
import { CopyIcon } from "./icons";

export default function CodeCopyBtn({ children, onClick }) {
  return (
    <div className="code-copy-btn text-grayblue-400" onClick={onClick}>
      <CopyIcon width={16} height={16} />
    </div>
  );
}
