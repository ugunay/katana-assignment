'use strict';
import { Model, UUIDV4 } from 'sequelize';
import DeckAttributes from '../src/core/entities/Deck';

class Deck extends Model<DeckAttributes> implements DeckAttributes {
  id!: string;
  type!: string;
  shuffled!: boolean;

  static associate(models: any) {
    Deck.hasMany(models.deckCard);
  }
}

module.exports = (sequelize: any, DataTypes: any) => {
  const { BOOLEAN, UUID, ENUM } = DataTypes;

  Deck.init(
    {
      id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: new ENUM('FULL', 'SHORT'),
        allowNull: false,
      },
      shuffled: {
        type: new BOOLEAN(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'deck',
      tableName: 'Deck',
      timestamps: false,
    },
  );
  return Deck;
};

export default Deck;
