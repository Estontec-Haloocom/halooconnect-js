import "react";
import type { StaticImageData } from "next/image";

declare module "react" {
  interface ImgHTMLAttributes<T> {
    src?: string | StaticImageData | undefined;
  }

  interface VideoHTMLAttributes<T> {
    poster?: string | StaticImageData | undefined;
  }
}
