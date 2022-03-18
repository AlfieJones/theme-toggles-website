/* eslint-disable jsx-a11y/label-has-associated-control */
import clsx from "clsx";
import Link from "next/link";
import React, { FC } from "react";

const ToggleGrid: FC<{ toggles: any }> = ({ toggles }: any) => (
  <ul className="grid grid-cols-1 justify-items-center xs:justify-items-stretch gap-x-8 gap-y-8 xs:grid-cols-2 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
    {toggles.map((item: any) => (
      <li
        key={item.name}
        className="relative w-full max-w-[17rem] rounded-md hover:scale-105 transition-all shadow-md dark:shadow-lg-strong dark:bg-dark-850 bg-white "
      >
        <div
          className={clsx("rounded-t-md px-4 xs:px-8 py-5", item.classesGrid)}
        >
          <label
            className="text-gray-900 theme-toggle"
            dangerouslySetInnerHTML={{
              __html: `<input type="checkbox" /><span class="sr-only">Toggle theme</span>${item.code}`,
            }}
          />
        </div>
        <Link href={`/${item.svg}`}>
          <a>
            <div className="p-2 rounded-b-md">
              <h3 className="block text-xl font-bold text-gray-700 truncate dark:text-gray-100">
                {item.name}
              </h3>
              <p className="block pt-1 pb-5 text-sm font-medium text-gray-500 dark:text-gray-300">
                {item.description}
              </p>
              <p className="font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                See the code
              </p>
            </div>
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

export default ToggleGrid;
