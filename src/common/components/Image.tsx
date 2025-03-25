import React from 'react'

interface ImageProps {
  src: string
  alt?: string
  width: number
  height: number
  className?: string
}
export const Image = ({ src, alt, width, height, className }: ImageProps) => {
  return (
    <div className={className}>
      <Image
        src="../../assets/images/loginBackground.png"
        width={500}
        height={500}
        alt="Picture of the author"
      />
    </div>
  )
}
