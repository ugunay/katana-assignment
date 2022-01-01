'use strict';
import { Model } from 'sequelize';
import CardAttributes from '../src/core/entities/Card';

class Card extends Model<CardAttributes> implements CardAttributes {
  id!: number;
  value!: string;
  suitId!: number;
  code!: string;
  inShortlist!: boolean;

  static associate(models: any) {
    Card.belongsTo(models.suit, { foreignKey: 'suitId' });
    Card.hasMany(models.deckCard);
  }
}
module.exports = (sequelize: any, DataTypes: any) => {
  const { BOOLEAN, STRING, INTEGER } = DataTypes;

  Card.init(
    {
      id: {
        type: INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      value: {
        type: new STRING(10),
        allowNull: false,
      },
      suitId: {
        type: new INTEGER(),
        allowNull: false,
      },
      code: {
        type: new STRING(3),
        allowNull: false,
        unique: true,
      },
      inShortlist: {
        type: new BOOLEAN(),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'card',
      tableName: 'Card',
      timestamps: false,
    },
  );
  return Card;
};

export default Card;
