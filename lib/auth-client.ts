import { useAuthToken } from "@/hooks/use-auth-token";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => useAuthToken.getState().bearerToken || "",
    },
  },
});
