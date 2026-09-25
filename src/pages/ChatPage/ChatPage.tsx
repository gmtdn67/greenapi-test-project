import { useState } from "react";
import { GreenApiClient } from "@/shared/api/green-api/client";
import type { GreenApiConfig } from "@/shared/types/green-api";
import { greenApiStorage } from "@/shared/lib/green-api-storage";
import type { Chat as ChatEntity } from "@/entities/chat/model/types";
import type { Message } from "@/entities/message/model/types";
import { Sidebar } from "@/widgets/Sidebar/Sidebar";
import { Chat } from "@/widgets/Chat/Chat";

import styles from "./ChatPage.module.scss";

interface ChatPageProps {
    config: GreenApiConfig;
}

export const ChatPage = ({ config }: ChatPageProps) => {
    const [chats, setChats] = useState<ChatEntity[]>([]);
    const [activeChatId, setActiveChatId] =
        useState<string | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);

    const activeChat = chats.find(
        (chat) => chat.id === activeChatId,
    );

    const handleCreateChat = (chat: ChatEntity) => {
        setChats((current) => {
            const alreadyExists = current.some(
                (item) => item.id === chat.id,
            );

            if (alreadyExists) {
                return current;
            }

            return [...current, chat];
        });

        setActiveChatId(chat.id);
    };

    const handleSendMessage = async (text: string) => {
        if (!activeChat) {
            return;
        }

        const api = new GreenApiClient(config);

        const response = await api.sendMessage({
            chatId: activeChat.id,
            message: text,
        });

        const newMessage: Message = {
            id: response.idMessage,
            chatId: activeChat.id,
            text,
            timestamp: Date.now(),
            direction: "outcoming",
        };

        setMessages((current) => [
            ...current,
            newMessage,
        ]);

        setChats((current) =>
            current.map((chat) =>
                chat.id === activeChat.id
                    ? {
                          ...chat,
                          lastMessage: text,
                          lastMessageTimestamp:
                              Date.now(),
                      }
                    : chat,
            ),
        );
    };

    const handleLogout = () => {
        greenApiStorage.clear();

        window.location.reload();
    };

    const activeChatMessages = activeChat
        ? messages.filter(
              (message) =>
                  message.chatId === activeChat.id,
          )
        : [];

    return (
        <main className={styles.page}>
            <Sidebar
                chats={chats}
                activeChatId={activeChatId}
                onSelectChat={setActiveChatId}
                onCreateChat={handleCreateChat}
                onLogout={handleLogout}
            />

            <Chat
                chat={activeChat}
                messages={activeChatMessages}
                onSendMessage={handleSendMessage}
            />
        </main>
    );
};