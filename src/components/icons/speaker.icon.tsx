import React, { SVGProps } from "react";

export const SpeakerIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="1em" height="1em" fill="none" viewBox="0 0 16 16" {...props}>
      <g>
        <path
          fill="currentColor"
          d="M10.611 2.906a.625.625 0 0 1 .818-.335c1.914.8 3.196 2.963 3.196 5.398 0 2.435-1.282 4.597-3.196 5.398a.625.625 0 0 1-.483-1.153c1.358-.568 2.429-2.207 2.429-4.245 0-2.039-1.071-3.677-2.429-4.245a.625.625 0 0 1-.335-.818Zm-4.283.233c.77-.841 2.172-.296 2.172.844V12.1c0 1.118-1.356 1.674-2.14.877l-2.01-2.04h-1.1A1.875 1.875 0 0 1 1.375 9.06V7.19c0-1.035.84-1.875 1.875-1.875h1.086L6.328 3.14Zm.922.844L5.072 6.361a.625.625 0 0 1-.46.203H3.25a.625.625 0 0 0-.625.625v1.872c0 .346.28.625.625.625h1.361c.168 0 .328.068.445.187L7.25 12.1V3.983Zm2.735.813a.625.625 0 0 0-.47 1.158c.634.257 1.172 1.021 1.172 2.015 0 .993-.537 1.757-1.172 2.014a.625.625 0 1 0 .47 1.159c1.183-.48 1.953-1.76 1.953-3.173s-.77-2.694-1.953-3.173Z"
          clipRule="evenodd"
          fillRule="evenodd"
        ></path>
      </g>
    </svg>
  );
};
