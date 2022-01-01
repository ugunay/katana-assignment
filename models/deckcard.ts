'use strict';

import { Model } from 'sequelize';
import DeckCardAttributes from '../src/core/entities/DeckCard';

class DeckCard extends Model<DeckCardAttributes> implements DeckCardAttributes {
  deckId!: string;
  cardId!: number;
  rank!: number;
  drawn!: boolean;
  static associate(models: any) {
    DeckCard.belongsTo(models.deck);
    DeckCard.belongsTo(models.card);
  }
}
module.exports = (sequelize: any, DataTypes: any) => {
  const { BOOLEAN, INTEGER, UUID } = DataTypes;
  DeckCard.init(
    {
      deckId: {
        type: UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Deck',
          key: 'id',
        },
      },
      cardId: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Card',
          key: 'id',
        },
      },
      rank: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
      },
      drawn: {
        type: BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'deckCard',
      tableName: 'DeckCard',
      timestamps: false,
    },
  );
  return DeckCard;
};

export default DeckCard;
