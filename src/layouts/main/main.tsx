import React, { FC, Fragment } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useTheme } from "next-use-theme";
import { Expand } from "@theme-toggles/react";
import { LayoutProps } from "./main.props";

const navigation = [
  { name: "Toggles", href: "/", matchAfter: false },
  { name: "About", href: "/about", matchAfter: false },
  { name: "Documentation", href: "/docs", matchAfter: true },
];

const NextLink = (props: { [x: string]: any; href: any; children: any }) => {
  const { href, children, ...rest } = props;
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
};

const Layout: FC<LayoutProps> = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { toggle, theme } = useTheme();

  const matches = (nav: (typeof navigation)[0]) => {
    if (nav.matchAfter) {
      return router.asPath.startsWith(nav.href);
    }
    return nav.href === router.asPath;
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-white dark:bg-dark-900">
      <div className="flex items-center justify-center bg-blue-500 px-6 py-2.5 sm:px-3.5">
        <p className="text-sm leading-6 text-white">
          <a href="https://pixeleye.io/home">
            <strong className="font-semibold">Pixeleye</strong>
            <svg
              viewBox="0 0 2 2"
              className="mx-2 inline h-0.5 w-0.5 fill-current"
              aria-hidden="true"
            >
              <circle cx={1} cy={1} r={1} />
            </svg>
            Checkout my latest project, Open Source visual testing
          </a>
        </p>
      </div>
      <div className="relative pt-6 pb-16 xs:pb-24">
        <Popover className="ignore-scrollbar">
          {({ open }) => (
            <>
              <div className="px-6 mx-auto max-w-7xl">
                <nav
                  className="relative flex items-center justify-between h-8 xs:justify-center"
                  aria-label="Global"
                >
                  <div className="flex items-center flex-1 xs:absolute xs:inset-y-0 xs:left-0">
                    <div className="flex items-center justify-between w-full h-8 xs:w-auto">
                      <div className="flex items-center">
                        {typeof window !== "undefined" && (
                          <Expand
                            className="text-3xl text-zinc-700 dark:text-zinc-300"
                            toggled={theme === "dark"}
                            onToggle={toggle}
                            idPrefix="main"
                          />
                        )}
                      </div>
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
                            "font-medium hover:text-zinc-900 dark:hover:text-white transition-colors",
                            matches(item)
                              ? "text-zinc-900 dark:text-white"
                              : "text-zinc-500 dark:text-zinc-400"
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
                        />
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
                          />
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
                        <Link href={item.href} key={item.name} passHref>
                          <Popover.Button
                            as={NextLink}
                            className={clsx(
                              "block px-3 py-2 rounded-md text-base font-medium hover:text-zinc-900 hover:bg-zinc-50 dark:hover:bg-dark-700",
                              matches(item)
                                ? "text-zinc-900 dark:text-blue-100"
                                : "text-zinc-500 dark:text-zinc-500"
                            )}
                          >
                            {item.name}
                          </Popover.Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <main className="px-4 mx-auto mt-6 sm:mt-12 max-w-7xl ">
          {children}
        </main>
      </div>
      <footer aria-labelledby="footer-heading" className="ignore-scrollbar">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16 lg:px-8">
          <div className="pt-8 mt-8 border-t border-gray-200 dark:border-dark-50 md:flex md:items-center md:justify-between">
            <p className="text-base text-gray-400">
              Theme Toggles, Built by{" "}
              <a
                className="text-blue-600 dark:text-blue-500 hover:dark:text-blue-400 hover:text-blue-800"
                href="https://ajones.uk"
              >
                Alfie Jones
              </a>
            </p>
            <div className="flex mt-8 space-x-6 md:mt-0">
              <a
                href="https://www.jsdelivr.com/package/npm/theme-toggles"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Github</span>
                JS<b>DELIVR</b>
              </a>
              <a
                href="https://github.com/alfiejones/theme-toggles"
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Github</span>
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
