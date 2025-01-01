import { initHono } from './hono';

async function bootApp() {
    
    const app = await initHono();

    app.get('/', (c) => c.text('health'));

    return app;
}

export default bootApp;