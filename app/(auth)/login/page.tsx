'use client';

import { Button } from "@/src/components/primitives/Button/Button";
import { Input } from "@/src/components/primitives/Input/Input";
import AuthLayout from "@/src/components/Layout/Auth";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "code">("email");
  const [isLoading, setIsLoading] = useState(false);
  const { SendCode, VerifyCode, isLoggedIn } = useAuth();   
  
  const { mutateAsync: sendCode } = SendCode();
  const { mutateAsync: verifyCode } = VerifyCode();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/new");
    }
  }, [isLoggedIn, router]);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      const success = await sendCode({ email });
      if (success) {
        setStep("code");
      } else {
        alert("Erro ao enviar código. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao enviar código. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code) return;
    
    setIsLoading(true);
    try {
      const success = await verifyCode({ email, code, owner: false });
      if (success) {
        router.push("/new");
      } else {
        alert("Código inválido. Tente novamente.");
      }
    } catch (error) {
      alert("Erro ao verificar código. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setCode("");
  };

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          {step === "email" ? "Fazer login" : "Verificar código"}
        </h2>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {step === "email" 
            ? "Digite seu email para receber o código de acesso"
            : `Código enviado para ${email}`
          }
        </p>
      </div>

      {step === "email" ? (
        <form onSubmit={handleSendCode} className="space-y-6">
          <Input
            Icon={Mail}
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !email}
          >
            {isLoading ? "Enviando..." : "Enviar código"}
          </Button>
        </form>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <Input
            Icon={Lock}
            type="text"
            placeholder="Código de 6 dígitos"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required
          />
          
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !code}
            >
              {isLoading ? "Verificando..." : "Entrar"}
            </Button>
            
            <Button
              type="button"
              colorScheme="secondary"
              className="w-full"
              onClick={handleBackToEmail}
              disabled={isLoading}
            >
              Voltar
            </Button>
          </div>
        </form>
      )}

      <div className="text-center text-sm text-zinc-500">
        <p>
          Ao fazer login, você concorda com nossos{" "}
          <a href="#" className="text-emerald-600 hover:underline">
            termos de uso
          </a>{" "}
          e{" "}
          <a href="#" className="text-emerald-600 hover:underline">
            política de privacidade
          </a>
        </p>
      </div>
    </AuthLayout>
  );
} 