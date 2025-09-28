"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { ReactNode } from "react";
import { setUser } from "@/redux/slice/auth/authSlice";

export function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      store.dispatch(setUser(JSON.parse(stored)));
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
