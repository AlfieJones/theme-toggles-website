import { NextSeo } from "next-seo";
import {
  CloudDownloadIcon,
  PencilAltIcon,
  BadgeCheckIcon,
} from "@heroicons/react/outline";
import Layout from "../layouts/main";

const features = [
  {
    name: "Tiny",
    description: "Theme toggles is tiny comprising of roughly 1.5kb gzipped",
    icon: CloudDownloadIcon,
  },
  {
    name: "Accessible",
    description:
      "Our goal is to ensure the toggles remain as accessible as possible. This includes proper screen reader support.",
    icon: BadgeCheckIcon,
  },
  {
    name: "Customizable",
    description:
      "We allow for customization of basic features ensuring you get the toggle you want without being inundated with options",
    icon: PencilAltIcon,
  },
];

const Home = () => (
  <>
    <NextSeo description="About the theme toggles project" title="About" />
    <div className="relative py-6 sm:py-8 lg:py-12">
      <div className="max-w-md px-4 mx-auto text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-base font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-500">
          About
        </h1>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          Why Theme Toggles
        </p>
        <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose dark:text-gray-200">
          Our project provides you with a quick and effortless way to implement
          well designed toggles. With more websites supporting both light and
          dark themes, it&apos;s important to ensure sites also have a clean and
          accessible toggle
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root px-6 pb-8 rounded-lg bg-gray-50 dark:bg-dark-800">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                        <feature.icon
                          className="w-6 h-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900 dark:text-gray-100">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500 dark:text-gray-300 sm:h-24 lg:h-28">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose dark:text-gray-200">
          We use SVG&rsquo;s for each of our toggles, animating them with CSS.
          Using SVG&rsquo;s instead of html elements like div&rsquo;s enables us
          to have minimal markup whilst maintaining a high quality and scalable
          icon.
        </p>
      </div>
    </div>
    <div className="max-w-md px-4 mx-auto text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-base font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-500">
        Who
      </h1>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Who maintains theme toggles
      </p>
      <p className="mx-auto mt-5 text-xl text-gray-500 max-w-prose dark:text-gray-200">
        My names Alfie and I maintain this project in my spare time. You can
        find out more about me on my{" "}
        <a className="text-blue-500" href="https://ajones.uk">
          portfolio site
        </a>
      </p>
    </div>
    <div className="max-w-md px-4 mx-auto mt-20 text-center sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-base font-semibold tracking-wider text-blue-600 uppercase dark:text-blue-500">
        Sponsor
      </h1>
      <p className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
        Sponsor this project
      </p>
      <p className="pb-6 mx-auto mt-5 text-xl text-gray-500 max-w-prose dark:text-gray-200">
        You can sponsor me on this project as well as many others{" "}
      </p>
      <a
        className="p-2 text-xl border border-pink-200 rounded-md bg-pink-50 dark:bg-pink-200 dark:border-pink-300 group"
        href="https://github.com/sponsors/AlfieJones"
      >
        <svg
          aria-hidden="true"
          height="1em"
          viewBox="0 0 16 16"
          width="1em"
          className="inline-block mr-0 text-pink-500 transform group-hover:scale-110"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.565 20.565 0 008 13.393a20.561 20.561 0 003.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.75.75 0 01-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5zM8 14.25l-.345.666-.002-.001-.006-.003-.018-.01a7.643 7.643 0 01-.31-.17 22.075 22.075 0 01-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.08 22.08 0 01-3.744 2.584l-.018.01-.006.003h-.002L8 14.25zm0 0l.345.666a.752.752 0 01-.69 0L8 14.25z"
          />
        </svg>
        <span className="ml-1 text-gray-700 dark:text-gray-800">Sponsor</span>
      </a>
    </div>
  </>
);

Home.PrimaryLayout = Layout;

export default Home;
