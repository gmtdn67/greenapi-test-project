import axios  from "axios";
import type { AxiosInstance } from "axios";

import type { GreenApiConfig } from "@/shared/types/green-api";
import type { GetStateInstanceResponse } from "./types";

export class GreenApiClient {

    private readonly client: AxiosInstance;

    private readonly idInstance: string;

    private readonly apiTokenInstance: string;

    constructor(config: GreenApiConfig) {
        this.idInstance = config.idInstance;
        this.apiTokenInstance = config.apiTokenInstance;

        this.client = axios.create({
            baseURL: config.apiUrl,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    private getUrl(method: string): string {
        return `/waInstance${this.idInstance}/${method}/${this.apiTokenInstance}`
    }
    
    async getStateInstance(): Promise<GetStateInstanceResponse> {
        const response = await this.client.get<GetStateInstanceResponse>(
            this.getUrl("getStateInstance")
        );

    return response.data;
}
}
