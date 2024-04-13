import React, { SVGProps } from "react";

export const SearchIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 14 14" {...props}>
      <g>
        <path
          fill="currentColor"
          d="M6.375.375a5.875 5.875 0 1 0 3.689 10.448l2.62 2.619a.625.625 0 1 0 .883-.884l-2.62-2.62A5.875 5.875 0 0 0 6.375.375ZM1.75 6.25a4.625 4.625 0 1 1 9.25 0 4.625 4.625 0 0 1-9.25 0Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};
