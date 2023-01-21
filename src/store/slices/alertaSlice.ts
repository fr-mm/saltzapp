import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  mensagem: "",
  visivel: false,
  animar: false,
};

const alertaSlice = createSlice({
  name: "conversa",
  initialState,
  reducers: {
    mostrar(state, action: PayloadAction<string>) {
      state.mensagem = action.payload;
      state.visivel = true;
      state.animar = true;
    },
    esconder(state) {
      state.visivel = false;
    },
    desativarAnimacao(state) {
      state.animar = false;
    },
  },
});

export const { mostrar, esconder, desativarAnimacao } = alertaSlice.actions;
export default alertaSlice.reducer;
