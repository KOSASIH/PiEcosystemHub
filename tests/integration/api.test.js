// tests/integration/api.test.js

const request = require('supertest');
const app = require('../../src/app'); // Your Express app
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('API Endpoints', () => {
    let userId;
    let token;

    beforeEach(async () => {
        // Clean up the database before each test
        await mongoose.connection.db.dropDatabase();

        // Register a new user for testing
        const registerResponse = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'test@example.com', password: 'Password123!' });

        userId = registerResponse.body.user._id;

        // Login the user to get the token
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'Password123!' });

        token = loginResponse.body.token;
    });

    test('POST /api/users should create a new user', async () => {
        const response = await request(app)
            .post('/api/users')
            .send({ username: 'newuser', email: 'newuser@example.com', password: 'Password123!' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.email).toBe('newuser@example.com');
    });

    test('GET /api/users/:id should return a user', async () => {
        const response = await request(app).get(`/api/users/${userId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user._id).toBe(userId);
    });

    test('GET /api/users should return all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.users)).toBe(true);
    });

    test('POST /api/dapps should create a new dApp', async () => {
        const response = await request(app)
            .post('/api/dapps')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test dApp', description: 'A test decentralized application', url: 'http://testdapp.com', createdBy: userId });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('dApp');
        expect(response.body.dApp.name).toBe('Test dApp');
    });

    test('GET /api/dapps/:id should return a dApp', async () => {
        // Create a dApp to test the GET endpoint
        const dAppResponse = await request(app)
            .post('/api/dapps')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test dApp', description: 'A test decentralized application', url: 'http://testdapp.com', createdBy: userId });

        const dAppId = dAppResponse.body.dApp._id;

        const response = await request(app).get(`/api/dapps/${dAppId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('dApp');
        expect(response.body.dApp._id).toBe(dAppId);
    });

    test('GET /api/dapps should return all dApps', async () => {
        const response = await request(app)
            .get('/api/dapps')
            .set('Authorization', `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.dApps)).toBe(true);
    });

    test('GET /api/dapps should return 401 if no token is provided', async () => {
        const response = await request(app).get('/api/dapps');
        expect(response.status).toBe(401); // Unauthorized
    });
});
