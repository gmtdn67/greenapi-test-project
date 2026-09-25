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

export interface IncomingTextMessageBody {
    typeWebhook: "incomingMessageReceived";

    timestamp: number;

    idMessage: string;

    senderData: {
        chatId: string;
        sender: string;
        chatName: string;
        senderName: string;
        senderContactName?: string;
    };

    messageData: {
        typeMessage: "textMessage";

        textMessageData: {
            textMessage: string;
        };
    };
}

export interface ReceiveNotificationResponse {
    receiptId: number;
    body: unknown;
}