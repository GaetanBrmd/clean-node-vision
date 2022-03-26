import request from 'supertest';
import { testSetup, api } from './helpers';

describe('Products endpoints', () => {
    testSetup();

    it('returns 400 with empty product', async () => {
        const { body, statusCode } = await request(api)
            .post('/products')
            .send({});

        const missingKeys = body.errors.flatMap(
            (e: { path: string[] }) => e.path
        );

        expect(statusCode).toBe(400);
        expect(missingKeys).toEqual(['name', 'price', 'weight']);
    });

    it('returns 201', async () => {
        const product = { name: 'tshirt', price: 20, weight: 0.1 };
        const { statusCode, headers } = await request(api)
            .post('/products')
            .send(product);

        expect(statusCode).toBe(201);
        expect(headers['location']).toMatch(/products\/.+/);
    });

    it('returns all products', async () => {
        const { body } = await request(api).get('/products').send();

        // console.log(body);
    });

    it('returns 400 if id is not a valid string', async () => {
        const { statusCode } = await request(api).get('/products/4ac').send();

        expect(statusCode).toBe(400);
    });

    it("returns 404 if product don't exist", async () => {
        const { statusCode } = await request(api)
            .get('/products/423ef22ca3029ad1e2c3aae1')
            .send();

        expect(statusCode).toBe(404);
    });

    it('should get a product with id', async () => {
        const product = { name: 'tshirt', price: 20, weight: 0.1 };
        const { headers } = await request(api).post('/products').send(product);

        const { body } = await request(api).get(headers.location).send();

        expect(body).toMatchObject(product);
    });
});
