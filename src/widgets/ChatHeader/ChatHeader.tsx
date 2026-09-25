import type { FC } from "react";
import type { Chat } from "@/entities/chat/model/types";
import styles from "./ChatHeader.module.scss";

interface ChatHeaderProps {
    chat: Chat;
}

export const ChatHeader: FC<ChatHeaderProps> = ({
    chat,
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
                    WhatsApp
                </div>
            </div>
        </header>
    );
};