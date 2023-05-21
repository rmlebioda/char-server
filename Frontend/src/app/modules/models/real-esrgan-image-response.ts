export interface RealEsrganImageResponse {
  status: RealEsrganImageResponseStatus,
  errorMessage?: string,
  imageIdentifier?: string,
  expiryDate?: Date
}

export enum RealEsrganImageResponseStatus {
  Unknown = 0,
  Started,
  Finished,
  Failed,
  Exception,
  Expired
}
