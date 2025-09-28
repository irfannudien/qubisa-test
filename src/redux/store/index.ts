"use client";

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slice/auth/authSlice";
import homeReducer from "@/redux/slice/homeSlice/homeSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    home: homeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
