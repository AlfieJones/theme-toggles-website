import { ToggleGrid } from "../components"

export default function Home() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-700 2xs:text-5xl dark:text-white md:text-6xl lg:text-7xl">
          <span className="bg-gradient-to-r text-transparent bg-clip-text from-blue-600 to-[#3eadcf] block pb-1 sm:pb-2 md:pb-3">
            Implementing theme toggles
          </span>
          <span className="block">was never easier</span>
        </h1>
        <p className="max-w-md mx-auto mt-5 text-base text-gray-500 dark:text-gray-200 sm:text-lg md:mt-7 md:text-xl md:max-w-3xl">
          Theme toggles is a collection of awesome easy to use, animated
          toggles; designed for switching between light and dark modes.
          It&apos;s a highly customisable and modular library which aims to
          provide an unopinionated design. Even works great with Tailwind CSS.
        </p>
      </div>
      <section className="mt-24">
        <h2 className="mb-12 text-4xl font-semibold text-gray-700 dark:text-gray-50 ">
          Our toggle collection
        </h2>
        <ToggleGrid />
      </section>
    </>
  )
}
