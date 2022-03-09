import { useRouter } from "next/router"
import React, { FC } from "react"
import { Tab, Tabs } from "../../components"
import { DocumentationProps } from "./documentation.props"

const tabs: Tab[] = [
  { title: "HTML", key: 0, pathname: "#html", default: true },
  { title: "React", key: 1, pathname: "#react", default: false },
]
const SettingsLayout: FC<DocumentationProps> = ({
  children,
}: DocumentationProps) => {
  return (
    <>
      <Tabs tabs={tabs} base="documentation" />
      <div className="mt-5">{children}</div>
    </>
  )
}

export default SettingsLayout
