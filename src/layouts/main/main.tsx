import React, { FC, Fragment, ReactNode } from "react"
import Link from "next/link"
import clsx from "clsx"
import { Popover, Transition } from "@headlessui/react"
import { MenuIcon, XIcon } from "@heroicons/react/outline"
import { LayoutProps } from "./main.props"
import { useRouter } from "next/router"
import { useTheme } from "next-use-theme"
import { InnerMoon } from "@theme-toggles/react"

const navigation = [
  { name: "Toggles", href: "/" },
  { name: "Documentation", href: "/documentation" },
]

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const router = useRouter()
  const { toggle, theme } = useTheme()

  return (
    <>
      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-dark-900">
        <div className="relative pt-6 pb-16 xs:pb-24">
          <Popover>
            {({ open }: { open: boolean }) => (
              <>
                <div className="px-6 mx-auto max-w-7xl">
                  <nav
                    className="relative flex items-center justify-between h-8 xs:justify-center"
                    aria-label="Global"
                  >
                    <div className="flex items-center flex-1 xs:absolute xs:inset-y-0 xs:left-0">
                      <div className="flex items-center justify-between w-full h-8 xs:w-auto">
                        {typeof window !== "undefined" && (
                          <InnerMoon
                            className="text-3xl text-zinc-700 dark:text-zinc-300"
                            toggled={theme === "dark"}
                            onToggle={toggle}
                          />
                        )}
                        <div className="flex items-center -mr-2 xs:hidden">
                          <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 dark:text-zinc-300 dark:hover:text-zinc-200 hover:text-zinc-500 dark:hover:bg-dark-800 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="w-6 h-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden xs:flex xs:space-x-10">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={clsx(
                              "font-medium  hover:text-zinc-900 dark:hover:text-white transition-colors",
                              router.pathname === item.href
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-500 dark:text-zinc-300"
                            )}
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                    <div className="hidden xs:absolute xs:flex xs:items-center xs:justify-end xs:inset-y-0 xs:right-0">
                      <a
                        href="https://github.com/alfiejones/theme-toggles"
                        className="transition-colors text-zinc-400 dark:text-zinc-300 dark:hover:text-zinc-100 hover:text-zinc-500"
                      >
                        <span className="sr-only">Theme toggles on GitHub</span>
                        <svg
                          width="28"
                          height="28"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </nav>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="duration-150 ease-out"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="duration-100 ease-in"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Popover.Panel
                    focus
                    static
                    className="absolute inset-x-0 top-0 z-50 p-2 transition origin-top-right transform xs:hidden"
                  >
                    <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-dark-800 ring-1 ring-black ring-opacity-5">
                      <div className="flex items-center justify-between px-5 pt-4">
                        <a
                          href="https://github.com/alfiejones/theme-toggles"
                          className="transition-colors text-zinc-400 dark:text-zinc-300 dark:hover:text-zinc-100 hover:text-zinc-500"
                        >
                          <span className="sr-only">
                            Theme toggles on GitHub
                          </span>
                          <svg
                            width="28"
                            height="28"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                            ></path>
                          </svg>
                        </a>
                        <div className="-mr-2">
                          <Popover.Button className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-dark-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span className="sr-only">Close menu</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                          </Popover.Button>
                        </div>
                      </div>
                      <div className="px-2 pt-2 pb-3">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={clsx(
                              "block px-3 py-2 rounded-md text-base font-medium hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-dark-700",
                              router.pathname === item.href
                                ? "text-zinc-900 dark:text-zinc-100"
                                : "text-zinc-500 dark:text-zinc-400"
                            )}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </Popover.Panel>
                </Transition>
              </>
            )}
          </Popover>

          <main className="px-4 mx-auto mt-12 sm:mt-24 max-w-7xl ">
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default Layout
