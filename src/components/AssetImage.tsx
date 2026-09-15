import type { ImgHTMLAttributes } from "react";
import { asset } from "@/lib/site";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  alt: string;
  fill?: boolean;
};

export function AssetImage({ src, alt, fill, className, ...rest }: Props) {
  const url = asset(src);
  if (fill) {
    return (
      <img
        src={url}
        alt={alt}
        className={`absolute inset-0 h-full w-full ${className ?? ""}`}
        {...rest}
      />
    );
  }
  return <img src={url} alt={alt} className={className} {...rest} />;
}
