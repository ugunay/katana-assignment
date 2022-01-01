import db from '../../models';
import CardDTO from '../core/dtos/CardDTO';
import CreateDeckDTO from '../core/dtos/CreateDeckDTO';
import OpenDeckDTO from '../core/dtos/OpenDeckDTO';
import Deck from '../core/entities/Deck';
import { DeckType } from '../core/enums/DeckType';

import DeckRepository from '../core/repositories/DeckRepository';
import _ from 'lodash';
import DrawDeckDTO from '../core/dtos/DrawDeckDTO';

class KatanaDbContext implements DeckRepository {

  private getCardIdsForCreation = async (deck: Deck) => {
    const where =
      deck.type === DeckType.SHORT
        ? {
            inShortlist: 'true',
          }
        : {};
    const cards = await db.card.findAll({
      attributes: ['id'],
      where,
      raw: true,
    });
    let cardIds: number[] = cards.map((item: any) => item.id);
    if (deck.shuffled) {
      cardIds = _.shuffle(cardIds);
    }
    return cardIds;
  };

  private getDeckCardsForCreation = (deckId: string, cardIds: number[]) => {
    return cardIds.map((cardId: number, index) => ({
      deckId,
      cardId: cardId,
      rank: index + 1,
      drawn: false,
    }));
  };

  public async create(deck: Deck): Promise<CreateDeckDTO> {
    deck.type = deck.type.toUpperCase();
    const cardIds = await this.getCardIdsForCreation(deck);
    return await db.sequelize.transaction(async (t: any) => {
      const { id, type, shuffled } = await db.deck.create(deck, { transaction: t });
      const deckCards = this.getDeckCardsForCreation(id, cardIds);
      await db.deckCard.bulkCreate(deckCards, { transaction: t });
      return { deckId: id, type, shuffled, remaining: cardIds.length };
    });
  }

  private getDeckCardsToOpen = async (deckId: string) => {
    return db.deckCard.findAll({
      attributes: [
        'deck.type',
        'deck.shuffled',
        'card.value',
        'card.code',
        'card.suit.name',
      ],
      where: { deckId: deckId, drawn: false },
      order: [['rank', 'ASC']],
      raw: true,
      include: [{ model: db.card, include: { model: db.suit } }, db.deck],
    });
  };

  public async open(deckId: string): Promise<OpenDeckDTO> {
    const deckCardsToOpen = await this.getDeckCardsToOpen(deckId);
    if (!deckCardsToOpen.length) throw new Error('No cards to open!');
    const cardDtos: CardDTO[] = deckCardsToOpen.map((item: any) => ({
      value: item.value,
      suit: item.name,
      code: item.code,
    }));
    const { type, shuffled } = deckCardsToOpen[0];
    await db.deckCard.update({ drawn: true }, { where: { deckId: deckId } });
    return {
      deckId,
      type,
      shuffled,
      remaining: cardDtos.length,
      cards: cardDtos,
    } as OpenDeckDTO;
  }

  private getDeckCardsToDraw = async (deckId: string, count: number) => {
    return db.deckCard.findAll({
      attributes: ['card.id', 'card.value', 'card.code', 'card.suit.name'],
      where: { deckId: deckId, drawn: false },
      order: [['rank', 'ASC']],
      raw: true,
      include: [{ model: db.card, include: { model: db.suit } }],
      limit: count,
    });
  };

  public async drawCard(deckId: string, count: number): Promise<DrawDeckDTO> {
    const deckCardsToDraw = await this.getDeckCardsToDraw(deckId, count);
    if (!deckCardsToDraw.length) throw new Error('No cards to draw!');
    const cardIds: number[] = deckCardsToDraw.map((item: any) => item.id);
    await db.deckCard.update(
      { drawn: true },
      { where: { deckId: deckId, cardId: cardIds } },
    );
    const cards =  deckCardsToDraw.map((item: any) => ({
      value: item.value,
      suit: item.name,
      code: item.code,
    }));
    return {cards: cards};
  }
}

export default KatanaDbContext;
