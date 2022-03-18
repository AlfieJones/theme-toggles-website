import React, { FC } from "react";
import NextImage, { ImageProps } from "next/image";

const customLoader = ({ src }: any) => src;

const Image: FC<ImageProps> = (props: ImageProps) => (
  <NextImage {...props} loader={customLoader} unoptimized />
);

export default Image;
