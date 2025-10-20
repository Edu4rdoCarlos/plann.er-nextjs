import { api } from "../api";

const endpoint = "/auth";

const sendCode = async (email: string): Promise<boolean> => {
  try {
    await api.post<void>(`${endpoint}/send-code`, { email });
    return true;
  } catch (error) {
    return false;
  }
};

const verifyCode = async (
  email: string,
  code: string
): Promise<{ success: boolean; token?: string }> => {
  try {
    const response = await api.post<{
      accessToken: string;
      expiresAt: string;
      email: string;
      name: string | null;
    }>(`${endpoint}/verify-code`, { email, code });
    return { success: true, token: response.data.accessToken };
  } catch (error) {
    return { success: false };
  }
};

export const ApiLogin = {
  sendCode,
  verifyCode,
};
