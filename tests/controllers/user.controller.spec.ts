import { Request, Response, NextFunction } from 'express';
import userService from '../../services/user.service';
import userController from '../../controllers/user.controller';

describe('User Controller', () => {
    let req: Request;
    let res: Response;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {
                name: 'John Doe',
            },
        } as Request;
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;
        next = jest.fn() as NextFunction;
    });

    describe('addUser', () => {
        it('should add a new user', async () => {
            userService.addUser = jest.fn().mockReturnValue({
                success: true,
                data: {
                    id: 1,
                    name: 'John Doe',
                },
            });

            await userController.addUser(req, res, next);

            expect(userService.addUser).toHaveBeenCalledWith({
                name: 'John Doe',
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                status: 200,
                data: {
                    id: 1,
                    name: 'John Doe',
                },
            });
        });
        it('should return 400 if user is not added', async () => {
            userService.addUser = jest.fn().mockReturnValue({
                success: false,
            });

            await userController.addUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                status: 400,
                message: 'Bad Request',
            });
        });
        it('should return 500 if error occurs', async () => {
            userService.addUser = jest.fn().mockImplementation(() => {
                throw new Error('error');
            });

            await userController.addUser(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error('error'));
        });
    });

    describe('getUser', () => {
        it('should get a user by ID', async () => {
            userService.getUser = jest.fn().mockReturnValue({
                id: 1,
                name: 'John Doe',
            });

            req.params = {
                userid: '1',
            };

            await userController.getUser(req, res, next);

            expect(userService.getUser).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                status: 200,
                data: {
                    id: 1,
                    name: 'John Doe',
                },
            });
        });
        it('should return 404 if user is not found', async () => {
            userService.getUser = jest.fn().mockReturnValue(null);

            req.params = {
                userid: '1',
            };

            await userController.getUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                status: 404,
                message: 'User not found',
            });
        });
        it('should return 500 if error occurs', async () => {
            userService.getUser = jest.fn().mockImplementation(() => {
                throw new Error('error');
            });

            req.params = {
                userid: '1',
            };

            await userController.getUser(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error('error'));
        });
    });

    describe('updateUser', () => {
        it('should update a user by ID', async () => {
            userService.updateUser = jest.fn().mockReturnValue({
                success: true,
            });

            req.params = {
                userid: '1',
            };
            req.body = {
                name: 'Jane Doe',
            };

            await userController.updateUser(req, res, next);

            expect(userService.updateUser).toHaveBeenCalledWith('1', {
                name: 'Jane Doe',
            });
            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                status: 204,
            });

        });
        it('should return 404 if user is not found', async () => {
            userService.updateUser = jest.fn().mockReturnValue({
                success: false,
            });

            req.params = {
                userid: '1',
            };
            req.body = {
                name: 'Jane Doe',
            };

            await userController.updateUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                status: 404,
                message: 'User not found',
            });
        });
        it('should return 500 if error occurs', async () => {
            userService.updateUser = jest.fn().mockImplementation(() => {
                throw new Error('error');
            });

            req.params = {
                userid: '1',
            };
            req.body = {
                name: 'Jane Doe',
            };

            await userController.updateUser(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error('error'));
        });
    });

    describe('deleteUser', () => {
        it('should delete a user by ID', async () => {
            userService.deleteUser = jest.fn().mockReturnValue({
                success: true,
            });
            req.params = {
                userid: '1',
            };
            await userController.deleteUser(req, res, next);

            expect(res.status).toHaveBeenCalledWith(204);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                status: 204,
            });
        });
        it('should return 404 if user is not found', async () => {
            userService.deleteUser = jest.fn().mockReturnValue({
                success: false,
            });
            req.params = {
                userid: '1',
            };
            await userController.deleteUser(req, res, next);

            expect(userService.deleteUser).toHaveBeenCalledWith('1');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                status: 404,
                message: 'User not found',
            });
        });
        it('should return 500 if error occurs', async () => {
            userService.deleteUser = jest.fn().mockImplementation(() => {
                throw new Error('error');
            });
            req.params = {
                userid: '1',
            };
            await userController.deleteUser(req, res, next);

            expect(next).toHaveBeenCalledWith(new Error('error'));
        });
    });
});
