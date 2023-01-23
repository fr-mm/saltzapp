import Contato from "./Contato";
import { UltimaMensagem } from "../../entidades";

interface ContatosProps {
  ultimasMensagens: UltimaMensagem[];
}

function Contatos(props: ContatosProps): JSX.Element {
  return (
    <div className="contatos">
      {props.ultimasMensagens.map((ultimaMensagem) => (
        <Contato
          key={ultimaMensagem.id}
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
