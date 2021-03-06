import { BOOLEAN, INTEGER, Model, ModelCtor, STRING, UUID, UUIDV4 } from 'sequelize';
import { User } from '../../../models';
import sequelize from '../connector';

type UserModelType = User & Model<User, Partial<User>>;

export const UserModel: ModelCtor<UserModelType> = sequelize
  .define('user', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    login: {
      type: STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: STRING,
      allowNull: false
    },
    age: {
      type: INTEGER,
      allowNull: false,
      validate: { min: 4, max: 130 }
    },
    isDeleted: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

