import Deck from '../entities/Deck';
import OpenDeckDTO from '../dtos/OpenDeckDTO';
import CreateDeckDTO from '../dtos/CreateDeckDTO';
import DrawDeckDTO from '../dtos/DrawDeckDTO';

interface DeckRepository {
  create(deck: Deck): Promise<CreateDeckDTO>;
  open(deckId: string): Promise<OpenDeckDTO>;
  drawCard(deckId: string, count: number): Promise<DrawDeckDTO>;
}

export default DeckRepository;
