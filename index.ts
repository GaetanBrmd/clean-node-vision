import { Server } from 'http';
import { setup, disconnect } from './src/app';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

async function start() {
    const api = await setup();

    const server = api.listen(PORT, () => {
        console.log(`🚀 Server listening on port ${PORT}`);
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
        console.log('🚀 HTTP server closed ❌');
        await disconnect();
        console.log('Shutting down...');
        process.exit(0);
    });
}
