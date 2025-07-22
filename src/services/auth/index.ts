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

const verifyCode = async (email: string, code: string): Promise<boolean> => {
  try {
    await api.post<void>(`${endpoint}/verify-code`, { email, code });
    return true;
  } catch (error) {
    return false;
  }
};

export const ApiLogin = {
  sendCode,
  verifyCode,
};
