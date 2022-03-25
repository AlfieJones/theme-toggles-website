import React, { DetailedHTMLProps, FC } from "react";
import clsx from "clsx";

type HeadingProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type ParagraphProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export const H1: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h1 className={clsx("text-4xl mb-8 mt-14", className)} {...props}>
    {children}
  </h1>
);

export const H2: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h2 className={clsx("text-3xl mb-8 mt-14", className)} {...props}>
    {children}
  </h2>
);

export const H3: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h3 className={clsx("text-2xl mb-6 mt-10", className)} {...props}>
    {children}
  </h3>
);

export const H4: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h4 className={clsx("text-xl mb-5 mt-8", className)} {...props}>
    {children}
  </h4>
);

export const H5: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h5 className={clsx("text-lg mb-4 mt-6", className)} {...props}>
    {children}
  </h5>
);

export const H6: FC<HeadingProps> = ({ className, children, ...props }) => (
  <h6 className={clsx("text-base mb-4 mt-6", className)} {...props}>
    {children}
  </h6>
);

export const P: FC<ParagraphProps> = ({ className, children, ...props }) => (
  <p className={clsx("text-base my-5", className)} {...props}>
    {children}
  </p>
);
