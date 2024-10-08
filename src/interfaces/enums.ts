export enum OcrServiceResponses {
  BadImage = "The uploaded image does not meet the required format.",
  Conflict = "User already exists",
  UserRepresentiveType = "Choose your representative type to continue",
}

export enum OcrServiceStatus {
  BadImage = "Bad Image",
  Conflict = "User Conflict",
  UserRepresentiveType = "Represetative",
  Default = "Failed to process image",
}

export enum RepresentativeType {
  StudentButton = "Student",
  LicensedButton = "Licensed",
  Representative = "Representative",
  LicensedPosition = "Representative Licensed",
  StudentPosition = "Representative Student",
}

export enum UserServiceRespones {
  NotUpdated = "Failed to update user position",
  NotFound = "User not found.",
}
