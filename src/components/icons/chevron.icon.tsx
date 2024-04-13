import React, { SVGProps } from "react";

export const ChevronIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 28 28" {...props}>
      <g>
        <path
          fill="currentColor"
          d="M5.945 10.091a.781.781 0 0 1 1.105-.006l6.4 6.335a.781.781 0 0 0 1.1 0l6.4-6.335a.781.781 0 1 1 1.1 1.11l-6.401 6.335a2.344 2.344 0 0 1-3.298 0l-6.4-6.334a.781.781 0 0 1-.006-1.105Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};
