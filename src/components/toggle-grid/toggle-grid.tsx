import clsx from "clsx"
import React, { FC } from "react"

const toggles = [
  {
    name: "Inner Moon",
    description: "Inspired by Google fonts toggle",
    href: "/",
    classes: "bg-[#318bb8]",
  },
  {
    name: "Inner Moon 2",
    description: "Inspired by Google fonts toggle",
    href: "/",
    classes: "bg-[#7CB9E8]",
  },
  {
    name: "Inner Moon 3",
    description: "Inspired by Google fonts toggle",
    href: "/",
    classes: "bg-[#72A0C1]",
  },
  {
    name: "Inner Moon 4",
    description: "Inspired by Google fonts toggle",
    href: "/",
    classes: "bg-[#6CB4EE]",
  },
]

const ToggleGrid: FC = () => {
  return (
    <ul
      role="list"
      className="grid grid-cols-1 justify-items-center xs:justify-items-stretch gap-x-8 gap-y-8 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {toggles.map((item) => (
        <li
          key={item.name}
          className="relative w-full max-w-[17rem] rounded-md"
        >
          <div className={clsx("rounded-t-md", item.classes)}>
            <label className="theme-toggle">
              <input type="checkbox" />
              <span className="sr-only">Toggle theme</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[75%] h-auto inner-moon mx-auto py-5 text-gray-900"
                width="472.39"
                height="472.39"
                fill="currentColor"
                viewBox="0 0 472.39 472.39"
              >
                <g className="toggle-outer">
                  <path d="M403.21,167V69.18H305.38L236.2,0,167,69.18H69.18V167L0,236.2l69.18,69.18v97.83H167l69.18,69.18,69.18-69.18h97.83V305.38l69.18-69.18Zm-167,198.17a129,129,0,1,1,129-129A129,129,0,0,1,236.2,365.19Z" />
                </g>
                <g className="toggle-inner">
                  <circle cx="236.2" cy="236.2" r="103.78" />
                </g>
              </svg>
            </label>
          </div>
          <div className="p-2 bg-gray-50 dark:bg-dark-800 rounded-b-md">
            <h3 className="block text-xl font-medium text-gray-900 truncate dark:text-gray-50">
              {item.name}
            </h3>
            <p className="block py-5 text-sm font-medium text-gray-500 dark:text-gray-200">
              {item.description}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default ToggleGrid
