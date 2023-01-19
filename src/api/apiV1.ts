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

  public async fazerLogin(nome: string, senha: string) {
    const response = await this.fetch("token/", "POST", {
      username: "chico",
      password: "123456789",
    });
    const r = await response.json();
    console.log(r);
  }

  public async cadastrarUsuario(nome: string, senha: string) {
    const response = await this.fetch("usuarios/", "POST", {
      nome: "chico",
      senha: "123456789",
    });
  }
}

export default ApiV1;
