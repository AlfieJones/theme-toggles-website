import React, { FC, useEffect } from "react"
import { CodeProps } from "./code.props";
import { highlight, languages } from "prismjs";
import clsx from "clsx";

export const CodeFormatter: FC<CodeProps> = ({
  className,
  children,
  ...rest
}: CodeProps) => {
      const name = className?.match(/(language-)([^\s]+)/) || [""];
      const lang = name[0].replace("language-", "");
  return (
    <pre className={clsx(className, "overflow-y-scroll scrollbar-thin dark:scrollbar-thumb-zinc-500 scrollbar-thumb-zinc-400 dark:scrollbar-track-dark-50 scrollbar-track-zinc-200 scrollbar-thumb-rounded-full scrollbar-track-rounded-full")} {...rest}>
      <code className={className} dangerouslySetInnerHTML={{__html: highlight(children as string, languages[lang], lang)}}></code>
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