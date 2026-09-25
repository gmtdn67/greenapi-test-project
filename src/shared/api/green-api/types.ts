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