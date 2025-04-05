import Image from 'next/image'
import { StaticImageData } from 'next/image'
import React from 'react'

interface ImageProps {
  src: StaticImageData
  alt?: string
  className?: string
  objectFit: string
}

export const CustomImage = ({ src, alt, className, objectFit }: ImageProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt || 'Image'}
        layout="fill"
        objectFit={objectFit}
      />
    </div>
  )
}
