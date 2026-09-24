import type { GreenApiConfig } from "../types/green-api";
import axios from "axios"

export const createGreenApiClient = (config: GreenApiConfig) => {
    const client = axios.create({
        baseURL: config.apiUrl
    })

    return client
}