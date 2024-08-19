import { Redis } from 'ioredis';

export class RedisClient {
  private client: Redis;

  constructor() {
    this.client = new Redis(process.env.REDIS_PORT as unknown as number, process.env.REDIS_HOST as string, {
        password: process.env.REDIS_PASSWORD,
    });
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}