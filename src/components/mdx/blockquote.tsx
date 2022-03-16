import clsx from "clsx";
import { DetailedHTMLProps, FC } from "react";

type HeadingProps = DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;


export const BlockQuote: FC<HeadingProps> = ({className, children, ...props}) => {
    return <blockquote className={clsx("border-l-8 border dark:border-dark-50 pl-4 my-4", className)} {...props}>{children}</blockquote>
  }
  