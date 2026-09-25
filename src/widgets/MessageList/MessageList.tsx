import {
    useEffect,
    useRef,
} from "react";
import type { FC } from "react";
import type { Message } from "@/entities/message/model/types";

import styles from "./MessageList.module.scss";

interface MessageListProps {
    messages: Message[];
}

export const MessageList: FC<MessageListProps> = ({
    messages,
}) => {
    const listRef =
        useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = listRef.current;

        if (!element) {
            return;
        }

        element.scrollTo({
            top: element.scrollHeight,
            behavior: "smooth",
        });
    }, [messages]);

    if (!messages.length) {
        return (
            <div className={styles.empty}>
                Сообщений пока нет
            </div>
        );
    }

    return (
        <div
            ref={listRef}
            className={styles.list}
        >
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`${styles.message} ${
                        message.direction ===
                        "outcoming"
                            ? styles.outgoing
                            : styles.incoming
                    }`}
                >
                    <span>
                        {message.text}
                    </span>

                    <time>
                        {new Date(
                            message.timestamp,
                        ).toLocaleTimeString(
                            "ru-RU",
                            {
                                hour: "2-digit",
                                minute: "2-digit",
                            },
                        )}
                    </time>
                </div>
            ))}
        </div>
    );
};