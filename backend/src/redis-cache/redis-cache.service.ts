import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T> {
    return this.cache.get(key);
  }

  async set<T>(key: string, value: T): Promise<T> {
    return this.cache.set(key, value);
  }

  async del(key: string): Promise<void> {
    return this.cache.del(key);
  }
  
}
