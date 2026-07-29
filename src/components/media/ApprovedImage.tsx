"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import "./approved-image.css";

export interface ApprovedImageProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
  onError?: ImageProps["onError"];
}

function getSourceKey(src: ImageProps["src"]) {
  if (typeof src === "string") {
    return src;
  }

  return "src" in src ? src.src : src.default.src;
}

export function ApprovedImage({
  alt,
  className,
  fallbackLabel = "Image unavailable",
  onError,
  src,
  ...imageProps
}: ApprovedImageProps) {
  const sourceKey = getSourceKey(src);
  const [failedSource, setFailedSource] = useState<string | null>(null);

  if (failedSource === sourceKey) {
    return (
      <span
        className={["approved-image-fallback", className].filter(Boolean).join(" ")}
        role={alt ? "img" : undefined}
        aria-label={alt || undefined}
      >
        <span aria-hidden="true">{fallbackLabel}</span>
      </span>
    );
  }

  return (
    <Image
      {...imageProps}
      className={className}
      src={src}
      alt={alt}
      onError={(event) => {
        setFailedSource(sourceKey);
        onError?.(event);
      }}
    />
  );
}
