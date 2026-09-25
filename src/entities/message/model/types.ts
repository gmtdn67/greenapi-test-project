export type MessageDirection = "incoming" | "outcoming"

export interface Message {
    id: string;
    chatId: string;
    text: string;
    timestamp: number;
    direction: MessageDirection;
}