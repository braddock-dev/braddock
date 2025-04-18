"use client";

import { useEffect, useState } from "react";
import styles from "./PromoModal.module.scss";
import Image from "next/image";
import { X } from "lucide-react";

interface PromoModalProps {
  imageUrl: string;
  altText?: string;
}

export default function PromoModal({ imageUrl, altText = "Promotion" }: PromoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);

  useEffect(() => {
    // Open modal on page load with a small delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleImageError = () => {
    // Use placeholder image if the specified image fails to load
    setImgSrc("https://placehold.co/500x625/333/FFF?text=Special+Promotion");
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={() => setIsOpen(false)}>
      <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
        <button 
          className={styles.closeButton} 
          onClick={() => setIsOpen(false)}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className={styles.imageContainer}>
          <Image
            src={imgSrc}
            alt={altText}
            width={1080}
            height={1350}
            priority
            onError={handleImageError}
            className={styles.image}
          />
        </div>
      </div>
    </div>
  );
} 