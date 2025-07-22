"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { sMenuAvatar, sAvatar, sDropdown, sMenuItem } from "./MenuAvatar.variants";
import Image from "next/image";

export interface MenuAvatarProps {
  className?: string;
}

export const MenuAvatar = ({ className }: MenuAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { userEmail, isAdmin, logout, isLoggedIn } = useAuth();
  const router = useRouter();

  const getAvatarUrl = (email: string | null) => {
    if (!email) return "https://api.dicebear.com/7.x/bottts/svg?seed=default";
    const seed = encodeURIComponent(email);
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/login");
    setIsOpen(false);
  };

  const handleSettings = () => {
    router.push("/settings");
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={sMenuAvatar({ className })} ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className={sAvatar()}
        aria-label="Menu do usuário"
      >
        <img 
          src={getAvatarUrl(userEmail)} 
          alt="Avatar do usuário"
          width={32}
          height={32}
          className="w-full h-full rounded-full"
        />
      </button>

      {isOpen && (
        <div className={sDropdown()}>
          <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              {userEmail?.split("@")[0] || "Usuário"}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Bem vindo, {userEmail}!
            </p>
            {isAdmin && (
              <span className="inline-block mt-1 px-2 py-1 text-xs bg-emerald-100 text-emerald-800 rounded-full">
                Admin
              </span>
            )}
          </div>

          <div className="py-1">
            {isAdmin && (
              <button
                onClick={handleSettings}
                className={sMenuItem()}
              >
                <Settings className="w-4 h-4" />
                <span>Configurações</span>
              </button>
            )}
            
            <button
              onClick={handleLogout}
              className={sMenuItem({ variant: "danger" })}
            >
              <LogOut className="w-4 h-4" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 