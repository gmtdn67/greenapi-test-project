import { useState } from "react";
import type { FC } from "react";
import type { KeyboardEvent } from "react";
import styles from "./SendMessage.module.scss";

interface SendMessageProps {
    onSend: (text: string) => Promise<void>;
}

export const SendMessage: FC<SendMessageProps> = ({
    onSend,
}) => {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const send = async () => {
        const value = text.trim();

        if (!value || isLoading) {
            return;
        }

        setError("");
        setIsLoading(true);

        try {
            await onSend(value);

            setText("");
        } catch (error) {
            console.error(
                "Send message error:",
                error,
            );
            setError(
                "Не удалось отправить сообщение. Попробуйте ещё раз.",
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (
        event: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (event.key !== "Enter") {
            return;
        }

        event.preventDefault();

        void send();
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <input
                    value={text}
                    placeholder="Введите сообщение..."
                    onChange={(event) =>
                        setText(event.target.value)
                    }
                    onKeyDown={handleKeyDown}
                    readOnly={isLoading}
                    autoComplete="off"
                />

                <button
                    type="button"
                    onClick={() => void send()}
                    disabled={
                        isLoading ||
                        !text.trim()
                    }
                    aria-label="Отправить сообщение"
                >
                    {isLoading ? "..." : "➤"}
                </button>
            </div>

            {error && (
                <div className={styles.error}>
                    {error}
                </div>
            )}
        </div>
    );
};