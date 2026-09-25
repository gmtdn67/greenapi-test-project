import type { GreenApiConfig } from "../types/green-api";
import axios, { type AxiosInstance } from "axios"

export const createGreenApiClient = (config: GreenApiConfig) : AxiosInstance => {
    
    return axios.create({
        baseURL: config.apiUrl,
        headers: {
            "Content-Type": "application/json"
        }
    })
}