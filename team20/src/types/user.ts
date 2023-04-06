export enum UserType {
  driver = 0,
  sponsor = 1,
  admin = 2,
}

export enum UserStatus {
  inactive = 0,
  active = 1,
}

export type UserInfo = {
  Email: string;
  User_Type: UserType;
  F_Name: string;
  L_Name: string;
  Points: number;
  Cart: JSON;
}

export type User = {
  User_ID?: string;
  Email: string;
  User_Type: UserType;
  User_Status: UserStatus;
  F_Name: string;
  L_Name: string;
  Points: number;
  Cart: JSON;
};
