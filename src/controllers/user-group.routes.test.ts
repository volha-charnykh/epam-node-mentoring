import { UserGroupRoutes } from './user-group.routes';

jest.mock('../services', () => ({
  UserGroupService: {
    getGroupWithUsersById: jest.fn(),
    getUserWithGroupsById: jest.fn(),
    addUsersToGroup: jest.fn(),
  }
}));

import { UserGroupService } from '../services';

describe('UserGroupRoutes', () => {

  const users = [{
    id: 1,
    login: 'User1'
  }, {
    id: 2,
    login: 'User2'
  }, {
    id: 3,
    login: 'User3'
  }];

  const groups = [{
    id: 1,
    name: 'Group1'
  }, {
    id: 2,
    name: 'Group2'
  }, {
    id: 3,
    name: 'Group3'
  }];

  let req: any = {};
  const res: any = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);

  describe('getGroupWithUsersById', () => {

    beforeEach(() => {
      req = { params: { id: groups[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserGroupService.getGroupWithUsersById and response json', (done) => {
      let groupWithUsers = { ...groups[0], users };
      (UserGroupService.getGroupWithUsersById as any).mockReturnValueOnce(Promise.resolve(groupWithUsers));

      UserGroupRoutes.getGroupWithUsersById(req, res).then(() => {
        expect(UserGroupService.getGroupWithUsersById).toHaveBeenCalledWith(groupWithUsers.id);
        expect(res.json).toHaveBeenCalledWith(groupWithUsers);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (UserGroupService.getGroupWithUsersById as any).mockReturnValueOnce(Promise.resolve(null));

      UserGroupRoutes.getGroupWithUsersById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserGroupService.getGroupWithUsersById as any).mockReturnValueOnce(Promise.reject(error));

      UserGroupRoutes.getGroupWithUsersById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('getUserWithGroupsById', () => {

    beforeEach(() => {
      req = { body: users[0], params: { id: users[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserGroupService.getUserWithGroupsById and response json', (done) => {
      let userWithGroups = { ...users[0], groups };
      (UserGroupService.getUserWithGroupsById as any).mockReturnValueOnce(Promise.resolve(userWithGroups));

      UserGroupRoutes.getUserWithGroupsById(req, res).then(() => {
        expect(UserGroupService.getUserWithGroupsById).toHaveBeenCalledWith(userWithGroups.id);
        expect(res.json).toHaveBeenCalledWith(userWithGroups);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (UserGroupService.getUserWithGroupsById as any).mockReturnValueOnce(Promise.resolve(null));

      UserGroupRoutes.getUserWithGroupsById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserGroupService.getUserWithGroupsById as any).mockReturnValueOnce(Promise.reject(error));

      UserGroupRoutes.getUserWithGroupsById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('addUsersToGroup', () => {

    beforeEach(() => {
      req = { params: { id: groups[0].id }, body: users };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserGroupService.addUsersToGroup and response json', (done) => {
      let groupWithUsers = { ...groups[0], users };
      (UserGroupService.addUsersToGroup as any).mockReturnValueOnce(Promise.resolve(groupWithUsers));

      UserGroupRoutes.addUsersToGroup(req, res).then(() => {
        expect(UserGroupService.addUsersToGroup).toHaveBeenCalledWith(groups[0].id, users);
        expect(res.json).toHaveBeenCalledWith(groupWithUsers);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (UserGroupService.addUsersToGroup as any).mockReturnValueOnce(Promise.resolve(null));

      UserGroupRoutes.addUsersToGroup(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserGroupService.addUsersToGroup as any).mockReturnValueOnce(Promise.reject(error));

      UserGroupRoutes.addUsersToGroup(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });
});

