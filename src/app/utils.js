export function catchGithubRateLimitError(res) {
  if (res instanceof Response) {
    if (!res.headers.has("x-ratelimit-remaining")) {
      return false;
    }

    if (res.headers.get("x-ratelimit-remaining") === "0") {
      const error = `慢一点，请求太频繁了，${Math.ceil(
        (res.headers.get("x-ratelimit-reset") * 1000 - Date.now()) / 1000
      )}秒后重试`;

      return error;
    }
  }

  return false;
}

export function formatNumber(num) {
  return Intl.NumberFormat("en-US", { style: "decimal" }).format(num);
}
