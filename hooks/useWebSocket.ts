"use client";
import { useEffect, useRef } from "react";
import { useNotificationStore } from "@/store/notification-store";

export function useWebSocket() {
  const socketRef = useRef<WebSocket | null>(null);
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token="))
      ?.split("=")[1];

    if (!token) return;

    const ws = new WebSocket(
      `ws://localhost:8000/ws/notifications/?token=${token}`
    );
    ws.onopen = () => console.log("WebSocket connected");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      addNotification(data);
    };
    ws.onclose = () => console.log("WebSocket disconnected");

    socketRef.current = ws;

    return () => {
      ws.close();
    };
  }, [addNotification]);
}