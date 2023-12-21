export interface IResponse {
  id: number;
  login?: string;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  webSite: string;
}

export enum LOCALSTORAGE {
  KEY = 'zentotemKeyApp',
}
