import { useState } from "react";
import type { FC } from "react";
import type { GreenApiConfig } from "@/shared/types/green-api";
import type { Chat as ChatType} from "@/entities/chat/model/types";
import type { Message } from "@/entities/message/model/types";
import { Sidebar } from "@/widgets/Sidebar/Sidebar";


import styles from "./ChatPage.module.scss";
import { Chat } from "@/widgets/Chat/Chat";

interface ChatPageProps {
  config: GreenApiConfig;
}

export const ChatPage: FC<ChatPageProps> = ({ config }) => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [activeChatId, setActiveChatId] =
    useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const activeChat = chats.find(
    (chat) => chat.id === activeChatId,
  );

  return (
    <main className={styles.page}>
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onCreateChat={(chat) => {
          setChats((current) => [...current, chat]);
          setActiveChatId(chat.id);
        }}
      />

      <Chat
        chat={activeChat}
        messages={messages}
      />
    </main>
  );
};