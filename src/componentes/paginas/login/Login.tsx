import "./Login.css";
import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import api from "../../../api";
import { useDispatch } from "react-redux";
import { reducers } from "../../../store";
import { UsuarioOuSenhaInvalido } from "../../../erros";
import Alerta from "../../alerta";
import Loader from "../../loader";
import { Usuario } from "../../../entidades";

function Login() {
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [loginNome, setLoginNome] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [cadastroNome, setCadastroNome] = useState("");
  const [cadastroSenha, setCadastroSenha] = useState("");
  const [mostrarLoader, setMostrarLoader] = useState(false);
  const dispatch = useDispatch();

  const handleJustifyClick = (value: any) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  async function fazerLogin() {
    setMostrarLoader(true);
    try {
      const usuario = await api.fazerLogin(loginNome, loginSenha);
      logarUsuario(usuario);
    } catch (erro) {
      if (erro instanceof UsuarioOuSenhaInvalido) {
        dispatch(reducers.alerta.mostrar("Usuário ou senha inválidos"));
      } else {
        dispatch(reducers.alerta.mostrar("Servidor inacessível"));
      }
    }
    setMostrarLoader(false);
  }

  async function cadastrar() {
    setMostrarLoader(true);
    try {
      const usuario = await api.cadastrarUsuario(cadastroNome, cadastroSenha);
      logarUsuario(usuario);
    } catch (erro) {
      if (erro instanceof UsuarioOuSenhaInvalido) {
        dispatch(reducers.alerta.mostrar(erro.message));
      } else {
        dispatch(reducers.alerta.mostrar("Servidor inacessível"));
      }
    }
    setMostrarLoader(false);
  }

  function logarUsuario(usuario: Usuario): void {
    dispatch(
      reducers.usuario.logar({
        id: usuario.id,
        nome: usuario.nome,
        token: usuario.token,
      })
    );
    localStorage.setItem("id", usuario.id);
    localStorage.setItem("nome", usuario.nome);
    localStorage.setItem("token", usuario.token);
    dispatch(reducers.pagina.mostrarChat());
    dispatch(reducers.alerta.desativarAnimacao());
  }

  return (
    <div className="login-container">
      <Alerta />
      {mostrarLoader ? <Loader /> : <></>}
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <MDBTabs
          pills
          justify
          className="mb-3 d-flex flex-row justify-content-between"
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab1")}
              active={justifyActive === "tab1"}
            >
              Login
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleJustifyClick("tab2")}
              active={justifyActive === "tab2"}
            >
              Cadastro
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={justifyActive === "tab1"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Nome"
              id="form1"
              type="text"
              value={loginNome}
              onChange={(e) => setLoginNome(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Senha"
              id="form2"
              type="password"
              value={loginSenha}
              onChange={(e) => setLoginSenha(e.target.value)}
            />

            <MDBBtn className="mb-4 w-100" onClick={async () => fazerLogin()}>
              Entrar
            </MDBBtn>
          </MDBTabsPane>

          <MDBTabsPane show={justifyActive === "tab2"}>
            <MDBInput
              wrapperClass="mb-4"
              label="Nome"
              id="form3"
              type="text"
              value={cadastroNome}
              onChange={(e) => setCadastroNome(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Senha"
              id="form4"
              type="password"
              value={cadastroSenha}
              onChange={(e) => setCadastroSenha(e.target.value)}
            />

            <MDBBtn className="mb-4 w-100" onClick={cadastrar}>
              Cadastrar
            </MDBBtn>
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBContainer>
    </div>
  );
}

export default Login;
