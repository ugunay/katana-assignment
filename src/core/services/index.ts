import KatanaDbContext from '../../persistence/KatanaDbContext';
import DeckService from './DeckService';

const katanaDbContext = new KatanaDbContext();
const deckService = new DeckService(katanaDbContext);

export default deckService;
