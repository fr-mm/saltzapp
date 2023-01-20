export default class UltimaMensagem {
  readonly enviadaEm: Date;

  constructor(
    readonly id: string,
    readonly nome: string,
    readonly texto: string,
    enviadaEm: string
  ) {
    this.enviadaEm = new Date(enviadaEm);
  }
}
