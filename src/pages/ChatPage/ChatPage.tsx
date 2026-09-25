import type { FC } from "react";

import type { GreenApiConfig } from "@/shared/types/green-api";

interface ChatPageProps {
  config: GreenApiConfig;
}

export const ChatPage: FC<ChatPageProps> = ({ config }) => {
  return (
    <div>
      <h1>WhatsApp Chat</h1>

      <p>
        Instance: {config.idInstance}
      </p>
    </div>
  );
};