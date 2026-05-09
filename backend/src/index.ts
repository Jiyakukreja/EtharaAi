import { createServer } from 'http';
import { Server } from 'socket.io';
import { createApp } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

async function bootstrap() {
  await connectDatabase();
  const app = createApp();
  const server = createServer(app);
  const io = new Server(server, {
    cors: { origin: env.frontendUrl, credentials: true }
  });

  io.on('connection', socket => {
    socket.emit('connected', { status: 'live' });
  });

  server.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`);
  });
}

bootstrap().catch(error => {
  console.error(error);
  process.exit(1);
});
