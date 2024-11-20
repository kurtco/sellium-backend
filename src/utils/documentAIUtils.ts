import { DataFromImage } from "src/interfaces/interfaces";
import {
  client,
  getProcessorName,
  ProcessingBase64,
} from "src/config/constants";
import { OcrServiceStatus } from "src/interfaces/enums";

/**
 * Processes a base64 image using Document AI and extracts relevant data.
 * @param base64image - The image in base64 format.
 * @returns An object of type DataFromImage containing the extracted information.
 */

export async function processImageWithDocumentAI(
  base64image: string
): Promise<DataFromImage> {
  const cleanBase64 = ProcessingBase64(base64image);
  const name = getProcessorName("image");
  const request = {
    name,
    rawDocument: {
      content: cleanBase64,
      mimeType: "image/png",
    },
  };
  const [result] = await client.processDocument(request);

  const entities = result.document.entities;

  const extractedData: DataFromImage = {
    recruiterName: "",
    leaderName: "",
    leaderCode: "",
    phone: "",
    email: "",
    homeAddress: "",
    businessAddress: "",
    spouseName: "",
    userName: "",
    position: "",
    recruiterCode: "",
    userCode: "",
  };

  // Iteramos sobre las entidades para obtener los valores
  entities.forEach((entity) => {
    switch (entity.type) {
      case "phone":
        extractedData.phone = entity.mentionText;
        break;
      case "businessAddress":
        extractedData.businessAddress = entity.mentionText?.replace(/\n/g, " ");
        break;
      case "recruiter":
        extractedData.recruiterName = entity.mentionText;
        break;
      case "birthDate":
        extractedData.birthDate = new Date(entity.mentionText);
        break;
      case "leader":
        extractedData.leaderName = entity.mentionText;
        break;
      case "leaderCode":
        extractedData.leaderCode = entity.mentionText;
        break;
      case "email":
        extractedData.email = entity.mentionText;
        break;
      case "homeAddress":
        extractedData.homeAddress = entity.mentionText?.replace(/\n/g, " ");
        break;
      case "spouse":
        extractedData.spouseName = entity.mentionText;
        break;
      case "userName":
        extractedData.userName = entity.mentionText;
        break;
      case "position":
        extractedData.position = entity.mentionText;
        break;
      case "recruiterCode":
        extractedData.recruiterCode = String(entity.mentionText);
        break;
      case "startDate":
        extractedData.startDate = new Date(entity.mentionText);
        break;
      case "userCode":
        extractedData.userCode = String(entity.mentionText);
        break;
      default:
        break;
    }
  });

  if (!extractedData.userCode) {
    throw new Error(String(OcrServiceStatus.BadImage));
  }

  return extractedData;
}

/**
 * Processes a base64 PDF using Document AI and extracts relevant data.
 * @param base64pdf - The PDF in base64 format.
 * @returns An object of type DataFromImage containing the extracted information.
 */
export async function processPdfWithDocumentAI(
  base64pdf: string
): Promise<any> {
  const cleanBase64 = ProcessingBase64(base64pdf);
  const name = getProcessorName("pdf");
  const request = {
    name,
    rawDocument: {
      content: cleanBase64,
      mimeType: "application/pdf",
    },
  };

  const [result] = await client.processDocument(request);
  const entities = result.document.entities;

  // Estructura para los datos extraídos
  const extractedData = {
    agentName: "",
    companyName: "",
    productName: "",
    clientName: "",
    gender: "",
    initialPremium: "",
    specifiedAmount: "",
    state: "",
    totalYearsProduct: "",
    applicationDate: "",
    clientYearsOld: "",
    primaAnual: "",
  };

  // Iterar sobre las entidades y asignar valores según el tipo
  entities.forEach((entity) => {
    switch (entity.type) {
      case "agent":
        extractedData.agentName = entity.mentionText;
        break;
      case "company_name":
        extractedData.companyName = entity.mentionText;
        break;
      case "product_title":
        extractedData.productName = entity.mentionText;
        break;
      case "client_name":
        extractedData.clientName = entity.mentionText;
        break;
      case "gender":
        extractedData.gender = entity.mentionText;
        break;
      case "initial_premium":
        extractedData.initialPremium = entity.mentionText;
        break;
      case "specified_amount":
        extractedData.specifiedAmount = entity.mentionText;
        break;
      case "state":
        extractedData.state = entity.mentionText;
        break;
      case "total_years_product":
        extractedData.totalYearsProduct = entity.mentionText;
        break;
      case "application_date":
        extractedData.applicationDate = entity.mentionText;
        break;
      case "client_years_old":
        extractedData.clientYearsOld = entity.mentionText;
        break;

      case "target_premium_prima_anual":
        extractedData.primaAnual = entity.mentionText;
      default:
        break;
    }
  });

  // Devuelve los datos extraídos
  return extractedData;
}
