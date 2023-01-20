export default class Mensagem {
  readonly enviadaEm: Date;
  constructor(
    readonly origemId: string,
    readonly destinoId: string,
    readonly texto: string,
    enviadaEm: string
  ) {
    this.enviadaEm = new Date(enviadaEm);
  }
}
