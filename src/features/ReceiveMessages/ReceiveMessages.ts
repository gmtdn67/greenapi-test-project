import { useEffect } from "react";

import { GreenApiClient } from "@/shared/api/green-api/client";
import type { GreenApiConfig } from "@/shared/types/green-api";

import type { Message } from "@/entities/message/model/types";
import { isIncomingTextMessage } from "@/shared/lib/isIncomingTestMessage";

interface UseReceiveMessagesParams {
    config: GreenApiConfig;

    onMessage: (message: Message) => void;
}

export const useReceiveMessages = ({
    config,
    onMessage,
}: UseReceiveMessagesParams) => {
    useEffect(() => {
        const api = new GreenApiClient(config);

        let isActive = true;

        const receive = async () => {
            while (isActive) {
                try {
                    const notification =
                        await api.receiveNotification(5);

                    if (!notification) {
                        continue;
                    }

                    const { receiptId, body } =
                        notification;

                    if (
                        isIncomingTextMessage(body)
                    ) {
                        const message: Message = {
                            id: body.idMessage,

                            chatId:
                                body.senderData
                                    .chatId,

                            text:
                                body.messageData
                                    .textMessageData
                                    .textMessage,

                            timestamp:
                                body.timestamp * 1000,

                            direction: "incoming",
                        };

                        onMessage(message);
                    }

                    await api.deleteNotification(
                        receiptId,
                    );
                } catch (error) {
                    console.error(
                        "Receive notification error:",
                        error,
                    );

                    await new Promise((resolve) =>
                        setTimeout(resolve, 3000),
                    );
                }
            }
        };

        void receive();

        return () => {
            isActive = false;
        };
    }, [config, onMessage]);
};