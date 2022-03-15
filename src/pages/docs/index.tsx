import Layout from "../../layouts/main"
import { Image } from "../../components"
import clsx from "clsx"
import Link from "next/link"

const actions = [
  {
    title: "HTML",
    href: "docs/html",
    icon: "logos/html.svg",
    alt: "Html logo",
    shadow: "shadow-orange-500/50 dark:shadow-orange-400/50",
  },
  {
    title: "React",
    href: "docs/react",
    icon: "logos/react.svg",
    shadow: "shadow-cyan-500/50 dark:shadow-cyan-400/50",
  },
]

export default function Documentation() {
  return (
    <div className="justify-center divide-white dark:divide-dark-900 xs:divide-y-0 xs:grid xs:grid-cols-2 md:grid-cols-3 xs:gap-5">
      {actions.map((action) => (
        <div
          key={action.title}
          className={clsx(
            "rounded-lg mt-5 hover:scale-105 transition-transform shadow col-span-1 w-full relative group bg-white dark:bg-dark-850 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500",
            action.shadow
          )}
        >
          <div>
            <h3 className="text-lg font-medium md:text-2xl text-zinc-800 dark:text-white">
              <Link href={action.href}>
                <a className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0 z-10" aria-hidden="true" />
                  {action.title}
                </a>
              </Link>
            </h3>
          </div>
          <div className="flex content-center justify-center">
            <Image
              className="w-16 h-16 mx-auto"
              alt={action.alt}
              src={action.icon}
              height="64"
              width="64"
            />
          </div>
          <span
            className="absolute text-gray-300 pointer-events-none top-6 right-6 group-hover:text-gray-400"
            aria-hidden="true"
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
            </svg>
          </span>
        </div>
      ))}
    </div>
  )
}

Documentation.PrimaryLayout = Layout