import { Server } from 'http';
import { setup, disconnect } from './src/app';
import logger from './src/logger';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

async function start() {
    const api = await setup();

    const server = api.listen(PORT, () => {
        logger.info(`🚀 Server listening on port ${PORT}`);
    });

    process.on('SIGTERM', () => {
        gracefulShutdown(server, disconnect);
    });

    process.on('SIGINT', () => {
        gracefulShutdown(server, disconnect);
    });
}

start();

function gracefulShutdown(server: Server, disconnect: () => Promise<void>) {
    server.close(async () => {
        process.stdout.cursorTo(0);
        logger.info('🚀 HTTP server closed ❌');
        await disconnect();
        logger.info('Shutting down...');
        process.exit(0);
    });
}
