import { Mensagem, UltimaMensagem, Usuario } from "../entidades";
import { ServidorInacessivelErro, UsuarioOuSenhaInvalido } from "../erros";

interface UsuarioCriado {
  nome: string;
  senha: string;
}

class ApiV1 {
  private static url = "https://ten-laws-tell-179-215-242-196.loca.lt/api_v1/";

  private async fetch(rota: string, metodo?: string, payload?: any) {
    return await fetch(`${ApiV1.url}${rota}`, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  public async fazerLogin(nome: string, senha: string): Promise<Usuario> {
    const response = await this.fetch("login/", "POST", {
      username: nome,
      password: senha,
    });

    switch (response.status) {
      case 200:
        const body = await response.json();
        return new Usuario(body["id"], body["nome"], body["token"]);

      case 400:
        throw new UsuarioOuSenhaInvalido();

      default:
        throw new ServidorInacessivelErro();
    }
  }

  public async cadastrarUsuario(
    nome: string,
    senha: string
  ): Promise<UsuarioCriado> {
    const response = await this.fetch("usuarios/", "POST", {
      nome: nome,
      senha: senha,
    });

    switch (response.status) {
      case 201:
        return { nome: nome, senha: senha };
      case 400:
        throw new UsuarioOuSenhaInvalido();
      default:
        throw new ServidorInacessivelErro();
    }
  }

  public async trazerUltimasMensagens(
    usuarioId: string
  ): Promise<UltimaMensagem[]> {
    const response = await this.fetch("usuarios/" + usuarioId);
    switch (response.status) {
      case 200:
        const body = await response.json();
        const ultimasMensagens = [];
        for (let otd of body) {
          const ultimaMensagem = new UltimaMensagem(
            otd["id_outro_usuario"],
            otd["nome_outro_usuario"],
            otd["texto"],
            otd["enviada_em"]
          );
          ultimasMensagens.push(ultimaMensagem);
        }
        return ultimasMensagens;
      default:
        throw new ServidorInacessivelErro();
    }
  }

  public enviarMensagem(
    origemId: string,
    destinoId: string,
    texto: string
  ): void {
    this.fetch("mensagens/", "POST", {
      origem_id: origemId,
      destino_id: destinoId,
      texto,
    });
  }

  public async trazerMensagens(
    usuarioId: string,
    outroUsuarioId: string
  ): Promise<Mensagem[]> {
    const response = await this.fetch(
      "usuarios/" + usuarioId + "/" + outroUsuarioId
    );
    switch (response.status) {
      case 200:
        const body = await response.json();
        const mensagens = [];
        for (let otd of body) {
          const mensagem = new Mensagem(
            otd["origem_id"],
            otd["destino_id"],
            otd["texto"],
            otd["enviada_em"]
          );
          mensagens.push(mensagem);
        }
        return mensagens;
      default:
        throw new ServidorInacessivelErro();
    }
  }
}

export default ApiV1;
