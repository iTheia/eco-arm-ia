export type keyUsage = 'refresh' | 'access';

export interface IPayload {
  body?: any;
  params?: any;
  query: any;
}

export interface IGoogleUserInfo {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
  locale: string;
  hd: string;
}
export enum Role {
  super = 'super',
  backend = 'backend',
  lead = 'lead',
  tech = 'tech',
  infra = 'infra',
  marketing = 'marketing',
  ch = 'customer happines',
  people = 'people',
  mobile = 'mobile',
  web = 'web',
  qa = 'qa',
  security = 'security',
  operations = 'operations',
  legal = 'legal',
  administration = 'administration',
  product = 'product',
  generic = 'generic',
  cb = 'casa de bolsa',
}
export type Roles =
  | 'super'
  | 'backend'
  | 'lead'
  | 'tech'
  | 'infra'
  | 'marketing'
  | 'customer happines'
  | 'people'
  | 'mobile'
  | 'web'
  | 'qa'
  | 'security'
  | 'operations'
  | 'legal'
  | 'administration'
  | 'product'
  | 'generic'
  | 'casa de bolsa';
