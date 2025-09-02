"use client";
import styles from "./CoverImageUploader.module.scss";
import PlusIcon from "@/app/ui/vectors/plus-icon.svg";
import EditIcon from "@/app/ui/vectors/edit-icon-filled.svg";
import { useUploadFile } from "@/app/utils/CustomHooks";
import { compressProfilePhoto } from "@/app/utils/compressFiles";
import { Fragment } from "react";
import Spinner, { SpinnerColor } from "../spinner/Spinner";
import Image from "next/image";

interface CoverImageUploaderProps {
  onUploadComplete: (fileUrl: string) => void;
  defaultValue?: string;
}
export default function CoverImageUploader(props: CoverImageUploaderProps) {
  const { isUploading, getInputProps, getRootProps, fileUrl, inputRef, handleClickContainer } = useUploadFile(
    props.onUploadComplete,
    props.defaultValue,
    compressProfilePhoto
  );

  return (
    <div className={`${styles.container}`} {...getRootProps()} onClick={handleClickContainer} data-has-file={!!fileUrl}>
      {isUploading ? (
        <Spinner className={styles.spinner} color={SpinnerColor.WHITE} />
      ) : fileUrl ? (
        <Fragment>
          <div className={styles.imageContainer}>
            <Image src={fileUrl} alt="cover image" width={400} height={150} className={styles.image} />
            <div className={styles.editIconContainer}>
              <EditIcon className={styles.editIcon} />
            </div>
          </div>
        </Fragment>
      ) : (
        <div className={styles.uploadContainer}>
          <PlusIcon className={styles.plusIcon} />
        </div>
      )}
      <input {...getInputProps()} disabled={isUploading} ref={inputRef} />
    </div>
  );
}
