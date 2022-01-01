import request from 'supertest';
import db from '../../models';
import server from '../../src/index';

describe('/api/deck', () => {
  beforeAll(async () => {
    await db.sequelize.sync();
  });

  afterAll(async () => {
    await db.sequelize.close();
    await server.close();
  });

  describe('CREATE (POST)', () => {
    it('should create a full deck', async () => {
      const res = await request(server).post('/api/deck').send({
        type: 'full',
        shuffled: true,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('deckId');
      expect(res.body.type).toEqual('FULL');
      expect(res.body.shuffled).toEqual(true);
      expect(res.body.remaining).toEqual(52);
    });

    it('should create a short deck', async () => {
      const res = await request(server).post('/api/deck').send({
        type: 'short',
        shuffled: true,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('deckId');
      expect(res.body.type).toEqual('SHORT');
      expect(res.body.shuffled).toEqual(true);
      expect(res.body.remaining).toEqual(32);
    });

    let deckId = '';
    it('should shuffle the cards', async () => {
      const createResult = await request(server).post('/api/deck').send({
        type: 'full',
        shuffled: false,
      });
      deckId = createResult.body.deckId;
      const cardCountToDraw = 4;
      const drawResult = await request(server)
        .put(`/api/deck/${deckId}/draw/?count=${cardCountToDraw}`)
        .send();
      const codes = drawResult.body.cards.map((item: any) => item.code);
      expect(
        codes[0] === 'AS' &&
          codes[1] === '1S' &&
          codes[2] === '2S' &&
          codes[3] === '3S',
      ).toBeFalsy;
    });

    it('should not shuffle the cards', async () => {
      const createResult = await request(server).post('/api/deck').send({
        type: 'full',
        shuffled: false,
      });
      deckId = createResult.body.deckId;
      const cardCountToDraw = 4;
      const drawResult = await request(server)
        .put(`/api/deck/${deckId}/draw/?count=${cardCountToDraw}`)
        .send();
      const codes = drawResult.body.cards.map((item: any) => item.code);
      expect(codes[0]).toBe('AS');
      expect(codes[1]).toBe('2S');
      expect(codes[2]).toBe('3S');
      expect(codes[3]).toBe('4S');
    });

    it('should include distinct cards', async () => {
      const createResult = await request(server).post('/api/deck').send({
        type: 'full',
        shuffled: false,
      });
      deckId = createResult.body.deckId;
      const cardCountToDraw = 52;
      const drawResult = await request(server)
        .put(`/api/deck/${deckId}/draw/?count=${cardCountToDraw}`)
        .send();
      const codes = drawResult.body.cards.map((item: any) => item.code);
      expect(new Set(codes).size === codes.length).toBeTruthy();
    });
  });

  describe('OPEN (PUT)', () => {
    let deckId = '';
    it('should open', async () => {
      const createResult = await request(server).post('/api/deck').send({
        type: 'full',
        shuffled: true,
      });
      deckId = createResult.body.deckId;
      const openResult = await request(server)
        .put(`/api/deck/${deckId}/open`)
        .send();
      expect(openResult.statusCode).toEqual(200);
      expect(openResult.body).toHaveProperty('deckId');
      expect(openResult.body.type).toEqual('FULL');
      expect(openResult.body.shuffled).toEqual(true);
      expect(openResult.body.remaining).toEqual(52);
      expect(openResult.body.cards.length).toEqual(52);
    });
  });

  describe('DRAW (PUT)', () => {
    let deckId = '';
    it('should draw', async () => {
      const createResult = await request(server).post('/api/deck').send({
        type: 'short',
        shuffled: true,
      });
      deckId = createResult.body.deckId;
      const cardCountToDraw = 10;
      const drawResult = await request(server)
        .put(`/api/deck/${deckId}/draw/?count=${cardCountToDraw}`)
        .send();
      expect(drawResult.body.cards.length).toEqual(cardCountToDraw);
      const openResult = await request(server)
        .put(`/api/deck/${deckId}/open`)
        .send();
      expect(openResult.statusCode).toEqual(200);
      expect(openResult.body).toHaveProperty('deckId');
      expect(openResult.body.type).toEqual('SHORT');
      expect(openResult.body.shuffled).toEqual(true);
      expect(openResult.body.remaining).toEqual(22);
      expect(openResult.body.cards.length).toEqual(22);
    });
    it('should draw in order', async () => {
      const createResult = await request(server).post('/api/deck').send({
        type: 'full',
        shuffled: false,
      });
      deckId = createResult.body.deckId;
      let cardCountToDraw = 3;
      let drawResult = await request(server)
        .put(`/api/deck/${deckId}/draw/?count=${cardCountToDraw}`)
        .send();
      expect(drawResult.body.cards.length).toEqual(cardCountToDraw);
      cardCountToDraw = 1;
      drawResult = await request(server)
        .put(`/api/deck/${deckId}/draw/?count=${cardCountToDraw}`)
        .send();
        expect(drawResult.body.cards[0].value).toEqual("4");

    });
  });
});
