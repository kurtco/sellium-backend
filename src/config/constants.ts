import * as documentai from "@google-cloud/documentai";
export const client = new documentai.DocumentProcessorServiceClient({
  keyFilename: "src/config/sellium-435318-9d9be02cc538.json",
});

export const projectId = process.env.PROJECT_ID;
export const location = process.env.LOCATION;
export const processorId = process.env.PROCESSOR_ID;

export const getProcessorName = () =>
  client.processorPath(projectId, location, processorId);
