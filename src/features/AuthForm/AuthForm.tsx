import { useEffect, useState } from "react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { GreenApiClient } from "@/shared/api/green-api/client";
import type { GreenApiConfig } from "@/shared/types/green-api";
import { greenApiStorage } from "@/shared/lib/green-api-storage";
import styles from "./AuthForm.module.scss";

interface AuthFormProps {
  onSuccess: (config: GreenApiConfig) => void;
}

interface AuthFormValues {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

export const AuthForm: FC<AuthFormProps> = ({ onSuccess }) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    defaultValues: {
      apiUrl: "https://api.green-api.com",
      idInstance: "",
      apiTokenInstance: "",
    },
  });

  useEffect(() => {
    const savedConfig = greenApiStorage.get();

    if (savedConfig) {
      reset(savedConfig);
    }
  }, [reset]);

  const onSubmit = async (values: AuthFormValues) => {
    setError("");
    setIsLoading(true);

    try {
      const config: GreenApiConfig = {
        apiUrl: values.apiUrl.replace(/\/$/, ""),
        idInstance: values.idInstance.trim(),
        apiTokenInstance: values.apiTokenInstance.trim(),
      };

      const client = new GreenApiClient(config);

      const state = await client.getStateInstance();

      if (state !== "authorized") {
        setError(
          `Инстанс не авторизован. Текущий статус: ${state}`,
        );

        return;
      }

      greenApiStorage.set(config);

      onSuccess(config);
    } catch {
      setError(
        "Не удалось подключиться к GREEN-API. Проверьте данные подключения.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles.header}>
        <h1>Подключение WhatsApp</h1>

        <p>
          Введите данные вашего GREEN-API инстанса
        </p>
      </div>

      <label className={styles.field}>
        <span>API URL</span>

        <input
          {...register("apiUrl", {
            required: "Введите API URL",
          })}
          placeholder="https://api.green-api.com"
        />

        {errors.apiUrl && (
          <span className={styles.error}>
            {errors.apiUrl.message}
          </span>
        )}
      </label>

      <label className={styles.field}>
        <span>ID инстанса</span>

        <input
          {...register("idInstance", {
            required: "Введите ID инстанса",
          })}
          placeholder="1101234567"
        />

        {errors.idInstance && (
          <span className={styles.error}>
            {errors.idInstance.message}
          </span>
        )}
      </label>

      <label className={styles.field}>
        <span>API Token</span>

        <input
          type="password"
          {...register("apiTokenInstance", {
            required: "Введите API Token",
          })}
          placeholder="Введите API Token"
        />

        {errors.apiTokenInstance && (
          <span className={styles.error}>
            {errors.apiTokenInstance.message}
          </span>
        )}
      </label>

      {error && (
        <div className={styles.formError}>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Подключение..." : "Подключиться"}
      </button>
    </form>
  );
};