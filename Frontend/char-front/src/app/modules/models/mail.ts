export interface Mail {
  Identifier: string,
  Name: string,
  Status: string,
  Type: MailType,
  Data: any,
  UrlReference: string
}

export enum MailType {
  ImageUpscaling
}
