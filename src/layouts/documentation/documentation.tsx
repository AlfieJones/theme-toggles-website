import React, { FC } from "react"
import { Tab, Tabs } from "../../components"
import { DocumentationProps } from "./documentation.props"
import {NextSeo} from "next-seo"

const tabs: Tab[] = [
  { title: "HTML", key: 0, pathname: "/html", default: true },
  { title: "React", key: 1, pathname: "/react", default: false },
]
const SettingsLayout: FC<DocumentationProps> = ({
  children,
}: DocumentationProps) => {
  return (
    <>
    <NextSeo
      title="Docs"
      description="Documentation for theme toggles" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
        Framework
      </h3>
      <Tabs tabs={tabs} base="/docs" concatBase />
      <div className="-mt-10 text-gray-900 dark:text-gray-100">{children}</div>
    </>
  )
}

export default SettingsLayout
