export class CacheService {
  cachelife = 10000;

  setCache(cacheKey, data) {
    window.localStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      }),
    );
  }

  getCache(cacheKey) {
    const cache = window.localStorage.getItem(cacheKey);

    if (!cache) {
      return null;
    }

    try {
      const result = JSON.parse(cache);

      if (Date.now() - result.timestamp > this.cachelife) {
        console.log("缓存未命中");
        return null;
      }

      console.log("缓存命中");
      console.log(result.data);

      return result.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  getCacheKey(params) {
    return JSON.stringify(
      Object.keys(params)
        .sort((a, b) => (a > b ? 1 : -1))
        .reduce((acc, cur) => {
          acc[cur] = params[cur];
          return acc;
        }, {}),
    );
  }
}

export const cacheService = new CacheService();
