import React, { FC, useEffect } from "react"
import { CodeProps } from "./code.props";
import { highlightAll } from "prismjs";
import clsx from "clsx";

const Code: FC<CodeProps> = ({
  className,
  preClasses,
  children,
  ...rest
}: CodeProps) => {
    useEffect(() => {
        highlightAll();
      }, [children]);
  return (
    <pre className={clsx(className, preClasses)} {...rest}>
      <code className={className}>{children}</code>
    </pre>
  )
}

export default Code
