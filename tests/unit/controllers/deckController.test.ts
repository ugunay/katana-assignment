import {
  createDeck,
  drawDeck,
} from '../../../src/controllers/DeckController';
import { getMockReq, getMockRes } from '@jest-mock/express';

import CreateDeckDTO from '../../../src/core/dtos/CreateDeckDTO';
import deckService from '../../../src/core/services';
import DrawDeckDTO from '../../../src/core/dtos/DrawDeckDTO';

describe('createDeck', () => {
  test('should 400 with invalid type', async () => {
    const req = getMockReq({ body: { type: 'invalid', shuffled: true } });
    const { res } = getMockRes();
    await createDeck(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('createDeck', () => {
  test('should 400 with invalid shuffled', async () => {
    const req = getMockReq({ body: { type: 'short', shuffled: 'invalid' } });
    const { res } = getMockRes();
    await createDeck(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('createDeck', () => {
  test('should run with case insensitive correct input', async () => {
    const req = getMockReq({ body: { type: 'short', shuffled: true } });
    const { res } = getMockRes();
    deckService.create = jest.fn().mockReturnValue({} as CreateDeckDTO);
    await createDeck(req, res);
    expect(deckService.create).toHaveBeenCalled();
  });
});

describe('drawDeck', () => {
  test('should 400 with count<=0', async () => {
    const req = getMockReq({ query: { count: 0 } });
    const { res } = getMockRes();
    await drawDeck(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('drawDeck', () => {
  test('should 400 with count as string', async () => {
    const req = getMockReq({ query: { count: '3gee' } });
    const { res } = getMockRes();
    await drawDeck(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

describe('drawDeck', () => {
  test('should run with correct input', async () => {
    const req = getMockReq({ query: { count: 2 } });
    const { res } = getMockRes();
    deckService.drawCard = jest.fn().mockReturnValue({} as DrawDeckDTO);
    await drawDeck(req, res);
    expect(deckService.drawCard).toHaveBeenCalled();
  });
});

