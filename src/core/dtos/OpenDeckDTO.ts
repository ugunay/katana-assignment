import CardDTO from './CardDTO';
import CreateDeckDTO from './CreateDeckDTO';

export default interface OpenDeckDTO extends CreateDeckDTO {
  cards: CardDTO[];
}
