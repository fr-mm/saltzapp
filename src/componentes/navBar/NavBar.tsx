import "./NavBar.css";
import logo from "../../static/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { reducers, RootState } from "../../store";

function NavBar(): JSX.Element {
  return (
    <div className="nav-bar">
      <img src={logo} alt="SaltZapp" />
      <div className="filler"></div>
      <MenuUsuario />
    </div>
  );
}

function MenuUsuario(): JSX.Element {
  const usuario = useSelector((state: RootState) => state.usuario);
  const dispatch = useDispatch();

  function sair(): void {
    dispatch(reducers.usuario.sair());
    dispatch(reducers.pagina.mostrarLogin());
  }

  if (usuario.id !== null) {
    return (
      <div className="menu-usuario">
        <div className="nome-usuario-logado">{usuario.nome}</div>
        <div className="sair" onClick={sair}>
          (sair)
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}

export default NavBar;
