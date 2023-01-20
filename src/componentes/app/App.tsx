import { useDispatch, useSelector } from "react-redux";
import PaginaEnum from "../../enums/paginaEnum";
import { reducers, RootState } from "../../store";
import NavBar from "../navBar/NavBar";
import { Chat, Login } from "../paginas";
import "./App.css";

function App(): JSX.Element {
  const pagina = useSelector((state: RootState) => state.pagina.visivel);
  const dispatch = useDispatch();

  function lembrarUsuario(): void {
    const id = localStorage.getItem("id");
    const nome = localStorage.getItem("nome");
    const token = localStorage.getItem("token");

    if (id !== null && nome !== null && token !== null) {
      dispatch(reducers.usuario.logar({ id, nome, token }));
      dispatch(reducers.pagina.mostrarChat());
    }
  }

  lembrarUsuario();

  return (
    <div className="App">
      <NavBar />
      <div className="app-corpo">
        <Pagina pagina={pagina} />
      </div>
    </div>
  );
}

interface PaginaProps {
  pagina: PaginaEnum;
}

function Pagina(props: PaginaProps): JSX.Element {
  switch (props.pagina) {
    case PaginaEnum.LOGIN:
      return <Login />;
    case PaginaEnum.CHAT:
      return <Chat />;
    default:
      return <></>;
  }
}

export default App;
