import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "../lib/image";

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const imageUrl = urlFor(value)?.width(1400).fit("max").url();

      if (!imageUrl) {
        return null;
      }

      return (
        <img
          src={imageUrl}
          alt={value.alt || ""}
          className="my-6 rounded-xl"
        />
      );
    },
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
  },
  marks: {
    link: ({ value, children }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};
