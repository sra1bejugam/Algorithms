import { Application } from 'express';
import Request from 'supertest';
import fpClassificationService from '../index';
import { parallelProcessor } from '../utils/parallel-process';

describe('Health Route', () => {
  const application: Application = fpClassificationService.app;

  beforeEach(() => {
    jest.spyOn(parallelProcessor, 'deleteMessagesByPodHash').mockResolvedValue(1);
  });

  afterAll(() => {
    fpClassificationService.server();
  })

  test('#GET should return health status READY', async () => {
    process.env.HEALTH_STATUS = 'INITIALIZING';
    const result = await Request(application).get('/health');
    expect(result['res'].statusCode).toBe(200);
    expect(result['res'].text).toBe('INITIALIZING');
  });

  test('returns the READY if service is in ready status', async () => {
    process.env.HEALTH_STATUS = 'READY';
    const result = await Request(application).get('/health/ready');
    expect(result['res'].statusCode).toBe(200);
    expect(result['res'].text).toBe('READY');
  });

  test('returns 417 code with current Health status of service', async () => {
    process.env.HEALTH_STATUS = 'INITIALIZING';
    const result = await Request(application).get('/health/ready');
    expect(result['res'].statusCode).toBe(417);
    expect(result['res'].text).toBe('INITIALIZING');
  });
})