import { UserRoutes } from './user-routes';

jest.mock('../services', () => ({
  UserService: {
    createUser: jest.fn(),
    updateUser: jest.fn(),
    getUserById: jest.fn(),
    getAutoSuggestUsers: jest.fn(),
    markUserDeleted: jest.fn()
  }
}));

import { UserService } from '../services';

describe('UserRoutes', () => {

  const users = [{
    id: 1,
    login: 'User1'
  }, {
    id: 2,
    login: 'User2'
  }, {
    id: 3,
    login: 'User3'
  }, {
    id: 4,
    login: 'User4'
  }, {
    id: 5,
    login: 'User5'
  }];

  let req: any = {};
  const res: any = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);

  describe('create', () => {

    beforeEach(() => {
      req = { body: users[0] };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserService.createUser, response status and json', (done) => {
      (UserService.createUser as any).mockReturnValueOnce(Promise.resolve(users[0]));

      UserRoutes.create(req, res).then(() => {
        expect(UserService.createUser).toHaveBeenCalledWith(users[0]);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(users[0]);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (UserService.createUser as any).mockReturnValueOnce(Promise.resolve(null));

      UserRoutes.create(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserService.createUser as any).mockReturnValueOnce(Promise.reject(error));

      UserRoutes.create(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('update', () => {

    beforeEach(() => {
      req = { body: users[0], params: { id: users[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserService.updateUser and response json', (done) => {
      (UserService.updateUser as any).mockReturnValueOnce(Promise.resolve(users[0]));

      UserRoutes.update(req, res).then(() => {
        expect(UserService.updateUser).toHaveBeenCalledWith(users[0].id, users[0]);
        expect(res.json).toHaveBeenCalledWith(users[0]);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (UserService.updateUser as any).mockReturnValueOnce(Promise.resolve(null));

      UserRoutes.update(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserService.updateUser as any).mockReturnValueOnce(Promise.reject(error));

      UserRoutes.update(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('getById', () => {

    beforeEach(() => {
      req = { params: { id: users[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserService.getUserById and response json', (done) => {
      (UserService.getUserById as any).mockReturnValueOnce(Promise.resolve(users[0]));

      UserRoutes.getById(req, res).then(() => {
        expect(UserService.getUserById).toHaveBeenCalledWith(users[0].id);
        expect(res.json).toHaveBeenCalledWith(users[0]);
        done();
      });
    });

    it('should call response status and json if null returned', (done) => {
      (UserService.getUserById as any).mockReturnValueOnce(Promise.resolve(null));

      UserRoutes.getById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserService.getUserById as any).mockReturnValueOnce(Promise.reject(error));

      UserRoutes.getById(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('getAutoSuggestUsers', () => {

    beforeEach(() => {
      req = { query: { loginSubstring: users[0].login, limit: '3' } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserService.getAutoSuggestUsers and response json', (done) => {
      (UserService.getAutoSuggestUsers as any).mockReturnValueOnce(Promise.resolve([users[0]]));

      UserRoutes.getAutoSuggestUsers(req, res).then(() => {
        expect(UserService.getAutoSuggestUsers).toHaveBeenCalledWith(users[0].login, 3);
        expect(res.json).toHaveBeenCalledWith([users[0]]);
        done();
      });
    });

    it('should call response json with empty array if null returned', (done) => {
      (UserService.getAutoSuggestUsers as any).mockReturnValueOnce(Promise.resolve(null));

      UserRoutes.getAutoSuggestUsers(req, res).then(() => {
        expect(res.json).toHaveBeenCalledWith([]);
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserService.getAutoSuggestUsers as any).mockReturnValueOnce(Promise.reject(error));

      UserRoutes.getAutoSuggestUsers(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });

  describe('delete', () => {

    beforeEach(() => {
      req = { params: { id: users[0].id } };
      res.status.mockClear();
      res.json.mockClear();
    });

    it('should call UserService.markUserDeleted and response json', (done) => {
      (UserService.markUserDeleted as any).mockReturnValueOnce(Promise.resolve(true));

      UserRoutes.delete(req, res).then(() => {
        expect(UserService.markUserDeleted).toHaveBeenCalledWith(users[0].id);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status if null returned', (done) => {
      (UserService.markUserDeleted as any).mockReturnValueOnce(Promise.resolve(null));

      UserRoutes.delete(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalled();
        done();
      });
    });

    it('should call response status and json on error', (done) => {
      const error = { message: 'Error message' };
      (UserService.markUserDeleted as any).mockReturnValueOnce(Promise.reject(error));

      UserRoutes.delete(req, res).then(() => {
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: error.message });
        done();
      });
    });
  });
});

