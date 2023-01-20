import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Contato from "./Contato";
import { UltimaMensagem } from "../../entidades";
import { RootState } from "../../store";
import api from "../../api";

function Contatos(): JSX.Element {
  const [carregou, setCarregou] = useState(false);
  const [ultimasMensagens, setUltimasMensagens] = useState(
    [] as UltimaMensagem[]
  );
  const usuario = useSelector((state: RootState) => state.usuario);

  async function carregarUltimasMensagens() {
    const mensagens = await api.trazerUltimasMensagens(usuario.id as string);
    setUltimasMensagens(mensagens);
    setCarregou(true);
  }

  useEffect(() => {
    if (!carregou) {
      carregarUltimasMensagens();
    }
  });

  return (
    <div className="contatos">
      {ultimasMensagens.map((ultimaMensagem) => (
        <Contato
          key={ultimaMensagem + ultimaMensagem.contatoId}
          id={ultimaMensagem.contatoId}
          nome={ultimaMensagem.contatoNome}
          ultimaMensagem={ultimaMensagem.texto}
          utlimaMensagemEnviadaEm={ultimaMensagem.enviadaEm}
        />
      ))}
    </div>
  );
}

export default Contatos;
