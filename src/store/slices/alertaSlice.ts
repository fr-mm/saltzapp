import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  mensagem: "",
  visivel: false,
  virgem: true,
};

const alertaSlice = createSlice({
  name: "conversa",
  initialState,
  reducers: {
    mostrar(state, action: PayloadAction<string>) {
      state.mensagem = action.payload;
      state.visivel = true;
      state.virgem = false;
    },
    esconder(state) {
      state.visivel = false;
    },
  },
});

export const { mostrar, esconder } = alertaSlice.actions;
export default alertaSlice.reducer;
