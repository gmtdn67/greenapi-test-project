import type { GreenApiConfig } from "../types/green-api";
import axios, { type AxiosInstance } from "axios"

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

export const createGreenApiClient = (config: GreenApiConfig) : AxiosInstance => {
    
    return axios.create({
        baseURL: config.apiUrl,
        headers: {
            "Content-Type": "application/json"
        }
    })
}