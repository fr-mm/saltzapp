import { Mensagem } from "../../entidades";
import MensagemChat from "../mensagemChat";
import "./Conversa.css";

interface ConversaProps {
  mensagens: Mensagem[];
}

function Conversa(props: ConversaProps): JSX.Element {
  return (
    <div className="conversa">
      {props.mensagens.map((mensagem) => (
        <MensagemChat key={mensagem.enviadaEm.toString()} mensagem={mensagem} />
      ))}
    </div>
  );
}
export default Conversa;
