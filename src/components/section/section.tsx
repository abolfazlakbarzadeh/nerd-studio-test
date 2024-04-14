import classNames from "classnames";
import React, { FC, HTMLAttributes, PropsWithChildren, ReactNode } from "react";

declare interface ISection extends HTMLAttributes<HTMLDivElement> {
  title: any;
  contentClassName?: string;
}

export const Section: FC<PropsWithChildren<ISection>> = ({
  children,
  title,
  className,
  contentClassName,
  ...props
}) => {
  return (
    <div
      className={classNames("flex flex-col gap-2 w-full h-full", className)}
      {...props}
    >
      <div className="text-[.875rem]">{title}</div>
      <div className={classNames("w-full", contentClassName)}>{children}</div>
    </div>
  );
};
