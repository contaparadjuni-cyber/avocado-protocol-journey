import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SmartImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Skip lazy-loading for above-the-fold images. */
  priority?: boolean;
  wrapperClassName?: string;
};

/**
 * Image with a shimmer skeleton placeholder, reserved aspect ratio (no layout
 * shift) and a fade-in once decoded.
 */
export function SmartImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  wrapperClassName,
  ...rest
}: SmartImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <span
      className={cn("relative block overflow-hidden", wrapperClassName)}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      {!loaded && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-pulse bg-muted"
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        {...(priority ? { fetchPriority: "high" as const } : {})}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={cn(
          "block h-full w-full object-cover transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        {...rest}
      />
    </span>
  );
}
