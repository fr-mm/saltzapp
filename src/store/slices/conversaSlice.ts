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
  mudouFoco: false,
};

const conversaSlice = createSlice({
  name: "conversa",
  initialState,
  reducers: {
    conversarCom(state, action: PayloadAction<ConversarCom>) {
      state.comUsuario.id = action.payload.id;
      state.comUsuario.nome = action.payload.nome;
    },
    mudarFoco(state) {
      state.mudouFoco = true;
    },
    manterFoco(state) {
      state.mudouFoco = false;
    },
  },
});

export const { conversarCom, mudarFoco, manterFoco } = conversaSlice.actions;
export default conversaSlice.reducer;
