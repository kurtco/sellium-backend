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

export const dummyUsers = [
  {
    recruiterName: "Sandra Estrada",
    leaderName: "Marcel & Isa Macias",
    leaderCode: "GFI09",
    phone: "(843) 518-1416",
    email: "monicarojasv2010@hotmail.com",
    homeAddress: "7808 Dixie Beach Cir Tamarac, FL 33321",
    businessAddress: "7808 Dixie Beach Cir Tamarac, FL 33321",
    spouseName: "Richard Correa",
    userName: "Monica Rojas Vega",
    position: "Representative Student",
    recruiterCode: "A8552",
    userCode: "A8592",
    birthDate: "1972-02-27T05:00:00.000Z",
    startDate: "2024-04-04T05:00:00.000Z",
  },
  {
    recruiterName: "Monica Rojas Vega",
    leaderName: "Marcel & Isa Macias",
    leaderCode: "GFI09",
    phone: "(555) 123-4567",
    email: "frank.velazquez@example.com",
    homeAddress: "58 Waltham st Watertown, MA 02472",
    businessAddress: "58 Waltham st Watertown, MA 02472",
    spouseName: "Andreina Caldera",
    userName: "Francisco Velázquez Rojas",
    position: "Associate",
    recruiterCode: "A8592",
    userCode: "A8600",
    birthDate: "1982-02-14T05:00:00.000Z",
    startDate: "2024-05-10T05:00:00.000Z",
  },
  {
    recruiterName: "Francisco Velázquez Rojas",
    leaderName: "Marcel & Isa Macias",
    leaderCode: "GFI09",
    phone: "(444) 678-1234",
    email: "tom.smith@example.com",
    homeAddress: "123 Oak Street, Springfield, IL",
    businessAddress: "123 Oak Street, Springfield, IL",
    spouseName: "Sarah Johnson",
    userName: "Tom Smith",
    position: "Senior Developer",
    recruiterCode: "A8600",
    userCode: "A8601",
    birthDate: "1990-08-19T05:00:00.000Z",
    startDate: "2024-06-20T05:00:00.000Z",
  },
  {
    recruiterName: "Tom Smith",
    leaderName: "Marcel & Isa Macias",
    leaderCode: "GFI09",
    phone: "(333) 890-4567",
    email: "lucy.williams@example.com",
    homeAddress: "789 Pine Street, Boston, MA",
    businessAddress: "789 Pine Street, Boston, MA",
    spouseName: "Michael Green",
    userName: "Lucy Williams",
    position: "Project Manager",
    recruiterCode: "A8601",
    userCode: "A8602",
    birthDate: "1985-11-22T05:00:00.000Z",
    startDate: "2024-07-15T05:00:00.000Z",
  },
  {
    recruiterName: "Lucy Williams",
    leaderName: "Marcel & Isa Macias",
    leaderCode: "GFI09",
    phone: "(222) 567-7890",
    email: "emma.davis@example.com",
    homeAddress: "456 Birch Street, San Francisco, CA",
    businessAddress: "456 Birch Street, San Francisco, CA",
    spouseName: "James Lee",
    userName: "Emma Davis",
    position: "Intern",
    recruiterCode: "A8602",
    userCode: "A8603",
    birthDate: "2000-04-12T05:00:00.000Z",
    startDate: "2024-08-01T05:00:00.000Z",
  },
];
