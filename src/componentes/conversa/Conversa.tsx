import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../api";
import { Mensagem } from "../../entidades";
import { RootState } from "../../store";
import MensagemChat from "../mensagemChat";
import "./Conversa.css";

function Conversa(): JSX.Element {
  const [mensagens, setMensagens] = useState([] as Mensagem[]);
  const usuarioId = useSelector((state: RootState) => state.usuario.id);
  const conversa = useSelector((state: RootState) => state.conversa);

  async function carregarMensagens(): Promise<void> {
    const mensagens = await api.trazerMensagens(
      usuarioId as string,
      conversa.comUsuario.id as string
    );
    setMensagens(mensagens);
  }

  function atualizarMensagens(): void {
    if (conversa.comUsuario.id !== null) {
      carregarMensagens();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      atualizarMensagens();
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className="conversa">
      {mensagens.map((mensagem) => (
        <MensagemChat key={mensagem.enviadaEm.toString()} mensagem={mensagem} />
      ))}
    </div>
  );
}
export default Conversa;
