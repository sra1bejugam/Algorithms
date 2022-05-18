import express, { Request, Response } from 'express';
import { Log } from '../utils/logger/logger';
const whereDisAt = 'health.ts';

function buildRouter() {
  const router = express.Router();

  router.get('/', async (req: Request, res: Response) => {
    try {
      res.set('Content-Type', 'text/plain');
      res.setHeader('Content-Security-Policy',
        "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
      );
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
      const status = process.env.HEALTH_STATUS;
      const alive = isStillAlive(req['componentsIsStillAliveInfo'])
      if (alive) {
        return res.send(status);
      } else {
        Log.info('Classification service is not live')
        res.statusCode = 500
        return res.end('One of subscriptions failing to respond.')
      }
    } catch (error) {
      Log.info('Error in /health route', {
        message: error.message,
        stackTrace: error.stack,
        whereDisAt
      });
      throw error;
    }
  });

  router.get('/ready', (req, res) => {
    try {
      res.set('Content-Type', 'text/plain');
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
      );
      const status = process.env.HEALTH_STATUS;
      Log.info('Fp-classification /health/ready route status: ', status)
      const alive = isStillAlive(req['componentsIsStillAliveInfo'])
      if (alive) {
        if (status === 'READY') {
          return res.send(status);
        } else {
          return res.status(417).send(status);
        }
      } else {
        Log.info('Classification service is not ready')
        res.statusCode = 500
        return res.end('One of subscriptions failing to respond.')
      }
    } catch (error) {
      Log.info('Error in /health/ready route', {
        message: error.message,
        stackTrace: error.stack,
        whereDisAt
      });
      throw error;
    }
  });
  return router;
}

export function isStillAlive(componentsIsStillAliveInfo) {
  if (!componentsIsStillAliveInfo || componentsIsStillAliveInfo.length === 0) {
    return true
  }
  const validComponents = componentsIsStillAliveInfo.filter(
    isAlive => typeof isAlive === 'function'
  )
  if (validComponents.length === 0) {
    return true
  }
  return validComponents.every(isAliveFunc => isAliveFunc())
}

export const router = buildRouter();
