import { configureStore } from "@reduxjs/toolkit";
import carteiraSlice from "./modules/carteiraSlice";

export const store = configureStore({
  reducer: {
    carteira: carteiraSlice,
  },
});

export type Store = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
