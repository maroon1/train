export class RepositoryService {
  api = new URL(
    "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories"
  );

  cachelife = 0;

  getRepositories(params) {
    const cache = this.getCache(params);

    if (cache != null) {
      return Promise.resolve(cache);
    }

    const url = new URL(this.api);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw res;
      })
      .then((data) => {
        this.setCache(params, data.items);

        return data.items;
      });
  }

  setCache(params, data) {
    const cacheKey = this.getCacheKey(params);

    window.localStorage.setItem(
      cacheKey,
      JSON.stringify({
        timestamp: Date.now(),
        data,
      })
    );
  }

  getCache(params) {
    const cacheKey = this.getCacheKey(params);

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
    return JSON.stringify({
      language: params.language,
      page: params.page,
      per_page: params.per_page,
    });
  }
}

export const service = new RepositoryService();
