import { useSelector } from "react-redux";
import PaginaEnum from "../../enums/paginaEnum";
import { RootState } from "../../store";
import NavBar from "../navBar/NavBar";
import { Chat, Login } from "../paginas";
import "./App.css";

function App(): JSX.Element {
  const pagina = useSelector((state: RootState) => state.pagina.visivel);

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
