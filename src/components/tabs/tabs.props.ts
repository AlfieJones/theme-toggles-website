export interface Tab {
  title: string
  pathname: string
  key: number
  default: boolean
}

export interface TabProps {
  tabs: Tab[]
  base?: string
}
