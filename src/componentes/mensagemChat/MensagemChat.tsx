import { useSelector } from "react-redux";
import Formatar from "../../aux/formatar";
import { Mensagem } from "../../entidades";
import { RootState } from "../../store";
import "./MensagemChat.css";

interface MensagemChatProps {
  mensagem: Mensagem;
}

function MensagemChat(props: MensagemChatProps): JSX.Element {
  const usuarioId = useSelector((state: RootState) => state.usuario.id);
  const enviada = props.mensagem.origemId === usuarioId;

  function formatarClassName(className: string): string {
    return enviada ? className + " enviada" : className + " recebida";
  }

  function enviadaEm(): JSX.Element {
    return (
      <div className="enviada-em">
        {Formatar.data(props.mensagem.enviadaEm)}
      </div>
    );
  }

  return (
    <div className={formatarClassName("mensagem-container")}>
      <div className={formatarClassName("mensagem")}>
        {enviada ? <></> : enviadaEm()}
        <div className="texto">{props.mensagem.texto}</div>
        {enviada ? enviadaEm() : <></>}
      </div>
    </div>
  );
}

export default MensagemChat;
