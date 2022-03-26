import { setup, disconnect } from '../../src/app';
import express from 'express';

export let api: express.Express = {} as express.Express;

export const testSetup = () => {
    beforeAll(async () => {
        api = await setup();
    });

    afterAll(async () => {
        await disconnect();
    });
};
