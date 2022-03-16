import Link from "next/link"
import Layout from "../layouts/main"
import {NextSeo} from "next-seo"

export default function Error() {
  return (
    <>        <NextSeo
    title="404"
    description="The page couldn't be found"
  />
  <div className="min-h-full px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-blue-600 sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
                  Page not found
                </h1>
                <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                  Please check the URL in the address bar and try again.
                </p>
              </div>
              <div className="flex mt-10 space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link href="/">
                  <a
                    className="text-base font-medium text-blue-600 hover:text-blue-500"
                  >
                    Go back home<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div></>
  )
}

Error.PrimaryLayout = Layout
