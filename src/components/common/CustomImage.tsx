import Image from 'next/image'
import { StaticImageData } from 'next/image'
import React from 'react'

interface ImageProps {
  src: StaticImageData
  alt?: string
  className?: string
  width?: number
  height?: number
  objectFit: string
}

export const CustomImage = ({ src, alt, className, width, height,  objectFit }: ImageProps) => {
  return (
    <div className={className}>
      <Image src={src} alt={alt || 'Image'} layout="intrinsic" width={width} height={height} objectFit={objectFit} />
    </div>
  )
}
