import "./Chat.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import Contatos from "../../contatos";
import icone from "../../../static/icone-usuario.png";
import InputTexto from "../../inputTexto";
import Conversa from "../../conversa";
import { useEffect } from "react";

function Chat(): JSX.Element {
  useEffect(() => {
    const interval = setInterval(() => {}, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <Contatos />
      <div className="main">
        <div className="cabecalho">
          <ConteudoCabecalho />
        </div>
        <Conversa />
        <InputTexto />
      </div>
    </div>
  );
}

function ConteudoCabecalho(): JSX.Element {
  const conversandoCom = useSelector(
    (state: RootState) => state.conversa.comUsuario
  );

  if (conversandoCom.id !== null) {
    return (
      <div className="conteudo-cabecalho contato-nome">
        <img className="icone-usuario" src={icone} alt="icone usuario"></img>
        {conversandoCom.nome}
      </div>
    );
  } else {
    return <></>;
  }
}

export default Chat;
