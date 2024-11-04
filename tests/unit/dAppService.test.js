// tests/unit/dAppService.test.js

const dAppService = require('../../src/services/dAppService');
const dApp = require('../../src/models/dApp');

jest.mock('../../src/models/dApp');

describe('dApp Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a new dApp', async () => {
        const dAppData = { name: 'Test dApp', description: 'A test decentralized application', url: 'http://testdapp.com', createdBy: 'userId' };
        dApp.prototype.save = jest.fn().mockResolvedValue(dAppData);

        const createdDApp = await dAppService.createDApp(dAppData);
        expect(createdDApp).toEqual(dAppData);
        expect(dApp.prototype.save).toHaveBeenCalled();
    });

    test('should find a dApp by name', async () => {
        const dAppData = { name: 'Test dApp', description: 'A test decentralized application', url: 'http://testdapp.com', createdBy: 'userId' };
        dApp.findOne = jest.fn().mockResolvedValue(dAppData);

        const foundDApp = await dAppService.findDAppByName('Test dApp');
        expect(foundDApp).toEqual(dAppData);
        expect(dApp.findOne).toHaveBeenCalledWith({ name: 'Test dApp' });
    });

    test('should throw an error if dApp not found', async () => {
        dApp.findOne = jest.fn().mockResolvedValue(null);

        await expect(dAppService.findDAppByName('Not Found dApp')).rejects.toThrow('dApp not found');
    });
});
