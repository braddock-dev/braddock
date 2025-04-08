import Image from "next/image";
import { useState } from "react";
import AvatarUser from "@/app/ui/images/default-fallback-image.png";
import { isValidImageUrl } from "@/lib/utils";

interface SafeImageProps extends React.ComponentProps<typeof Image> {
  fallbackSrc?: string;
}

export default function SafeImage({ src, fallbackSrc = AvatarUser.src, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  const isValid = typeof src === "string" ? isValidImageUrl(src) : true;

  return (
    <Image
      {...props}
      src={isValid ? imgSrc : fallbackSrc}
      alt={props.alt ?? ""}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
} 