import { FastifyInstance } from 'fastify';
import { Service } from 'typedi';

@Service('route')
export class RootService {
  registerRoutes(fastify: FastifyInstance, basePath: string) {
    fastify.get(basePath, async function () {
      return { message: 'Hello API' };
    });
  }
}

