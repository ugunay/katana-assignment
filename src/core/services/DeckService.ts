import DeckRepository from '../repositories/DeckRepository';
import DeckEntity from '../entities/Deck';
import CardDTO from '../dtos/CardDTO';
import OpenDeckDTO from '../dtos/OpenDeckDTO';
import CreateDeckDTO from '../dtos/CreateDeckDTO';
import DrawDeckDTO from '../dtos/DrawDeckDTO';

class DeckService implements DeckRepository {
  deckRepository: DeckRepository;

  constructor(deckRepository: DeckRepository) {
    this.deckRepository = deckRepository;
  }

  async create(deck: DeckEntity): Promise<CreateDeckDTO> {
    try {
      return await this.deckRepository.create(deck);
    }
    catch {
      throw new Error('Deck cannot be created.');
    }
  }

  async open(deckId: string): Promise<OpenDeckDTO> {
    try {
      return await this.deckRepository.open(deckId);
    }
    catch {
      throw new Error('Deck cannot be opened.');
    }
  }

  async drawCard(deckId: string, count: number): Promise<DrawDeckDTO> {
    try {
      return await this.deckRepository.drawCard(deckId, count);
    }
    catch {
      throw new Error('Deck cannot be drawed.');
    }
  }
}
export default DeckService;
