import { configureStore } from "@reduxjs/toolkit";
import pagina from "./slices/paginaSlice";

export const store = configureStore({
  reducer: { pagina },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
