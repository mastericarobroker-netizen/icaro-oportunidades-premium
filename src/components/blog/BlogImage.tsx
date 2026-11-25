import type { CSSProperties } from "react";

type BlogImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  loading?: "eager" | "lazy";
  className?: string;
  style?: CSSProperties;
};

export function BlogImage({
  src,
  alt,
  width,
  height,
  loading = "lazy",
  className,
  style,
}: BlogImageProps) {
  const webpSrc = src.startsWith("/blog/")
    ? src.replace(/\.(?:jpe?g|png)$/i, ".webp")
    : undefined;

  return (
    <picture>
      {webpSrc ? <source srcSet={webpSrc} type="image/webp" /> : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  );
}
