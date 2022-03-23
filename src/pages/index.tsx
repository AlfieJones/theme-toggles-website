import { NextSeo } from "next-seo";
import { ToggleGrid } from "../components";
import Layout from "../layouts/main";
import { toggles as toggleMeta } from "../toggles/data/meta";
import { generatePreview, toggles as toggleList } from "../toggles/utilities";

const Home = ({ toggles }: any) => (
  <>
    <NextSeo description="A Collection of dark and light theme toggles. Our toggles are built with SVG's driven by CSS transitions. The library also comes with official React support. The dark mode toggles work great with utility CSS Frameworks such as Tailwindcss" />
    <div className="pt-12 text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-gray-700 2xs:text-5xl dark:text-white md:text-6xl lg:text-7xl">
        <span className="bg-gradient-to-r text-transparent bg-clip-text from-blue-600 to-[#3eadcf] block pb-1 sm:pb-2 md:pb-3">
          Implementing theme toggles
        </span>
        <span className="block">was never easier</span>
      </h1>
      <p className="max-w-md mx-auto mt-5 text-base text-gray-500 dark:text-gray-200 sm:text-lg md:mt-7 md:text-xl md:max-w-3xl">
        Theme toggles is a collection of awesome, easy to use, animated toggles;
        designed for switching between light and dark modes. It&apos;s a modular
        library which aims to provide an ample customization where needed. Works
        great utility CSS frameworks such as Tailwindcss.
      </p>
    </div>
    <div className="mt-24">
      <h2 className="mb-12 text-4xl font-semibold text-center text-gray-700 xs:text-left dark:text-gray-50 ">
        Our toggle collection
      </h2>
      <ToggleGrid toggles={toggles} />
    </div>
  </>
);

Home.PrimaryLayout = Layout;

export async function getStaticProps() {
  const toggles: {
    name: string;
    svg: string;
    description: string;
    classesGrid: string;
    code?: string;
  }[] = toggleMeta;
  toggles.forEach((t) => {
    const toggle = toggleList.find((i: any) => i.name === t.svg);
    // eslint-disable-next-line no-param-reassign
    if (toggle) t.code = generatePreview(toggle);
  });

  return {
    props: {
      toggles,
    },
  };
}

export default Home;
