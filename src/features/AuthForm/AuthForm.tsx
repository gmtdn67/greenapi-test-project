import { useForm } from "react-hook-form";
import styles from './AuthForm.module.scss'
import type { GreenApiConfig } from "@/shared/types/green-api";

export function AuthForm() {
    const { register, handleSubmit } = useForm<GreenApiConfig>();

    const onSubmit = (data: GreenApiConfig) => {
        console.log(data);
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