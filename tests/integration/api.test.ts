import request from 'supertest';
import app from '../../src/app';

describe('Root endpoints', () => {
    let api: Express.Application;

    beforeAll(async () => {
        api = await app();
    });

    it('should respond to the GET method', async () => {
        const response = await request(api).get('/');

        expect(response.statusCode).toBe(200);
    });
});
