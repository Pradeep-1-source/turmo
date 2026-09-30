import React from 'react';

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function Image({
  src,
  alt = '',
  fill,
  priority,
  width,
  height,
  className = '',
  style = {},
  ...props
}: ImageProps) {
  const combinedStyle: React.CSSProperties = fill
    ? {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        ...style,
      }
    : { ...style };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      style={combinedStyle}
      {...props}
    />
  );
}
export { Image };
