import "./Contato.css";
import icone from "../../static/icone-usuario.png";
import { useDispatch, useSelector } from "react-redux";
import { reducers, RootState } from "../../store";
import Formatar from "../../aux/formatar";

interface ContatoProps {
  id: string;
  nome: string;
  ultimaMensagem: string;
  utlimaMensagemEnviadaEm: Date;
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

  return (
    <div className="contato" onClick={conversar}>
      <img src={icone} alt="icone" className="icone-usuario"></img>
      <div className="contato-conteudo">
        <div className="contato-nome">{props.nome}</div>
        <div className="ultima-mensagem">{props.ultimaMensagem}</div>
      </div>
      <div className="ultima-mensagem-enviada-em">
        {Formatar.data(props.utlimaMensagemEnviadaEm)}
      </div>
    </div>
  );
}

export default Contato;
