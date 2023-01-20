import "./Contato.css";
import icone from "../../static/icone-usuario.png";
import { useDispatch, useSelector } from "react-redux";
import { reducers, RootState } from "../../store";

interface ContatoProps {
  id: string;
  nome: string;
  ultimaMensagem: string;
  utlimaMensagemEnviadaEm: Date;
}

function eHoje(data: Date): boolean {
  const hoje = new Date();
  return (
    data.getFullYear() === hoje.getFullYear() &&
    data.getMonth() === hoje.getMonth() &&
    data.getDate() === hoje.getDate()
  );
}

function formatarData(data: Date): string {
  if (eHoje(data)) {
    return `${data.getHours()}:${data.getMinutes()}`;
  } else {
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }
}

function Contato(props: ContatoProps): JSX.Element {
  const conversandoComId = useSelector(
    (state: RootState) => state.conversa.comUsuario.id
  );
  const dispatch = useDispatch();

  function conversar(): void {
    if (conversandoComId !== props.id) {
      dispatch(reducers.conversa.mudarFoco());
    }

    dispatch(
      reducers.conversa.conversarCom({ id: props.id, nome: props.nome })
    );
  }

  function formatarUltimaMensagem(): string {
    let ultimaMensagem = props.ultimaMensagem;
    if (props.id === conversandoComId) {
      ultimaMensagem = `${props.nome}: ${ultimaMensagem}`;
    }
    return ultimaMensagem;
  }

  return (
    <div className="contato" onClick={conversar}>
      <img src={icone} alt="icone" className="icone-usuario"></img>
      <div className="contato-conteudo">
        <div className="contato-nome">{props.nome}</div>
        <div className="ultima-mensagem">{formatarUltimaMensagem()}</div>
      </div>
      <div className="ultima-mensagem-enviada-em">
        {formatarData(props.utlimaMensagemEnviadaEm)}
      </div>
    </div>
  );
}

export default Contato;
