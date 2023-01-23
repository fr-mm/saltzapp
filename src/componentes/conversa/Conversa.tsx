import { useSelector } from "react-redux";
import { Mensagem } from "../../entidades";
import { RootState } from "../../store";
import Loader from "../loader";
import MensagemChat from "../mensagemChat";
import "./Conversa.css";

interface ConversaProps {
  mensagens: Mensagem[];
}

function Conversa(props: ConversaProps): JSX.Element {
  const mudouFoco = useSelector((state: RootState) => state.conversa.mudouFoco);

  if (!mudouFoco) {
  } else {
    return (
      <div className="conversa centralizar">
        <Loader semMascara={true} />
      </div>
    );
  }

  return (
    <div className="conversa">
      {props.mensagens.map((mensagem) => (
        <MensagemChat key={mensagem.id} mensagem={mensagem} />
      ))}
    </div>
  );
}

export default Conversa;
