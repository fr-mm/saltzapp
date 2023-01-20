import { configureStore } from "@reduxjs/toolkit";
import pagina from "./slices/paginaSlice";
import usuario from "./slices/usuarioSlice";
import conversa from "./slices/conversaSlice";

export const store = configureStore({
  reducer: { pagina, usuario, conversa },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
