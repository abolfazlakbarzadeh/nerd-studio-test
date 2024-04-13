"use client";
import { TranslateIcon } from "@/components/icons";
import { WriteIcon } from "@/components/icons/write.icon";
import Image from "next/image";
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import avatar from "@/assets/images/avatar.jpg";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    id: "translate",
    title: "Translate",
    href: "/translate",
    icon: TranslateIcon,
  },
  {
    id: "write",
    title: "Write",
    href: "/write",
    icon: WriteIcon,
  },
];

const MonicaLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isActive = useCallback((href: string) => pathname == href, [pathname]);

  const navItems = useMemo(() => {
    return navigationItems.map((item) => {
      const Icon = item.icon;
      return (
        <Link
          href={item.href}
          key={item.id}
          className={classNames(
            "rounded-[2rem] px-[.2rem] sm:px-[.875rem] flex flex-col sm:flex-row items-center gap-2 sm:gap-[.625rem] sm:h-[3rem] cursor-pointer",
            {
              "text-secondary sm:hover:bg-white/50": !isActive(item.href),
              "text-brand sm:bg-white": isActive(item.href),
            }
          )}
        >
          <Icon width={26} height={26} />
          <span className="text-[.75rem] sm:text-[.875rem] text-secondary sm:text-black">
            {item.title}
          </span>
        </Link>
      );
    });
  }, [isActive]);

  return (
    <div className="bg-nav flex sm:flex-row-reverse">
      <div className="w-full rounded-[1rem] bg-white">{children}</div>
      <aside className="sm:w-[16.125rem] sm:pt-[1.625rem] sm:px-[1.25rem] flex flex-col justify-between sm:justify-start">
        <div className="hidden justify-between items-center sm:flex">
          <div className="text-[1.25rem] text-black font-bold ">
            Nerd Studio
          </div>
          <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden">
            <Image src={avatar.src} width={24} height={24} alt="avatar" />
          </div>
        </div>
        <div className="flex flex-col gap-[.375rem] mt-4">{navItems}</div>
        <div className="flex flex-col items-center sm:hidden pb-[1.75rem]">
          <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden">
            <Image src={avatar.src} width={24} height={24} alt="avatar" />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MonicaLayout;
