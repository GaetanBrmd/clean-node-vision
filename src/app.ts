import express from 'express';
import Joi from 'joi';
import bodyParser from 'body-parser';
import { MongoClient, ObjectId } from 'mongodb';
import logger from './logger';

const MONGO_URL = 'mongodb://root:example@localhost:27017/';
let client: MongoClient;

export async function setup() {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    logger.info('🍃 MongoDB connected');
    const shopDB = client.db('shop');
    const products = shopDB.collection('products');

    const app: express.Express = express();

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
        res.status(200).send({
            title: 'My CLEAN Shopping API',
            description:
                'A shopping API with a progressive switch to CLEAN architecture.',
            contact: 'gbremond@ippon.fr',
            version: '1.0',
        });
    });

    const productSchema = Joi.object().keys({
        name: Joi.required(),
        price: Joi.number().required(),
        weight: Joi.number().required(),
    });

    app.post('/products', async (req, res) => {
        const { value, error } = productSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            res.status(400).send({
                errors: error.details.map(({ message, path }) =>
                    Object.assign({ message, path })
                ),
            });
        } else {
            const inserted = await products.insertOne(value);
            res.set('Location', `/products/${inserted.insertedId}`);
            res.status(201).send();
        }
    });

    app.get('/products', async (req, res) => {
        const cursor = await products.find();

        res.status(200).send(await cursor.toArray());
    });

    const idSchema = Joi.object().keys({
        id: Joi.string().hex().min(24).max(24).required(),
    });

    app.get('/products/:id', async (req, res) => {
        const { value, error } = idSchema.validate(req.params, {
            abortEarly: false,
        });

        if (error) {
            res.status(400).send({
                errors: error.details.map(({ message, path }) =>
                    Object.assign({ message, path })
                ),
            });
        } else {
            const result = await products.findOne({
                _id: new ObjectId(value),
            });
            if (result) {
                res.status(200).send(result);
            } else {
                res.status(404).send();
            }
        }
    });

    return app;
}

export async function disconnect() {
    await client.close();
    logger.info('🍃 MongoDB disconnected ❌');
}
