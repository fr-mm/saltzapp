import { Mensagem, UltimaMensagem, Usuario } from "../entidades";
import { ServidorInacessivelErro, UsuarioOuSenhaInvalido } from "../erros";

class RetornoDeMensagens {
  constructor(
    readonly mensagens: Mensagem[],
    readonly ultimasMensagens: UltimaMensagem[]
  ) {}
}

class Rota {
  public static readonly ping = "ping/";
  public static readonly login = "login/";
  public static readonly usuarios = "usuarios/";
  public static readonly mensagens = "mensagens/";

  public static usuario(id: string, outroUsuarioId?: string): string {
    const complemento =
      outroUsuarioId !== undefined ? "/" + outroUsuarioId : "";
    return this.usuarios + id + complemento;
  }

  public static ultimasMensagens(usuarioId: string): string {
    return Rota.usuario(usuarioId);
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
  readonly URL_BASE =
    "https://f590-2804-14d-7283-80c5-b1e4-29c3-1ea3-3248.sa.ngrok.io";

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

  public async cadastrarUsuario(nome: string, senha: string): Promise<Usuario> {
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
        const body = await response.json();
        return new Usuario(body["id"], body["nome"], body["token"]);
      case 400:
        const texto = await response.json();
        throw new UsuarioOuSenhaInvalido(texto);
      default:
        throw new ServidorInacessivelErro();
    }
  }

  public async trazerUltimasMensagens(
    usuarioId: string
  ): Promise<UltimaMensagem[]> {
    const response = await this.fetch({
      rota: Rota.ultimasMensagens(usuarioId),
    });
    switch (response.status) {
      case 200:
        const body = await response.json();
        const ultimasMensagens = [];
        for (let otd of body) {
          const ultimaMensagem = new UltimaMensagem(
            otd["id"],
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
  ): Promise<RetornoDeMensagens> {
    const response = await this.fetch({
      rota: Rota.usuario(usuarioId, outroUsuarioId),
    });
    switch (response.status) {
      case 200:
        const body = await response.json();
        const mensagens = [];
        for (let otd of body["mensagens"]) {
          const mensagem = new Mensagem(
            otd["id"],
            otd["origem_id"],
            otd["destino_id"],
            otd["texto"],
            otd["enviada_em"]
          );
          mensagens.push(mensagem);
        }
        const ultimasMensagens = [];
        for (let otd of body["ultimas_mensagens"]) {
          const ultimaMensagem = new UltimaMensagem(
            otd["id"],
            otd["id_outro_usuario"],
            otd["nome_outro_usuario"],
            otd["texto"],
            otd["enviada_em"]
          );
          ultimasMensagens.push(ultimaMensagem);
        }
        return new RetornoDeMensagens(mensagens, ultimasMensagens);
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
