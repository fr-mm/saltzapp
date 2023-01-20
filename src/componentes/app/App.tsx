import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginaEnum from "../../enums/paginaEnum";
import { reducers, RootState } from "../../store";
import NavBar from "../navBar/NavBar";
import { Chat, Login } from "../paginas";
import "./App.css";

function App(): JSX.Element {
  const dispatch = useDispatch();
  const [carregou, setCarregou] = useState(false);

  useEffect(() => {
    if (!carregou) {
      const id = localStorage.getItem("id");
      const nome = localStorage.getItem("nome");
      const token = localStorage.getItem("token");

      if (id !== null && nome !== null && token !== null) {
        dispatch(reducers.usuario.logar({ id, nome, token }));
        dispatch(reducers.pagina.mostrarChat());
      }

      setCarregou(true);
    }
  }, [carregou, dispatch]);

  return (
    <div className="App">
      <NavBar />
      <div className="app-corpo">
        <Pagina />
      </div>
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
