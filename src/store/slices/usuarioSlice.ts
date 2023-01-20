import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUsuario {
  id: string | null;
  nome: string | null;
  token: string | null;
}

const initialState = {
  id: null as null | string,
  nome: null as null | string,
  token: null as null | string,
};

const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    logar(state, action: PayloadAction<IUsuario>) {
      state.id = action.payload.id;
      state.nome = action.payload.nome;
      state.token = action.payload.token;
    },
    sair(state) {
      state.id = null;
      state.nome = null;
      state.token = null;
    },
  },
});

export const { logar, sair } = usuarioSlice.actions;
export default usuarioSlice.reducer;
