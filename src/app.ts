import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

const MONGO_URL = 'mongodb://root:example@localhost:27017/';
let client: MongoClient;

export async function setup() {
    client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log('🍃 MongoDB connected');
    const shopDB = client.db('shop');
    const products = shopDB.collection('products');

    const app: express.Express = express();

    app.get('/', (req, res) => {
        res.status(200).send({
            title: 'My CLEAN Shopping API',
            description:
                'A shopping API with a progressive switch to CLEAN architecture.',
            contact: 'gbremond@ippon.fr',
            version: '1.0',
        });
    });

    return app;
}

export async function disconnect() {
    await client.close();
    console.log('🍃 MongoDB disconnected ❌');
}
