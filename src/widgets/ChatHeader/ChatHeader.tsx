import type { FC } from "react";
import type { Chat } from "@/entities/chat/model/types";
import type { ConnectionStatus } from "@/entities/connection/model/types";
import styles from "./ChatHeader.module.scss";

interface ChatHeaderProps {
    chat: Chat;
    connectionStatus: ConnectionStatus;
}

const statusText: Record<
    ConnectionStatus,
    string
> = {
    connected: "Подключено",
    reconnecting: "Переподключение...",
    disconnected: "Нет подключения",
};

export const ChatHeader: FC<ChatHeaderProps> = ({
    chat,
    connectionStatus,
}) => {
    return (
        <header className={styles.header}>
            <div className={styles.avatar}>
                {chat.title.charAt(0)}
            </div>

            <div>
                <div className={styles.title}>
                    {chat.title}
                </div>

                <div className={styles.status}>
                    {statusText[connectionStatus]}
                </div>
            </div>
        </header>
    );
};