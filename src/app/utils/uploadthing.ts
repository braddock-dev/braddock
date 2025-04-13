import { generateReactHelpers, generateUploadButton, generateUploadDropzone } from "@uploadthing/react";
import type { operatorImageFileRoute } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<operatorImageFileRoute>();
export const UploadDropzone = generateUploadDropzone<operatorImageFileRoute>();
export const { useUploadThing, uploadFiles } = generateReactHelpers<operatorImageFileRoute>();
