import { Group } from '../../../models';
import { GroupModel } from '../models';

export const GroupDao = {
  create(group: Group): Promise<Group | null> {
    return GroupModel.create({
      name: group.name,
      permissions: group.permissions
    });
  },

  getById(id: string): Promise<Group | null> {
    return GroupModel.findByPk(id);
  },

  getAll(): Promise<Group[]> {
    return GroupModel.findAll(
      {
        order: ['name']
      });
  },

  update(id: string, group: Group): Promise<Group | null> {
    return GroupModel.update(
      {
        name: group.name,
        permissions: group.permissions
      },
      { where: { id }, returning: true })
      .then(([n, data]: [number, Group[]]) => n === 1 ? data[0] : null);
  },

  delete(id: string): Promise<boolean> {
    return GroupModel.destroy({ where: { id } })
      .then((n: number) => n === 1);
  },
};

