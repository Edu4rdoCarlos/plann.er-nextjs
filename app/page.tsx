'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/hooks/auth/useAuth";

export default function HomePage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/new");
    } else {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  return (
    <></>
  );
}
