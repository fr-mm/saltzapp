import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../api";
import PaginaEnum from "../../enums/paginaEnum";
import { reducers, RootState } from "../../store";
import Loader from "../loader";
import NavBar from "../navBar/NavBar";
import { Chat, Login } from "../paginas";
import "./App.css";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const [carregou, setCarregou] = useState(false);
  const [mostrarLoader, setMostrarLoader] = useState(true);

  function lembrarUsuario() {
    const id = localStorage.getItem("id");
    const nome = localStorage.getItem("nome");
    const token = localStorage.getItem("token");

    if (id !== "" && nome !== "" && token !== "") {
      dispatch(reducers.usuario.logar({ id, nome, token }));
      dispatch(reducers.pagina.mostrarChat());
    }
  }

  async function autorizarLocaltunnel() {
    const autorizado = await api.localtunnelAcessivel();
    if (!autorizado) {
      window.location.replace(api.pingUrl);
    } else {
      setMostrarLoader(false);
    }
  }

  const lembrarUsuarioCallback = useCallback(lembrarUsuario, [dispatch]);
  const autorizarLocaltunnelCallback = useCallback(autorizarLocaltunnel, []);

  useEffect(() => {
    if (!carregou) {
      autorizarLocaltunnelCallback();
      lembrarUsuarioCallback();
      setCarregou(true);
    }
  }, [carregou, lembrarUsuarioCallback, autorizarLocaltunnelCallback]);

  return (
    <div className="App">
      <NavBar />
      <div className="app-corpo">{mostrarLoader ? <Loader /> : <Pagina />}</div>
    </div>
  );
}

function Pagina(): JSX.Element {
  const pagina = useSelector((state: RootState) => state.pagina.visivel);
  switch (pagina) {
    case PaginaEnum.LOGIN:
      return <Login />;
    case PaginaEnum.CHAT:
      return <Chat />;
    default:
      return <></>;
  }
}

export default App;
