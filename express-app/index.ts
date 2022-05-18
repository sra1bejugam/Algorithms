import express, { Application } from 'express';
import { Log } from '../../utils/logger/logger';
import Boom from 'express-boom';
import cors from 'cors';
import { parallelProcessor } from '../../utils/parallel-process';

/* istanbul ignore next */
function createExpressApp() {
  try {
    const app: Application = express();

    app.set('HEALTH_STATUS', 'INITIALIZING');
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ limit: '50mb', extended: true }));
    app.use(Boom());
    app.use(cors());
    const server = app.listen(process.env.PORT, async () => {
      // if (err) {
      //   app.set('HEALTH_STATUS', 'SERVER_LISTEN_FAILED');
      //   Log.info(`Express App Start Failed ${err}`);
      //   throw err;
      // }
      Log.info(`Express App Started and listening at ${process.env.PORT}`);
      await parallelProcessor.deleteMessagesByPodHash({ pod_hash: process.env.podHash })
    });
    const closeServer = () => {
      Log.info('Closing http server connection');
      server.close(() => {
        Log.info('Shutdown Complete.');
      })
      app.set('HEALTH_STATUS', 'SERVER_CLOSED');
    }

    return { app, closeServer };
  } catch (err) {
    Log.info('Error at start App', { message: err.message, stackTrace: err.stack });
    throw err;
  }
}

export default createExpressApp;
