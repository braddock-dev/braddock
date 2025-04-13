import imageCompression, { Options } from "browser-image-compression";
import { toast } from "sonner";
import Logger from "./Logger";

const LOG_TAG = "FileProcessingUtils";

export const compressProfilePhoto = async (file: File) => {
  const imageFile = file;
  Logger.log(LOG_TAG, "originalFile instanceof Blob", imageFile instanceof Blob);
  Logger.log(LOG_TAG, `originalFile size ${imageFile.size / 1024 / 1024} MB`);

  try {
    const options: Options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1000,
      useWebWorker: true,
      fileType: "image/jpeg",
    };

    const compressedFile = await imageCompression(imageFile, options);
    Logger.log(LOG_TAG, "compressedFile instanceof Blob", compressedFile instanceof Blob);
    Logger.log(LOG_TAG, `compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

    return compressedFile;
  } catch (error) {
    Logger.error(LOG_TAG, "Error compressing profile photo", [error]);
    toast.error("Error compressing profile photo");
    return undefined;
  }
};

export const compressPageBackgroundImage = async (file: File) => {
  const imageFile = file;
  Logger.log(LOG_TAG, "originalFile instanceof Blob", imageFile instanceof Blob);
  Logger.log(LOG_TAG, `originalFile size ${imageFile.size / 1024 / 1024} MB`);

  try {
    const options: Options = {
      maxSizeMB: 0.8,
      maxWidthOrHeight: 1500,
      useWebWorker: true,
      fileType: "image/jpeg",
    };

    const compressedFile = await imageCompression(imageFile, options);
    Logger.log(LOG_TAG, "compressedFile instanceof Blob", compressedFile instanceof Blob);
    Logger.log(LOG_TAG, `compressedFile size ${compressedFile.size / 1024 / 1024} MB`);

    return compressedFile;
  } catch (error) {
    Logger.error(LOG_TAG, "Error compressing page background image", [error]);
    toast.error("Error compressing page background image");
    return undefined;
  }
};
