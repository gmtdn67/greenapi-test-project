import type { FC } from "react";
import type { Chat as ChatEntity } from "@/entities/chat/model/types";
import { CreateChat } from "@/features/CreateChat/CreateChat";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  chats: ChatEntity[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: (chat: ChatEntity) => void;
}

export const Sidebar: FC<SidebarProps> = ({
  chats,
  activeChatId,
  onSelectChat,
  onCreateChat,
}) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h1>Чаты</h1>

        <CreateChat onCreate={onCreateChat} />
      </div>

      <div className={styles.list}>
        {chats.length === 0 ? (
          <div className={styles.empty}>
            Нет чатов
          </div>
        ) : (
          chats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              className={`${styles.chat} ${
                activeChatId === chat.id
                  ? styles.active
                  : ""
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className={styles.avatar}>
                {chat.title.charAt(0)}
              </div>

              <div className={styles.info}>
                <div className={styles.title}>
                  {chat.title}
                </div>

                <div className={styles.lastMessage}>
                  {chat.lastMessage ?? "Нет сообщений"}
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};