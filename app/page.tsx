"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#888",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 14,
        }}
      >
        Loading…
      </div>
    );
  }

  if (!session) return null;

  return (
    <div>
      {/* User bar */}
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "8px 32px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 12,
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        <span style={{ color: "#888", fontSize: 12 }}>
          {session.user?.name || session.user?.email}
        </span>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          style={{
            padding: "4px 12px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "transparent",
            color: "#888",
            fontSize: 11,
            cursor: "pointer",
          }}
        >
          Sign out
        </button>
      </div>
      <Dashboard />
    </div>
  );
}
