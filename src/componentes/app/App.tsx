import { useSelector } from "react-redux";
import PaginaEnum from "../../enums/paginaEnum";
import { RootState } from "../../store";
import Login from "../paginas/login/Login";
import "./App.css";

function App(): JSX.Element {
  const pagina = useSelector((state: RootState) => state.pagina.visivel);

  return (
    <div className="App">
      <Pagina pagina={pagina} />
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
    default:
      return <></>;
  }
}

export default App;
