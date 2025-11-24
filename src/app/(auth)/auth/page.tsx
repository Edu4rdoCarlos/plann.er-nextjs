"use client";

import { Button } from "@/src/components/primitives/Button/Button";
import { Input } from "@/src/components/primitives/Input/Input";

import AuthLayout from "@/src/components/compounds/Layout/Auth";
import { useAuth } from "@/src/hooks/auth/useAuth";
import {
  CodeFormData,
  codeSchema,
  EmailFormData,
  emailSchema,
} from "@/src/schemas/auth/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Toast } from "@/src/components/primitives/Toast/Toast";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [currentEmail, setCurrentEmail] = useState("");
  const { SendCode, VerifyCode, isLoggedIn } = useAuth();
  const t = useTranslations("auth");
  
   const [toast, setToast] = useState<{
    isOpen: boolean;
    message: string;
    type: "success" | "error";
  }>({
    isOpen: false,
    message: "",
    type: "success",
  });

  const { mutate: sendCode, isLoading: isSendingCode } = SendCode();
  const { mutate: verifyCode, isLoading: isVerifyingCode } = VerifyCode();
  const router = useRouter();

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const codeForm = useForm<CodeFormData>({
    resolver: zodResolver(codeSchema),
    mode: "onChange",
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/trip");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (step === "email") {
      codeForm.reset();
    }
  }, [step, codeForm]);

  const handleSendCode = (data: EmailFormData) => {
    if (data.email === "") {
      emailForm.setError("email", { message: t("emailRequired") });
      return;
    }

    setCurrentEmail(data.email);
    sendCode({ email: data.email }, {
      onSuccess: () => {
        setStep("code");
        setToast({
          isOpen: true,
          message: "Código enviado com sucesso!",
          type: "success",
        });
      },
      onError: () => {
        setToast({
          isOpen: true,
          message: "Erro ao enviar código",
          type: "error",
        });
      }
    });
  };

  const handleVerifyCode = (data: CodeFormData) => {
    if (data.code === "") {
      codeForm.setError("code", { message: t("codeRequired") });
      return;
    }

    verifyCode({
      email: currentEmail,
      code: data.code,
    });
  };

  const handleBackToEmail = () => {
    setStep("email");
    codeForm.reset();
    setCurrentEmail("");
  };

  const handleCloseToast = () => {
    setToast((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {step === "email" ? t("login") : t("verifyCode")}
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {step === "email"
            ? t("emailDescription")
            : t("codeSent", { email: currentEmail })}
        </p>
      </div>

      {step === "email" ? (
        <form
          onSubmit={emailForm.handleSubmit(handleSendCode)}
          className="space-y-6"
        >
          <Input
            Icon={Mail}
            type="email"
            placeholder={t("emailPlaceholder")}
            {...emailForm.register("email")}
            error={emailForm.formState.errors.email?.message}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={
              isSendingCode ||
              !emailForm.formState.isValid ||
              Object.keys(emailForm.formState.errors).length > 0
            }
          >
            {isSendingCode ? t("sending") : t("sendCode")}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={codeForm.handleSubmit(handleVerifyCode)}
          className="space-y-6"
        >
          <Input
            Icon={Lock}
            type="text"
            placeholder={t("codePlaceholder")}
            maxLength={6}
            {...codeForm.register("code")}
            error={codeForm.formState.errors.code?.message}
          />

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={
                isVerifyingCode ||
                !codeForm.formState.isValid ||
                Object.keys(codeForm.formState.errors).length > 0
              }
            >
              {isVerifyingCode ? t("verifying") : t("enter")}
            </Button>

            <Button
              type="button"
              colorScheme="secondary"
              className="w-full"
              onClick={handleBackToEmail}
              disabled={isVerifyingCode}
            >
              {t("back")}
            </Button>
          </div>
        </form>
      )}

      <div className="text-center text-sm text-zinc-500">
        <p>
          {t.rich("agreement", {
            terms: (chunks) => (
              <a href="#" className="text-lime-600 hover:underline">
                {chunks}
              </a>
            ),
            privacy: (chunks) => (
              <a href="#" className="text-lime-600 hover:underline">
                {chunks}
              </a>
            ),
          })}
        </p>
      </div>

      <Toast
        message={toast.message}
        isOpen={toast.isOpen}
        onClose={handleCloseToast}
        type={toast.type}
      />
    </AuthLayout>
  );
}
