export enum OcrServiceResponses {
  BadImage = "The uploaded image does not meet the required format.",
  Conflict = "User already exists",
}

export enum OcrServiceStatus {
  BadImage = "Bad Image",
  Conflict = "User Conflict",
  Default = "Failed to process image",
}
