export interface Chat {
    id: string;
    phone: string;
    title: string;
    lastMessage?: string;
    lastMessageTimestamp?: number;
}