import Usuario from "../entidades/usuario";
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
}

export default ApiV1;
