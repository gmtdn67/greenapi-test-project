import { useState } from "react";
import type { FC } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import type { Chat } from "@/entities/chat/model/types";
import styles from "./CreateChat.module.scss";

interface CreateChatProps {
  onCreate: (chat: Chat) => void;
}

interface FormValues {
  phone: string;
}

export const CreateChat: FC<CreateChatProps> = ({
  onCreate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = ({ phone }) => {
    const normalizedPhone = phone.replace(/\D/g, "");

    const chatId = `${normalizedPhone}@c.us`;

    const chat: Chat = {
      id: chatId,
      phone: normalizedPhone,
      title: `+${normalizedPhone}`,
    };

    onCreate(chat);

    reset();
    setIsOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.addButton}
        onClick={() => setIsOpen(true)}
      >
        +
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <form
            className={styles.modal}
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>Новый чат</h2>

            <label>
              <span>Номер телефона</span>

              <input
                {...register("phone", {
                  required: "Введите номер телефона",
                  minLength: {
                    value: 10,
                    message: "Проверьте номер телефона",
                  },
                })}
                placeholder="+7 999 123-45-67"
                autoFocus
              />
            </label>

            {errors.phone && (
              <span className={styles.error}>
                {errors.phone.message}
              </span>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                onClick={() => {
                  reset();
                  setIsOpen(false);
                }}
              >
                Отмена
              </button>

              <button type="submit">
                Создать
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};