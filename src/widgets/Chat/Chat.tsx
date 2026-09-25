import type { FC } from "react";
import type { Chat as ChatEntity } from "@/entities/chat/model/types";
import type { Message } from "@/entities/message/model/types";
import { ChatHeader } from "@/widgets/ChatHeader/ChatHeader";
import { MessageList } from "@/widgets/MessageList/MessageList";

import styles from "./Chat.module.scss";

interface ChatProps {
  chat?: ChatEntity;
  messages: Message[];
}

export const Chat: FC<ChatProps> = ({
  chat,
  messages,
}) => {
  if (!chat) {
    return (
      <section className={styles.empty}>
        <div>
          <h2>WhatsApp Chat</h2>
          <p>
            Выберите существующий чат или создайте новый
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.chat}>
      <ChatHeader chat={chat} />

      <MessageList messages={messages} />

      <div className={styles.input}>
        <input
          placeholder="Введите сообщение..."
          disabled
        />

        <button
          type="button"
          disabled
        >
          ➤
        </button>
      </div>
    </section>
  );
};