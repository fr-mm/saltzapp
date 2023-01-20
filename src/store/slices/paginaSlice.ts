import { createSlice } from "@reduxjs/toolkit";
import PaginaEnum from "../../enums/paginaEnum";

const initialState = {
  visivel: PaginaEnum.LOGIN,
};

const paginaSlice = createSlice({
  name: "pagina",
  initialState,
  reducers: {
    mostrarLogin(state) {
      state.visivel = PaginaEnum.LOGIN;
    },
    mostrarChat(state) {
      state.visivel = PaginaEnum.CHAT;
    },
  },
});

export const { mostrarLogin, mostrarChat } = paginaSlice.actions;
export default paginaSlice.reducer;
