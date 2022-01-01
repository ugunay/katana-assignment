import DeckService from '../../../src/core/services/DeckService';
import Deck from '../../../src/core/entities/Deck';
import DeckRepository from '../../../src/core/repositories/DeckRepository';

describe('create', () => {
  test('should throw error if deck cannot be created', async () => {
    const mockRepository = jest.fn<DeckRepository, []>(() => {
      return {
        create: () => {
          throw new Error('Deck cannot be created.');
        },
        open: () => {
          throw new Error('Deck cannot be opened.');
        },
        drawCard: () => {
          throw new Error('Deck cannot be drawed.');
        },
      };
    });
    const deckService = new DeckService(new mockRepository());
    expect(async () => {
      await deckService.create({} as Deck);
    }).rejects.toThrowError();
    expect(async () => {
      await deckService.open('deck_id');
    }).rejects.toThrowError();
    expect(async () => {
      await deckService.drawCard('deck_id', 2);
    }).rejects.toThrowError();
  });
});
