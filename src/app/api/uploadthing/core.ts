import Logger from "@/app/utils/Logger";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const LOG_TAG = "UploadThingRoutes";

export const operatorImageFileRoute = {
  imageUploader: f({
    image: {
      maxFileSize: "2MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async ({ file }) => {
    Logger.debug(LOG_TAG, "Upload completed successfully", [file]);

    return { fileUrl: file.url };
  }),
} satisfies FileRouter;

export type operatorImageFileRoute = typeof operatorImageFileRoute;
