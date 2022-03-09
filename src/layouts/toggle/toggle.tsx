import React, { createContext, FC, useState } from "react"
import { Tabs, Tab } from "../../components"
import { Toggle, ToggleLayoutProps } from "./toggle.props"

const tabs: Tab[] = [
  { title: "HTML", key: 0, pathname: "/html", default: true },
  { title: "React", key: 1, pathname: "/react", default: false },
]

export const ToggleContext = createContext<
  React.Dispatch<React.SetStateAction<Toggle | undefined>> | undefined
>(undefined)

const ToggleLayout: FC<ToggleLayoutProps> = ({
  children,
}: ToggleLayoutProps) => {
  const [toggle, setToggle] = useState<Toggle>()

  return (
    <ToggleContext.Provider value={setToggle}>
      <h1 className="ml-4 text-6xl font-bold text-zinc-700 dark:text-white">
        {toggle?.name}
      </h1>
      <p className="mt-4 mb-5 ml-4 text-2xl text-zinc-500 dark:text-zinc-400">
        {toggle?.description}
      </p>
      <Tabs tabs={tabs} base={toggle?.svg.toLowerCase()} />
      <div className="-mt-12">{children}</div>
    </ToggleContext.Provider>
  )
}

export default ToggleLayout
