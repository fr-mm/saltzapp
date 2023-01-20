import { Contato } from "../../contato";
import "./Chat.css";

function Chat(): JSX.Element {
  return (
    <div className="chat-container">
      <div className="contatos">
        <Contato></Contato>
        <Contato></Contato>
        <Contato></Contato>
        <Contato></Contato>
      </div>
    </div>
  );
}

export default Chat;
