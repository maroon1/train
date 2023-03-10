import { cacheService } from "./cache.service";

export class UserService {
  constructor(cache) {
    this.cacheService = cache;
  }

  getUser(username) {
    const url = new URL(`https://api.github.com/users/${username}`);

    const cache = this.cacheService.getCache(url);

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

export const userService = new UserService(cacheService);
