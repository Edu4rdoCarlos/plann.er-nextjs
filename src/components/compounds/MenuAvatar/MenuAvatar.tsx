"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/src/hooks/auth/useAuth";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { capitalize } from "radash";
import { sMenuAvatar, sAvatar, sDropdown, sMenuItem } from "./MenuAvatar.variants";

export interface MenuAvatarProps {
  className?: string;
}

export const MenuAvatar = ({ className }: MenuAvatarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const { userEmail, isAdmin, handleLogout, isLoggedIn } = useAuth();
  const router = useRouter();

  const getAvatarUrl = (email: string | null) => {
    if (!email) return "https://api.dicebear.com/7.x/bottts/svg?seed=default";
    const seed = encodeURIComponent(email);
    return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}`;
  };

  // Focar no primeiro item quando o menu abre
  useEffect(() => {
    if (isOpen && menuItemsRef.current[0]) {
      menuItemsRef.current[0]?.focus();
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!isLoggedIn) {
    return null;
  }

  const onLogout = () => {
    handleLogout();
    setIsOpen(false);
  };

  const handleSettings = () => {
    router.push("/settings");
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number, totalItems: number) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = index < totalItems - 1 ? index + 1 : 0;
        menuItemsRef.current[nextIndex]?.focus();
        setSelectedIndex(nextIndex);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = index > 0 ? index - 1 : totalItems - 1;
        menuItemsRef.current[prevIndex]?.focus();
        setSelectedIndex(prevIndex);
        break;
      case "Home":
        e.preventDefault();
        menuItemsRef.current[0]?.focus();
        setSelectedIndex(0);
        break;
      case "End":
        e.preventDefault();
        menuItemsRef.current[totalItems - 1]?.focus();
        setSelectedIndex(totalItems - 1);
        break;
    }
  };

  const totalMenuItems = isAdmin ? 2 : 1;

  return (
    <div className={sMenuAvatar({ className })} ref={dropdownRef}>
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        className={sAvatar()}
        aria-label="Menu do usuário"
        aria-expanded={isOpen}
        aria-haspopup="true"
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
        <div className={sDropdown()} role="menu">
          <div className="px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Bem-vindo, {capitalize(userEmail?.split("@")[0] || "usuário")}!
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {userEmail}
            </p>
            {isAdmin && (
              <span className="inline-block mt-1 px-2 py-1 text-xs bg-lime-100 text-lime-800 rounded-full">
                Admin
              </span>
            )}
          </div>

          <div className="py-1">
            {isAdmin && (
              <button
                ref={(el) => {
                  menuItemsRef.current[0] = el;
                }}
                onClick={handleSettings}
                onKeyDown={(e) => handleKeyDown(e, 0, totalMenuItems)}
                className={sMenuItem()}
                role="menuitem"
              >
                <Settings className="w-4 h-4" />
                <span>Configurações</span>
              </button>
            )}

            <button
              ref={(el) => {
                menuItemsRef.current[isAdmin ? 1 : 0] = el;
              }}
              onClick={onLogout}
              onKeyDown={(e) => handleKeyDown(e, isAdmin ? 1 : 0, totalMenuItems)}
              className={sMenuItem({ variant: "danger" })}
              role="menuitem"
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