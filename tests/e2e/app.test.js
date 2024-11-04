// tests/e2e/app.test.js

const request = require('supertest');
const app = require('../../src/app'); // Your Express app
const mongoose = require('mongoose');

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('End-to-End Application Tests', () => {
    test('User  registration and login flow', async () => {
        // Register a new user
        const registerResponse = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'test@example.com', password: 'Password123!' });

        expect(registerResponse.status).toBe(201);
        expect(registerResponse.body).toHaveProperty('user');

        // Login the user
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'Password123!' });

        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toHaveProperty('token');
    });

    test('Create and retrieve a dApp', async () => {
        // Register a new user
        const registerResponse = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'test@example.com', password: 'Password123!' });

        const userId = registerResponse.body.user._id;

        // Login the user to get the token
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'Password123!' });

        const token = loginResponse.body.token;

        // Create a new dApp
        const dAppResponse = await request(app)
            .post('/api/dapps')
            .set('Authorization', `Bearer ${token}`)
            .send({ name: 'Test dApp', description: 'A test decentralized application', url: 'http://testdapp.com', createdBy: userId });

        expect(dAppResponse.status).toBe(201);
        expect(dAppResponse.body).toHaveProperty('dApp');

        // Retrieve the dApp
        const getDAppResponse = await request(app).get(`/api/dapps/${dAppResponse.body.dApp._id}`);
        expect(getDAppResponse.status).toBe(200);
        expect(getDAppResponse.body).toHaveProperty('dApp');
        expect(getDAppResponse.body.dApp._id).toBe(dAppResponse.body.dApp._id);
    });

    test('User  should not be able to access protected routes without a token', async () => {
        const response = await request(app).get('/api/dapps');
        expect(response.status).toBe(401); // Unauthorized
    });

    test('User  should be able to access protected routes with a valid token', async () => {
        // Register a new user
        const registerResponse = await request(app)
            .post('/api/users')
            .send({ username: 'testuser', email: 'test@example.com', password: 'Password123!' });

        // Login the user to get the token
        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({ email: 'test@example.com', password: 'Password123!' });

        const token = loginResponse.body.token;

        // Access protected route
        const protectedResponse = await request(app)
            .get('/api/dapps')
            .set('Authorization', `Bearer ${token}`);

        expect(protectedResponse.status).toBe(200);
        expect(Array.isArray(protectedResponse.body.dApps)).toBe(true);
    });
});
