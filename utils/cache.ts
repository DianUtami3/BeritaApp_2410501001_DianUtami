import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

export class CacheManager {
  static async get<T>(key: string): Promise<T | null> {
    const cached = await AsyncStorage.getItem(`cache_${key}`);
    if (!cached) return null;

    const entry: CacheEntry<T> = JSON.parse(cached);
    const isExpired = Date.now() - entry.timestamp > entry.ttl;

    if (isExpired) {
      await AsyncStorage.removeItem(`cache_${key}`);
      return null;
    }

    return entry.data;
  }

  static async set<T>(key: string, data: T, ttlMs = 5 * 60 * 1000) {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl: ttlMs,
    };

    await AsyncStorage.setItem(`cache_${key}`, JSON.stringify(entry));
  }

  static async clear(pattern?: string) {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter((key) => key.startsWith('cache_'));

    const toDelete = pattern
      ? cacheKeys.filter((key) => key.includes(pattern))
      : cacheKeys;

    await AsyncStorage.multiRemove(toDelete);
  }
}

export const fetchWithCache = async <T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> => {
  const cached = await CacheManager.get<T>(key);

  if (cached) {
    fetcher()
      .then((fresh) => CacheManager.set(key, fresh))
      .catch(console.warn);

    return cached;
  }

  const fresh = await fetcher();
  await CacheManager.set(key, fresh);
  return fresh;
};