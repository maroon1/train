import { cacheService } from "./cache.service";

export class RepositoryService {
  api = new URL("https://api.github.com/search/repositories");

  constructor(cache) {
    this.cacheService = cache;
  }

  getRepositories(params) {
    const url = new URL(this.api);

    const { language, ...restParams } = params;

    url.searchParams.set("q", `stars:>1 language:${language}`);
    url.searchParams.set("sort", "stars");
    url.searchParams.set("order", "desc");
    url.searchParams.set("type", "Repositories");

    Object.entries(restParams).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const cache = this.cacheService.getCache(url.toString());

    if (cache != null) {
      return Promise.resolve(cache);
    }

    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw res;
      })
      .then((data) => {
        this.cacheService.setCache(url.toString(), data);

        return data;
      });
  }
}

export const service = new RepositoryService(cacheService);
