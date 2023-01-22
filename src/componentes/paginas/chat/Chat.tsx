import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import { reducers, RootState } from "../../../store";
import Contatos from "../../contatos";
import icone from "../../../static/icone-usuario.png";
import InputTexto from "../../inputTexto";
import Conversa from "../../conversa";
import { useCallback, useEffect, useState } from "react";
import { Mensagem, UltimaMensagem } from "../../../entidades";
import api from "../../../api";

function Chat(): JSX.Element {
  const tempoDeAtualizacao = 1000;
  const conversandoComId = useSelector(
    (state: RootState) => state.conversa.comUsuario.id
  );
  const usuarioId = useSelector((state: RootState) => state.usuario.id);
  const [ultimasMensagens, setUltimasMensagens] = useState(
    [] as UltimaMensagem[]
  );
  const [mensagens, setMensagens] = useState([] as Mensagem[]);
  const dispatch = useDispatch();

  async function carregarUltimasMensagens(): Promise<void> {
    const mensagens = await api.trazerUltimasMensagens(usuarioId as string);
    setUltimasMensagens(mensagens);
  }

  async function carregarMensagens(): Promise<void> {
    const retorno = await api.trazerMensagens(
      usuarioId as string,
      conversandoComId as string
    );
    setMensagens(retorno.mensagens);
    setUltimasMensagens(retorno.ultimasMensagens);
  }

  const carregarUltimasMensagensCallback = useCallback(
    carregarUltimasMensagens,
    [usuarioId]
  );

  const carregarMensagensCallback = useCallback(carregarMensagens, [
    conversandoComId,
    usuarioId,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (conversandoComId !== null) {
        carregarMensagensCallback();
      } else {
        carregarUltimasMensagensCallback();
      }
      if (
        mensagens[0] !== undefined &&
        (mensagens[0].destinoId === conversandoComId ||
          mensagens[0].origemId === conversandoComId)
      ) {
        dispatch(reducers.conversa.manterFoco());
      }
    }, tempoDeAtualizacao);

    return () => clearInterval(interval);
  }, [
    carregarUltimasMensagensCallback,
    carregarMensagensCallback,
    conversandoComId,
    dispatch,
    mensagens,
  ]);

  return (
    <div className="chat-container">
      <Contatos ultimasMensagens={ultimasMensagens} />
      <div className="main">
        <div className="cabecalho">
          <ConteudoCabecalho />
        </div>
        <Conversa mensagens={mensagens} />
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
