import express from 'express';
import error from '../middleware/error';
import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);
app.use(error);

export { app };
