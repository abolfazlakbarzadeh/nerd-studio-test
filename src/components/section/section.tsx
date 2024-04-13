import classNames from 'classnames'
import React, { FC, HTMLAttributes, PropsWithChildren } from 'react'

declare interface ISection extends HTMLAttributes<HTMLDivElement> {
    title: string
}

export const Section: FC<PropsWithChildren<ISection>> = ({ children, title, className, ...props }) => {
  return (
    <div className={classNames("flex flex-col gap-2 w-full", className)} {...props}>
        <div className="text-[.875rem]">
            {title}
        </div>
        <div className='w-full'>
            {children}
        </div>
    </div>
  )
}
