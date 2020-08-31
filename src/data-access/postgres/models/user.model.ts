import { BOOLEAN, INTEGER, STRING, UUIDV4, UUID } from 'sequelize';
import sequelize from '../connector';
import * as bcrypt from 'bcrypt';

export const UserModel = sequelize.define('user', {
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

const predefinedUsers = Array.from(Array(20).keys()).map(el => ({
  login: `user${el}@test.com`,
  password: 'pass123',
  age: 30
}));

UserModel
  .sync({ force: true })
  .then(() =>
    Promise
      .all(predefinedUsers
        .map(user =>
          bcrypt.hash(user.password, 10)
            .then((hashedPassword) =>
              UserModel.create({
                login: user.login,
                password: hashedPassword,
                age: user.age
              }))
        )
      )
  );
