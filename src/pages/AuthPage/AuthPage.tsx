import type { FC } from "react";
import type { GreenApiConfig } from "@/shared/types/green-api";
import { AuthForm } from "@/features/AuthForm/AuthForm";
import styles from "./AuthPage.module.scss";

interface AuthPageProps {
  onSuccess: (config: GreenApiConfig) => void;
}

export const AuthPage: FC<AuthPageProps> = ({ onSuccess }) => {
  return (
    <main className={styles.page}>
      <AuthForm onSuccess={onSuccess} />
    </main>
  );
};