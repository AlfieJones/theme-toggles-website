import clsx from "clsx";
import { DetailedHTMLProps, FC } from "react";

type LIProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;
type ULProps = DetailedHTMLProps<
  React.HTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

export const LI: FC<LIProps> = ({ className, children, ...props }) => (
  <li className={className} {...props}>
    {children}
  </li>
);

export const OL: FC<ULProps> = ({ className, children, ...props }) => (
  <ol className={clsx("list-decimal ml-5", className)} {...props}>
    {children}
  </ol>
);
