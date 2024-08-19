import { Redis } from 'ioredis';

export class RedisClient {
  private client: Redis;

  constructor() {
    this.client = new Redis(6379, "192.168.1.200", {
        password: "P@55w0rd",
    });
  }

  async set(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return await this.client.get(key);
  }
}