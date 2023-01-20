export default class Formatar {
  private static ehHoje(data: Date): boolean {
    const hoje = new Date();
    return (
      data.getFullYear() === hoje.getFullYear() &&
      data.getMonth() === hoje.getMonth() &&
      data.getDate() === hoje.getDate()
    );
  }

  public static data(data: Date): string {
    if (Formatar.ehHoje(data)) {
      return `${data.getHours()}:${data.getMinutes()}`;
    } else {
      return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
    }
  }
}
