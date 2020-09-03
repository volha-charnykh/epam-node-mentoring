import { ARRAY, ENUM, Model, ModelCtor, STRING, UUID, UUIDV4 } from 'sequelize';
import { Group, Permissions } from '../../../models';
import sequelize from '../connector';
import { UserModel } from './user.model';

type GroupModelType = Group & Model<Group, Partial<Group>>;

export const GroupModel: ModelCtor<GroupModelType> = sequelize
  .define('group', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: STRING,
      unique: true,
      allowNull: false
    },
    permissions: {
      type: ARRAY(ENUM({ values: [...Permissions] })),
      allowNull: false
    }
  });

GroupModel.belongsToMany(UserModel, {
  through: 'user-groups',
  as: 'users',
  targetKey: 'id',
  foreignKey: 'groupId'
});
UserModel.belongsToMany(GroupModel, {
  through: 'user-groups',
  as: 'groups',
  targetKey: 'id',
  foreignKey: 'userId'
});

