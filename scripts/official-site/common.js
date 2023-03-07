let newsService;

const animationObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio === 0) {
        return;
      }

      const { animation } = entry.target.dataset;

      if (!animation) {
        return;
      }
      entry.target.classList.remove('invisible');
      entry.target.classList.add(animation);
      animationObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0.25,
  },
);

const lazyloadObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio === 0) {
        return;
      }

      const { lazy, placeholder } = entry.target.dataset;

      entry.target.src = lazy;

      if (placeholder) {
        entry.target.classList.add(`bg-[url('${placeholder}')]`);
      }
      lazyloadObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0,
    rootMargin: '0px 0px 100px 0px',
  },
);

/**
 * @param {string} image 新闻图片
 * @param {string} title 新闻标题
 * @param {string} summary 新闻概览
 */
function createNewsItem(image, placeholderImage, title, summary) {
  const $img = document.createElement('img');
  $img.setAttribute('data-lazy', image);
  $img.setAttribute('data-placeholder', placeholderImage);
  $img.setAttribute('alt', '新闻插图');

  const $imgWrapper = document.createElement('div');
  $imgWrapper.classList.add(
    'news__image',
    'hover-scale',
    'news__image--loading',
  );
  $imgWrapper.append($img);

  $img.onload = () => {
    $imgWrapper.classList.remove('news__image--loading');
  };

  const $title = document.createElement('h3');
  $title.classList.add('news__title', 'sm:text-lg');
  $title.setAttribute('data-animation', 'fadein');
  $title.textContent = title;

  const $summary = document.createElement('p');
  $summary.classList.add('news__summary');
  $summary.setAttribute('data-animation', 'fadein');
  $summary.textContent = summary;

  const $newsItem = document.createElement('li');
  $newsItem.classList.add('news__item', 'sm:basis-1/4', 'sm:px-4');

  $newsItem.append($imgWrapper, $title, $summary);

  return $newsItem;
}

/**
 * @param {HTMLElement[]} items
 */
function observeAnimationItems(items) {
  if (items.length === 0) {
    return;
  }

  for (const item of items) {
    item.classList.add('invisible');
    animationObserver.observe(item);
  }
}

/**
 * @param {HTMLElement[]} items
 */
function observeLazyloadItems(items) {
  if (items.length === 0) {
    return;
  }

  for (const item of items) {
    // WHY: 第一屏中的图片无法显示
    const bouding = item.getBoundingClientRect();

    if (bouding.top < window.innerHeight) {
      item.src = item.dataset.lazy;
      continue;
    }

    lazyloadObserver.observe(item);
  }
}

(function () {
  const baseUrl = 'https://64006b1463e89b0913ae6339.mockapi.io/api/';

  class NewsService {
    newsUrl = new URL('news', baseUrl);

    getNews(page, limit) {
      const search = new URLSearchParams([
        ['page', String(page)],
        ['limit', String(limit)],
      ]);
      const url = new URL(this.newsUrl);
      url.search = search.toString();

      return fetch(url).then((res) => res.json());
    }

    getRecentNews(num) {
      return this.getNews(1, num);
    }
  }

  newsService = new NewsService();
})();

(function () {
  const domObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        !mutation.target.classList ||
        !mutation.target.classList.contains('news__list')
      ) {
        return;
      }

      if (mutation.addedNodes.length === 0) {
        return;
      }

      mutation.addedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const animationItems = node.querySelectorAll('[data-animation]');
          observeAnimationItems(animationItems);

          const lazyloadItems = node.querySelectorAll('[data-lazy]');
          observeLazyloadItems(lazyloadItems);
        }
      });
    });
  });

  domObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
