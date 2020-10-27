import { GroupRoutes } from './group.routes';

jest.mock('../services', () => ({
  GroupService: {
    createGroup: jest.fn(),
    updateGroup: jest.fn(),
    getGroupById: jest.fn(),
    getAllGroups: jest.fn(),
    deleteGroup: jest.fn()
  }
}));

import { GroupService } from '../services';

describe('GroupRoutes', () => {

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

  describe('create', () => {

    beforeEach(() => {
      req = { body: groups[0] };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call GroupService.createGroup, response status and json', (done) => {
      (GroupService.createGroup as any).mockReturnValueOnce(Promise.resolve(groups[0]));

      GroupRoutes.create(req, res).then(() => {
        expect(GroupService.createGroup).toHaveBeenCalledWith(groups[0]);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(groups[0]);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (GroupService.createGroup as any).mockReturnValueOnce(Promise.resolve(null));

      GroupRoutes.create(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (GroupService.createGroup as any).mockReturnValueOnce(Promise.reject(error));

      GroupRoutes.create(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('update', () => {

    beforeEach(() => {
      req = { body: groups[0], params: { id: groups[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call GroupService.updateGroup and response json', (done) => {
      (GroupService.updateGroup as any).mockReturnValueOnce(Promise.resolve(groups[0]));

      GroupRoutes.update(req, res).then(() => {
        expect(GroupService.updateGroup).toHaveBeenCalledWith(groups[0].id, groups[0]);
        expect(res.json).toHaveBeenCalledWith(groups[0]);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (GroupService.updateGroup as any).mockReturnValueOnce(Promise.resolve(null));

      GroupRoutes.update(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (GroupService.updateGroup as any).mockReturnValueOnce(Promise.reject(error));

      GroupRoutes.update(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('getById', () => {

    beforeEach(() => {
      req = { params: { id: groups[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call GroupService.getGroupById and response json', (done) => {
      (GroupService.getGroupById as any).mockReturnValueOnce(Promise.resolve(groups[0]));

      GroupRoutes.getById(req, res).then(() => {
        expect(GroupService.getGroupById).toHaveBeenCalledWith(groups[0].id);
        expect(res.json).toHaveBeenCalledWith(groups[0]);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (GroupService.getGroupById as any).mockReturnValueOnce(Promise.resolve(null));

      GroupRoutes.getById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (GroupService.getGroupById as any).mockReturnValueOnce(Promise.reject(error));

      GroupRoutes.getById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('getAll', () => {

    beforeEach(() => {
      req = {  };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call GroupService.getAllGroups and response json', (done) => {
      (GroupService.getAllGroups as any).mockReturnValueOnce(Promise.resolve([groups[0]]));

      GroupRoutes.getAll(req, res).then(() => {
        expect(GroupService.getAllGroups).toHaveBeenCalled();
        expect(res.json).toHaveBeenCalledWith([groups[0]]);
        done();
      });
    });

    it('should call response json with empty array if null returned', (done) => {
      (GroupService.getAllGroups as any).mockReturnValueOnce(Promise.resolve(null));

      GroupRoutes.getAll(req, res).then(() => {
        expect(res.json).toHaveBeenCalledWith([]);
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (GroupService.getAllGroups as any).mockReturnValueOnce(Promise.reject(error));

      GroupRoutes.getAll(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('delete', () => {

    beforeEach(() => {
      req = { params: { id: groups[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call GroupService.deleteGroup and response json', (done) => {
      (GroupService.deleteGroup as any).mockReturnValueOnce(Promise.resolve(true));

      GroupRoutes.delete(req, res).then(() => {
        expect(GroupService.deleteGroup).toHaveBeenCalledWith(groups[0].id);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status if null returned', (done) => {
      (GroupService.deleteGroup as any).mockReturnValueOnce(Promise.resolve(null));

      GroupRoutes.delete(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (GroupService.deleteGroup as any).mockReturnValueOnce(Promise.reject(error));

      GroupRoutes.delete(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });
});

