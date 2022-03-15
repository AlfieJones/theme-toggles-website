import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react"
import clsx from "clsx";

type HeadingProps = DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;

type ParagraphProps = DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;


export const H1: FC<HeadingProps> = ({className, children, ...props}) => {
  return <h1 className={clsx("text-4xl text-gray-900 dark:text-gray-100 mb-8 mt-14", className)} {...props}>{children}</h1>
}

export const H2: FC<HeadingProps> = ({className, children, ...props}) => {
  return <h2 className={clsx("text-3xl text-gray-900 dark:text-gray-100 mb-8 mt-14", className)} {...props}>{children}</h2>
}

export const H3: FC<HeadingProps> = ({className, children, ...props}) => {
  return <h3 className={clsx("text-2xl text-gray-900 dark:text-gray-100 mb-8 mt-14", className)} {...props}>{children}</h3>
}

export const H4: FC<HeadingProps> = ({className, children, ...props}) => {
  return <h4 className={clsx("text-xl text-gray-900 dark:text-gray-100 mb-8 mt-14", className)} {...props}>{children}</h4>
}

export const H5: FC<HeadingProps> = ({className, children, ...props}) => {
  return <h5 className={clsx("text-lg text-gray-900 dark:text-gray-100 mb-8 mt-14", className)} {...props}>{children}</h5>
}

export const H6: FC<HeadingProps> = ({className, children, ...props}) => {
  return <h6 className={clsx("text-base text-gray-900 dark:text-gray-100 mb-8 mt-14", className)} {...props}>{children}</h6>
}

export const P: FC<ParagraphProps> = ({className, children, ...props}) => {
  return <p className={clsx("text-base text-gray-900 dark:text-gray-100 my-5", className)} {...props}>{children}</p>
}
