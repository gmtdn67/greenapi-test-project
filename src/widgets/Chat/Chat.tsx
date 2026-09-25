import type { FC } from "react";
import type { Chat as ChatEntity } from "@/entities/chat/model/types";
import type { Message } from "@/entities/message/model/types";
import { ChatHeader } from "@/widgets/ChatHeader/ChatHeader";
import { MessageList } from "@/widgets/MessageList/MessageList";
import { SendMessage } from "@/features/SendMessage/SendMessage";
import styles from "./Chat.module.scss";
import type { ConnectionStatus } from "@/entities/connection/model/types";

interface ChatProps {
    chat?: ChatEntity;
    messages: Message[];
    onSendMessage: (
        text: string,
    ) => Promise<void>;

    connectionStatus: ConnectionStatus;
}

export const Chat: FC<ChatProps> = ({
    chat,
    messages,
    onSendMessage,
    connectionStatus
}) => {
    if (!chat) {
        return (
            <section className={styles.empty}>
                <div>
                    <h2>WhatsApp Chat</h2>

                    <p>
                        Выберите существующий чат или
                        создайте новый
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.chat}>
            <ChatHeader chat={chat} connectionStatus={connectionStatus}/>

            <MessageList messages={messages} />

            <SendMessage
                onSend={onSendMessage}
            />
        </section>
    );
};