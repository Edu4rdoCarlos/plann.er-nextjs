import { ApiLogin } from "@/src/services/auth";
import { useMutation, useQueryClient } from "react-query";
import { useAuthStore } from "@/src/store/auth";

const QUERY_KEY = "qkAuth";

export const useAuth = () => {
  const store = useAuthStore();

  const SendCode = () => {
    const queryClient = useQueryClient();

    return useMutation<boolean, Error, { email: string }>(
      ({ email }) => ApiLogin.sendCode(email),
      {
        onSuccess: (data, variables) => {
          if (data) {
            store.setEmail(variables.email);
            queryClient.invalidateQueries(QUERY_KEY);
          }
        },
      }
    );
  };

  const VerifyCode = () => {
    const queryClient = useQueryClient();

    return useMutation<
      boolean,
      Error,
      { email: string; code: string; owner: boolean }
    >(({ email, code }) => ApiLogin.verifyCode(email, code), {
      onSuccess: (data, variables) => {
        if (data) {
          store.login(variables.email, variables.owner);
          queryClient.invalidateQueries(QUERY_KEY);
        }
      },
    });
  };

  return {
    ...store,
    isLoggedIn: store.isAuthenticated && store.userEmail,
    isAdmin: store.owner,
    SendCode,
    VerifyCode,
  };
};
