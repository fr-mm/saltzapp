export default class UltimaMensagem {
  readonly enviadaEm: Date;

  constructor(
    readonly id: string,
    readonly contatoId: string,
    readonly contatoNome: string,
    readonly texto: string,
    enviadaEm: string
  ) {
    this.enviadaEm = new Date(enviadaEm);
  }
}
