import type {
    IncomingTextMessageBody,
} from "@/shared/api/green-api/types";

export const isIncomingTextMessage = (
    body: unknown,
): body is IncomingTextMessageBody => {
    if (
        !body ||
        typeof body !== "object"
    ) {
        return false;
    }

    const data = body as Partial<IncomingTextMessageBody>;

    return (
        data.typeWebhook ===
            "incomingMessageReceived" &&
        data.messageData?.typeMessage ===
            "textMessage" &&
        typeof data.messageData
            ?.textMessageData
            ?.textMessage === "string"
    );
};