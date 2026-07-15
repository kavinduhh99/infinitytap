"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function DashboardRootPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediate fallback redirect straight to login
    router.replace("/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-center gap-4">
      <Loader2 className="w-8 h-8 text-brand-violet animate-spin" />
      <span className="text-zinc-500 text-sm font-semibold">Redirecting to login...</span>
    </div>
  );
}
