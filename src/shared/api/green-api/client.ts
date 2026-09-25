import axios  from "axios";
import type { AxiosInstance } from "axios";

import type { GreenApiConfig } from "@/shared/types/green-api";
import type { GetSettingsResponse, GetStateInstanceResponse, ReceiveNotificationResponse, SendMessageRequest, SendMessageResponse } from "./types";

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

    async sendMessage(
        data: SendMessageRequest,
    ): Promise<SendMessageResponse> {
        const response = await this.client.post<SendMessageResponse>(
            this.getUrl("sendMessage"),
            data,
        );

        return response.data;
    }

    async receiveNotification(
        receiveTimeout = 10,
    ): Promise<ReceiveNotificationResponse | null> {
        const response =
            await this.client.get<ReceiveNotificationResponse | null>(
                this.getUrl("receiveNotification"),
                {
                    params: {
                        receiveTimeout,
                    },
                },
            );

        return response.data;
    }

    async deleteNotification(receiptId: number): Promise<void> {
        await this.client.delete(
            `${this.getUrl("deleteNotification")}/${receiptId}`,
        );
    }

    async getSettings(): Promise<GetSettingsResponse> {
        const response = await this.client.get<GetSettingsResponse>(
            this.getUrl("getSettings"),
        );

    return response.data;
}
}
