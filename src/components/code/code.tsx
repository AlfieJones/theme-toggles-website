import React, { FC, useEffect } from "react"
import { CodeProps } from "./code.props";
import { highlight, languages } from "prismjs";
import pkg from "theme-toggles/package.json"
import clsx from "clsx";

export const CodeFormatter: FC<CodeProps> = ({
  className,
  children,
  ...rest
}: CodeProps) => {
      const name = className?.match(/(language-)([^\s]+)/) || [""];
      const lang = name[0].replace("language-", "");
      const code = ((children || "") as string).replace("{html-version}", pkg.version)
  return (
    <pre className={clsx(className, "overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-zinc-500 scrollbar-thumb-zinc-400 dark:scrollbar-track-dark-50 scrollbar-track-zinc-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full")} {...rest}>
      <code className={className} dangerouslySetInnerHTML={{__html: highlight(code, languages[lang], lang)}}></code>
    </pre>
  )
}

const Code: FC<CodeProps> = ({
  className,
  preClasses,
  children,
  ...rest
}: CodeProps) => {
  return (
    <pre className={clsx(className, preClasses, "overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-zinc-500 scrollbar-thumb-zinc-400 dark:scrollbar-track-dark-50 scrollbar-track-zinc-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full")} {...rest}>
      <code className={className} dangerouslySetInnerHTML={{__html: children as string}}></code>
    </pre>
  )
}

export default Code