'use strict';
import { Model } from 'sequelize';
import SuitAttributes from '../src/core/entities/Suit';

class Suit extends Model<SuitAttributes> implements SuitAttributes {
  id!: number;
  name!: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  const { INTEGER, STRING } = DataTypes;
  Suit.init(
    {
      id: {
        type: INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new STRING(128),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'suit',
      tableName: 'Suit',
      timestamps: false,
    },
  );
  return Suit;
};

export default Suit;
