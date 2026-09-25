export type GreenApiInstanceState =
  | "authorized"
  | "notAuthorized"
  | "blocked"
  | "sleepMode"
  | "starting"
  | "yellowCard"
  | "suspended";

export interface GetStateInstanceResponse {
  stateInstance: GreenApiInstanceState;
}

export interface SendMessageRequest {
  chatId: string;
  message: string;
}

export interface SendMessageResponse {
  idMessage: string;

}

export interface ReceiveNotificationResponse {
  receiptId: number;
  body: unknown;
}