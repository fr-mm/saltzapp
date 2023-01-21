import { Mensagem, UltimaMensagem, Usuario } from "../entidades";
import { ServidorInacessivelErro, UsuarioOuSenhaInvalido } from "../erros";

interface UsuarioCriado {
  nome: string;
  senha: string;
}

class Rota {
  public static readonly ping = "ping/";
  public static readonly login = "login/";
  public static readonly usuarios = "usuarios/";
  public static readonly mensagens = "mensagens/";

  public static usuario(id: string, outroUsuarioId?: string) {
    const complemento =
      outroUsuarioId !== undefined ? outroUsuarioId + "/" : "";
    return this.usuarios + id + "/" + complemento;
  }
}

interface IFetch {
  rota: string;
  metodo?: string;
  payload?: any;
}

class ApiV1 {
  readonly url: string;
  readonly pingUrl: string;
  readonly URL_BASE = "https://eleven-worms-draw-179-215-242-196.loca.lt";

  constructor() {
    this.url = this.URL_BASE + "/api_v1/";
    this.pingUrl = this.url + Rota.ping;
  }

  private async fetch({ rota, metodo, payload }: IFetch) {
    return await fetch(`${this.url}${rota}`, {
      method: metodo,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }

  public async fazerLogin(nome: string, senha: string): Promise<Usuario> {
    const response = await this.fetch({
      rota: Rota.login,
      metodo: "POST",
      payload: {
        username: nome,
        password: senha,
      },
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
    const response = await this.fetch({
      rota: Rota.usuarios,
      metodo: "POST",
      payload: {
        nome: nome,
        senha: senha,
      },
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
    const response = await this.fetch({ rota: Rota.usuario(usuarioId) });
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
    this.fetch({
      rota: Rota.mensagens,
      metodo: "POST",
      payload: {
        origem_id: origemId,
        destino_id: destinoId,
        texto,
      },
    });
  }

  public async trazerMensagens(
    usuarioId: string,
    outroUsuarioId: string
  ): Promise<Mensagem[]> {
    const response = await this.fetch({
      rota: Rota.usuario(usuarioId, outroUsuarioId),
    });
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

  public async localtunnelAcessivel(): Promise<boolean> {
    const response = await this.fetch({
      rota: Rota.ping,
    });
    return response.status === 200;
  }
}

export default ApiV1;
