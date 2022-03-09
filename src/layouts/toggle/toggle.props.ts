import { ReactNode } from "react"

export interface Toggle {
  name: string
  svg: string
  description?: string
  classesGrid?: string
  classesToggle?: string
}

export interface ToggleLayoutProps {
  children?: ReactNode
}
