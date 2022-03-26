import request from 'supertest';
import { testSetup, api } from './helpers';

describe('Root endpoints', () => {
    testSetup();

    it('should respond to the GET method', async () => {
        const { statusCode } = await request(api).get('/');

        expect(statusCode).toBe(200);
    });
});
