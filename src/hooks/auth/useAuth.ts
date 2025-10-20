import { ApiLogin } from "@/src/services/auth";
import { useMutation, useQueryClient } from "react-query";
import { useAuthStore } from "@/src/store/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/src/providers/ToastProvider";
import { useTranslations } from "next-intl";

const QUERY_KEY = "qkAuth";

export const useAuth = () => {
  const store = useAuthStore();
  const router = useRouter();
  const { showToast } = useToast();
  const t = useTranslations("auth");

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
        onError: () => {
          showToast(t("sendCodeError"), "error");
        },
      }
    );
  };

  const VerifyCode = () => {
    const queryClient = useQueryClient();

    return useMutation<
      { success: boolean; token?: string },
      Error,
      { email: string; code: string }
    >(({ email, code }) => ApiLogin.verifyCode(email, code), {
      onSuccess: (data, variables) => {
        if (data.success) {
          store.login(variables.email, data.token);
          queryClient.invalidateQueries(QUERY_KEY);
          router.push("/trip");
        } else {
          showToast(t("invalidCode"), "error");
        }
      },
      onError: () => {
        showToast(t("verifyCodeError"), "error");
      },
    });
  };

  const handleLogout = () => {
    router.push("/auth");
    setTimeout(() => {
      store.logout();
    }, 50);
  };

  return {
    ...store,
    isLoggedIn: store.isAuthenticated && store.userEmail,
    isAdmin: false,
    SendCode,
    VerifyCode,
    handleLogout,
  };
};
