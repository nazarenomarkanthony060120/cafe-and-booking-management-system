import Image from 'next/image'
import { StaticImageData } from 'next/image'
import React from 'react'

interface ImageProps {
  src: StaticImageData
  alt?: string
  width?: number
  height?: number
  layout?: string
  objectFit?: string
  className?: string
}

export const CustomImage = ({ src, alt, width, height, className, layout, objectFit }: ImageProps) => {
  return (
    <div className={className}>
      <Image
        src={src}
        width={width}
        height={height}
        objectFit={objectFit}
        layout={layout}
        alt={alt || 'Image'}
      />
    </div>
  )
}
