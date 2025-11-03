"use client";

import Image from "next/image";
import Link from "next/link";
import { MenuAvatar } from "@/src/components/compounds/MenuAvatar";
import { AccessibilityPanel } from "@/src/components/compounds/AccessibilityPanel";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("common");

  return (
    <header
      id="navigation"
      className="text-white p-4 bg-zinc-900/50 border-b-[1px] border-zinc-800 rounded-xl"
    >
      <div className="w-full flex items-center justify-between mx-auto px-10">
        <div className="flex justify-between items-center gap-10">
          <div className="flex items-center">
            <Link href="/" aria-label="Ir para página inicial">
              <Image
                src="/logo/Logo.svg"
                alt="Planner Logo"
                width={160}
                height={160}
                className="mr-4"
              />
            </Link>
          </div>

          <nav className="flex gap-6" aria-label="Navegação principal">
            <Link
              href="/"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500 rounded px-2 py-1"
            >
              <div className="hover:underline">{t("home")}</div>
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <AccessibilityPanel />
          <MenuAvatar />
        </div>
      </div>
    </header>
  );
};

export default Header;
