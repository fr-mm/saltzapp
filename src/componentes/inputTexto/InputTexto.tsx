import { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";
import { RootState } from "../../store";
import "./InputTexto.css";

function InputTexto(): JSX.Element {
  const [mensagem, setMensagem] = useState("");
  const conversandoCom = useSelector(
    (state: RootState) => state.conversa.comUsuario
  );
  const usuarioId = useSelector((state: RootState) => state.usuario.id);

  function ativo(): boolean {
    return conversandoCom.id !== null;
  }

  function inputClassName(): string {
    let className = "input-texto";
    if (!ativo()) {
      className += " desabilitado";
    }
    return className;
  }

  function enviarClassName(): string {
    let className = "enviar";
    if (!ativo()) {
      className += " desabilitado";
    }
    return className;
  }

  function placeholder(): string {
    return ativo() ? "Mensagem" : "";
  }

  function enviar(): void {
    api.enviarMensagem(
      usuarioId as string,
      conversandoCom.id as string,
      mensagem
    );
  }

  return (
    <div className="input-texto-container">
      <input
        type="text"
        className={inputClassName()}
        placeholder={placeholder()}
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        disabled={!ativo()}
      ></input>
      <div className={enviarClassName()} onClick={enviar}></div>
    </div>
  );
}
export default InputTexto;
