import "./Contato.css";
import icone from "../../static/icone-usuario.png";

function Contato(): JSX.Element {
  return (
    <div className="contato">
      <img src={icone} alt="icone" className="icone-usuario"></img>
      <div className="contato-conteudo">
        <div className="contato-nome">nome</div>
        <div className="ultima-mensagem">mensagem</div>
      </div>
      <div className="ultima-mensagem-enviada-em">10:30</div>
    </div>
  );
}

export default Contato;
