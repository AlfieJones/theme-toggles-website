import { HTMLAttributes } from "react";

export interface Tab {
  title: string;
  pathname: string;
  key: number;
  default: boolean;
}

export interface TabProps extends HTMLAttributes<HTMLDivElement> {
  tabs: Tab[];
  base?: string;
  concatBase?: boolean;
}
