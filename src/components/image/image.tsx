import React, { FC } from "react"
import NextImage, { ImageProps } from "next/image"

const customLoader = ({ src }: any) => {
  return src
}

const Image: FC<ImageProps> = (props: ImageProps) => {
  return <NextImage {...props} loader={customLoader} unoptimized />
}

export default Image
