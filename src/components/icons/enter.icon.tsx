import React, { SVGProps } from "react";

export const EnterIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 17 16" {...props}>
      <g>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.5 2.625a.625.625 0 0 0-1.25 0v5.938c0 .345-.28.624-.625.624H4.134l2.495-2.495a.625.625 0 0 0-.883-.884L3.067 8.487a1.875 1.875 0 0 0 0 2.651l2.679 2.679a.625.625 0 1 0 .883-.884l-2.495-2.495h8.491c1.036 0 1.875-.84 1.875-1.876V2.625Z"
          fill="currentColor"
        ></path>
      </g>
    </svg>
  );
};
