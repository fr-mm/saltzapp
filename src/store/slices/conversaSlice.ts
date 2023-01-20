import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConversarCom {
  id: string;
  nome: string;
}

const initialState = {
  comUsuario: {
    id: null as null | string,
    nome: null as null | string,
  },
};

const conversaSlice = createSlice({
  name: "conversa",
  initialState,
  reducers: {
    conversarCom(state, action: PayloadAction<ConversarCom>) {
      state.comUsuario.id = action.payload.id;
      state.comUsuario.nome = action.payload.nome;
    },
  },
});

export const { conversarCom } = conversaSlice.actions;
export default conversaSlice.reducer;
