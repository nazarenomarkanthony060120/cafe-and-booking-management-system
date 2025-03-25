import Image from 'next/image'
import { StaticImageData } from 'next/image'
import React from 'react'

interface ImageProps {
  src: StaticImageData
  alt?: string
  width: number
  height: number
  className?: string
}

export const CustomImage = ({ src, alt, width, height, className }: ImageProps) => {
  return (
    <div className={className}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt || 'Image'}
      />
    </div>
  )
}
