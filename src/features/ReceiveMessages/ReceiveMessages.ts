import { useEffect } from "react";
import { GreenApiClient } from "@/shared/api/green-api/client";
import type { GreenApiConfig } from "@/shared/types/green-api";
import { sleep } from "@/shared/lib/sleep";
import type { Message } from "@/entities/message/model/types";
import { isIncomingTextMessage } from "@/shared/lib/isIncomingTestMessage";

interface UseReceiveMessagesParams {
    config: GreenApiConfig;
    onMessage: (message: Message) => void;
    onError?: (error: unknown) => void;
    onConnected?: () => void;
}

export const useReceiveMessages = ({
    config,
    onMessage,
    onError,
    onConnected
}: UseReceiveMessagesParams) => {
    useEffect(() => {
        const api = new GreenApiClient(config);

        let isActive = true;

        const receive = async () => {
            while (isActive) {
                try {
                    const notification =
                        await api.receiveNotification(10);

                        onConnected?.()
                    if (!isActive) {
                        return;
                    }

                    if (!notification) {
                        continue;
                    }

                    const { receiptId, body } =
                        notification;

                    if (isIncomingTextMessage(body)) {
                        const message: Message = {
                            id: body.idMessage,
                            chatId:
                                body.senderData.chatId,
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
                    if (!isActive) {
                        return;
                    }

                    console.error(
                        "Receive notification error:",
                        error,
                    );

                    onError?.(error);

                    await sleep(3000);
                }
            }
        };

        void receive();

        return () => {
            isActive = false;
        };
    }, [config, onMessage, onError]);
};