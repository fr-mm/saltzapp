export default class UltimaMensagem {
  readonly enviadaEm: Date;

  constructor(
    readonly contatoId: string,
    readonly contatoNome: string,
    readonly texto: string,
    enviadaEm: string
  ) {
    this.enviadaEm = new Date(enviadaEm);
  }
}
