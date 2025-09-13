export interface ILoginData {
  identifier: string;
  password: string;
}

export type LoginAction =
  | { type: "SET_IDENTIFIER"; payload: string }
  | { type: "SET_PASSWORD"; payload: string }
  | { type: "RESET_FORM" };
