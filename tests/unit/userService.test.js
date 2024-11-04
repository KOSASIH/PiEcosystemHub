// tests/unit/userService.test.js

const userService = require('../../src/services/userService');
const User = require('../../src/models/User');

jest.mock('../../src/models/User');

describe('User  Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new user', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123!' };
        User.prototype.save = jest.fn().mockResolvedValue(userData);

        const user = await userService.createUser (userData);
        expect(user).toEqual(userData);
        expect(User.prototype.save).toHaveBeenCalled();
    });

    test('should find a user by email', async () => {
        const userData = { username: 'testuser', email: 'test@example.com', password: 'Password123!' };
        User.findOne = jest.fn().mockResolvedValue(userData);

        const user = await userService.findUser ByEmail('test@example.com');
        expect(user).toEqual(userData);
        expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
    });

    test('should throw an error if user not found', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);

        await expect(userService.findUser ByEmail('notfound@example.com')).rejects.toThrow('User  not found');
    });
});
