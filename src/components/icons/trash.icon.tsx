import React, { SVGProps } from "react";

export const TrashIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16" {...props}>
      <g>
        <path
          fill="currentColor"
          d="M6.875 2a.625.625 0 1 0 0 1.25h2.25a.625.625 0 1 0 0-1.25h-2.25Zm-4.25 1.813a.625.625 0 1 0 0 1.25h1.063v7.062c0 1.036.839 1.875 1.874 1.875h4.875c1.036 0 1.876-.84 1.876-1.875V5.062h1.062a.625.625 0 1 0 0-1.25H2.625Zm2.313 8.312V5.062h6.125v7.063c0 .345-.28.625-.626.625H5.564a.625.625 0 0 1-.625-.625ZM8.624 7a.625.625 0 1 0-1.25 0v3.5a.625.625 0 1 0 1.25 0V7Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};
