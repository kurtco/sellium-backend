import * as dotenv from "dotenv";

dotenv.config();

import * as documentai from "@google-cloud/documentai";

const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
  ? JSON.parse(
      Buffer.from(
        process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON,
        "base64"
      ).toString("utf-8")
    )
  : undefined;

export const client = new documentai.DocumentProcessorServiceClient({
  credentials,
});

export const projectId = process.env.PROJECT_ID;
export const location = process.env.LOCATION;
export const processorId = process.env.PROCESSOR_ID;

export const getProcessorName = () =>
  client.processorPath(projectId, location, processorId);

export const ProcessingBase64 = (imageBase64: string) => {
  return imageBase64.replace(/^data:image\/(png|jpeg);base64,/, "");
};

export const defaultErrorMessage: string = "Internal Server Error";
