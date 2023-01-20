import { configureStore } from "@reduxjs/toolkit";
import pagina from "./slices/paginaSlice";
import usuario from "./slices/usuarioSlice";

export const store = configureStore({
  reducer: { pagina, usuario },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
