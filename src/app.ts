import express from 'express';

export default async () => {
    const app = express();

    // code will go here

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
};
