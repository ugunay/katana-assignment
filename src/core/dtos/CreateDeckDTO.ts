export default interface CreateDeckDTO {
  deckId: string;
  type: string;
  shuffled: boolean;
  remaining: number;
}
