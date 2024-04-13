import React, { SVGProps } from "react";

export const CopyIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16" {...props}>
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6.125 2C5.089 2 4.25 2.84 4.25 3.875v.375h-.375C2.839 4.25 2 5.09 2 6.125v6C2 13.161 2.84 14 3.875 14h6c1.036 0 1.875-.84 1.875-1.875v-.375h.375c1.036 0 1.875-.84 1.875-1.875v-6C14 2.839 13.16 2 12.125 2h-6Zm5.625 8.5h.375c.345 0 .625-.28.625-.625v-6a.625.625 0 0 0-.625-.625h-6a.625.625 0 0 0-.625.625v.375h4.375c1.036 0 1.875.84 1.875 1.875V10.5Zm-8.5-4.375c0-.345.28-.625.625-.625h6c.345 0 .625.28.625.625v6c0 .345-.28.625-.625.625h-6a.625.625 0 0 1-.625-.625v-6Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
};
