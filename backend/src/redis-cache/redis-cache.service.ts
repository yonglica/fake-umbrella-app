import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {

  constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

  async get<T>(key: string): Promise<T> {
    console.log('cache get key: ' + `${key}` );
    return this.cache.get(key);
  }

  async set<T>(key: string, value: T): Promise<T> {
    console.log('cache set key: ' + `${key}` );
    return this.cache.set(key, value);
  }

  async del(key: string): Promise<void> {
    return this.cache.del(key);
  }
  
}
