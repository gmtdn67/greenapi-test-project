import type { FC } from "react";
import type { Message } from "@/entities/message/model/types";
import styles from "./MessageList.module.scss";

interface MessageListProps {
  messages: Message[];
}

export const MessageList: FC<MessageListProps> = ({
  messages,
}) => {
  if (!messages.length) {
    return (
      <div className={styles.empty}>
        Сообщений пока нет
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {messages.map((message) => (
        <div
          key={message.id}
          className={`${styles.message} ${
            message.direction === "outgoing"
              ? styles.outgoing
              : styles.incoming
          }`}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
};