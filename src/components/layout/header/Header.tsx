"use client";
import React from "react";
import { MenuIcon } from "./Icons";
import Link from "next/link";
import Image from "next/image";
import { useSidebarContext } from "../sidebar/SidebarContext";
import { SearchIcon } from "@/assets/icon/Icons";
import { UserInfo } from "./userInfo/UserInfo";
import { ThemeToggleSwitch } from "./themeToggle/ThemeToggleSwitch";
import { Notification } from "./notification";


export default function Header() {
  const { toggleSidebar, isMobile } = useSidebarContext();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 shadow-1 dak:border-stroke-dark dark:bg-gray-dark md:px5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 text-gray-6 border-gray-4 dark:border-stroke-dark dark:bg[#020D1A] lg:hidden"
      >
        <MenuIcon />
        {/* <span>Toggle Sidebar</span> */}
      </button>

      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src="/images/logo/logo-icon.svg"
            width={32}
            height={32}
            alt=""
            role="presentation"
          />
        </Link>
      )}

      <div className="max-xl:hidden">
        <h1 className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          داشبورد
        </h1>
        <p className="font-medium">ادمین پنل</p>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 min-[375px]:gap-4">
        <div className="relative w-full max-w-[300px]">
          <input
            type="search"
            placeholder="جستجو"
            className="flex w-full items-center gap-3.5 rounded-full  bg-gray-3 text-gray-7 dark:text-gray-4  py-3 pl-[53px] pr-5  transition-colors focus-visible:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-dark-4 dark:hover:bg-dark-3 dark:hover:text-dark-6 dark:focus-visible:border-primary"
          />

          <SearchIcon className="pointer-events-none absolute text-gray-7 dark:text-gray-4 left-5 top-1/2 -translate-y-1/2 max-[1015px]:size-5" />
        </div>
        <ThemeToggleSwitch />
        <Notification />

        <div className="shrink-0">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
