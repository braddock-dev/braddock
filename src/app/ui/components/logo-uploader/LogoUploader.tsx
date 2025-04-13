"use client";
import styles from "./LogoUploader.module.scss";
import PlusIcon from "@/app/ui/vectors/plus-icon.svg";
// import EditIcon from "@/app/ui/vectors/edit-icon-filled.svg";
import { useUploadFile } from "@/app/utils/CustomHooks";
import { compressProfilePhoto } from "@/app/utils/compressFiles";
import { Fragment } from "react";
import Spinner, { SpinnerColor } from "../spinner/Spinner";
import Image from "next/image";

interface LogoUploaderProps {
  onUploadComplete: (fileUrl: string) => void;
  defaultValue?: string;
}
export default function LogoUploader(props: LogoUploaderProps) {
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
            <Image src={fileUrl} alt="Logo" width={100} height={100} className={styles.image} />
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
