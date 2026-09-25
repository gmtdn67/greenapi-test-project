import { useForm } from "react-hook-form";
import styles from './AuthForm.module.scss'
import type { GreenApiConfig } from "@/shared/types/green-api";
import { GreenApiClient } from "@/shared/api/green-api/client";

export function AuthForm() {
    const { register, handleSubmit } = useForm<GreenApiConfig>();

    const onSubmit = async (data: GreenApiConfig) => {
        try {
            const api = new GreenApiClient(data);

            const result = await api.getStateInstance();

            console.log("GREEN-API:", result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h1>WhatsApp Chat</h1>

            <input
                {...register("apiUrl")}
                placeholder="API URL"
            />

            <input
                {...register("idInstance")}
                placeholder="ID Instance"
            />

            <input
                {...register("apiTokenInstance")}
                type="password"
                placeholder="API Token Instance"
            />

            <button type="submit">
                Подключиться
            </button>
        </form>
    );
}