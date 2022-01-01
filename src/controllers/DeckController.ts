import Joi from 'joi';
import { Response, Request } from 'express';
import deckService from '../core/services';
import { v4 as uuidv4 } from 'uuid';

const createSchema = Joi.object({
  type: Joi.string().case('upper').valid('FULL', 'SHORT').required(),
  shuffled: Joi.boolean(),
});

const createDeck = async (req: Request, res: Response) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const { type, shuffled } = req.body;
  const deckCreated = await deckService.create({ id: uuidv4(), type, shuffled });
  res.json(deckCreated);
};

const openDeck = async (req: Request, res: Response) => {
  const { id } = req.params;
  const openedCards = await deckService.open(id);
  res.json(openedCards);
};

const drawDeck = async (req: Request, res: Response) => {
  const { id } = req.params;
  const number = Joi.number();
  const { count } = req.query;
  const { error } = number.validate(count);
  if (error || parseInt(count as string) === 0) {
    res.status(400).send('Count should be a positive number');
    return;
  }
  const drawedCards = await deckService.drawCard(id, parseInt(count as string));
  res.json(drawedCards);
};

export { createDeck, openDeck, drawDeck };
