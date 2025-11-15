export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

/**
 * Cache manager class for handling in-memory caching
 */
export class CacheManager<T> {
  private cache: Record<string, CacheItem<T>> = {};
  private cacheDuration: number;

  constructor(cacheDuration: number = 5 * 60 * 1000) { // Default 5 minutes
    this.cacheDuration = cacheDuration;
  }

  set(key: string, data: T): void {
    this.cache[key] = {
      data,
      timestamp: Date.now()
    };
  }

  get(key: string): T | null {
    const cacheItem = this.cache[key];
    const now = Date.now();

    if (cacheItem && now - cacheItem.timestamp < this.cacheDuration) {
      return cacheItem.data;
    }

    return null;
  }

  getExpired(key: string): T | null {
    return this.cache[key]?.data || null;
  }

  has(key: string): boolean {
    return key in this.cache;
  }

  remove(key: string): void {
    delete this.cache[key];
  }

  clear(): void {
    this.cache = {};
  }
}
