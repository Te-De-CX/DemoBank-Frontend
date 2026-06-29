"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function useAuth(requireAuth = true) {
  const { isAuthenticated, isLoading, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { isAuthenticated, isLoading };
}