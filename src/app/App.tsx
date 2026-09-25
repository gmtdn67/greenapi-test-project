import { useState } from "react";
import { AuthPage } from "@/pages/AuthPage/AuthPage";
import { ChatPage}  from "@/pages/ChatPage/ChatPage";

import type { GreenApiConfig } from "@/shared/types/green-api";
import { greenApiStorage } from "@/shared/lib/green-api-storage";

function App() {
  const [config, setConfig] = useState<GreenApiConfig | null>(
    () => greenApiStorage.get(),
  );

  if (!config) {
    return (
      <AuthPage
        onSuccess={(newConfig) => {
          setConfig(newConfig);
        }}
      />
    );
  }

  return (
    <ChatPage config={config} />
  );
}

export default App;

