import { Group } from '../../../models';
import { GroupModel } from '../models';

export const GroupDao = {
  async create(group: Group): Promise<Group | null> {
    return await GroupModel.create({
      name: group.name,
      permissions: group.permissions
    });
  },

  async getById(id: string): Promise<Group | null> {
    return await GroupModel.findByPk(id);
  },

  async getAll(): Promise<Group[]> {
    return await GroupModel.findAll(
      {
        order: ['name']
      });
  },

  async update(id: string, group: Group): Promise<Group | null> {
    return await GroupModel.update(
      {
        name: group.name,
        permissions: group.permissions
      },
      { where: { id }, returning: true })
      .then(([n, data]: [number, Group[]]) => n === 1 ? data[0] : null);
  },

  async delete(id: string): Promise<boolean> {
    return await GroupModel.destroy({ where: { id } })
      .then((n: number) => n === 1);
  },
};

