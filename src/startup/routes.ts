import { Router } from 'express';
import {
  createDeck,
  openDeck,
  drawDeck,
} from '../controllers/DeckController';
import asyncMiddleware from '../middleware/async';

const router = Router();

router.post('/api/deck', asyncMiddleware(createDeck));

router.put('/api/deck/:id/open', asyncMiddleware(openDeck));

router.put('/api/deck/:id/draw', asyncMiddleware(drawDeck));

export { router };
