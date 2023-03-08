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

      setImageAttr(entry.target);

      lazyloadObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0,
    rootMargin: '0px 0px 100px 0px',
  },
);

function createLazyloadImage(image, placeholderImage, alt, srcset, sizes) {
  const $img = document.createElement('img');
  $img.setAttribute('data-lazy', image);
  if (srcset) {
    $img.setAttribute('data-srcset', srcset);
  }

  if (sizes) {
    $img.setAttribute('sizes', sizes);
  }

  $img.setAttribute('data-placeholder', placeholderImage);
  $img.setAttribute('alt', alt);

  const $imgWrapper = document.createElement('div');
  $imgWrapper.classList.add('image--loading', 'image');
  $imgWrapper.append($img);

  $img.onload = () => {
    $imgWrapper.classList.remove('image--loading');
  };

  return $imgWrapper;
}

/**
 * @param {string} image 新闻图片
 * @param {string} title 新闻标题
 * @param {string} summary 新闻概览
 */
function createNewsItem(image, placeholderImage, title, summary, id) {
  const $imgWrapper = createLazyloadImage(image, placeholderImage, '新闻插图');
  $imgWrapper.classList.add('news__image', 'hover-scale');

  const $title = document.createElement('h3');
  $title.classList.add('news__title', 'sm:text-lg');
  $title.setAttribute('data-animation', 'fadein');
  $title.textContent = title;

  const $summary = document.createElement('p');
  $summary.classList.add('news__summary');
  $summary.setAttribute('data-animation', 'fadein');
  $summary.textContent = summary;

  const $a = document.createElement('a');
  $a.href = `./news-detail.html?id=${id}`;

  const $newsItem = document.createElement('li');
  $newsItem.classList.add('news__item', 'sm:basis-1/4', 'sm:px-4');

  $newsItem.append($imgWrapper, $title, $summary, $a);

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
      setImageAttr(item);
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

    getNewsById(id) {
      const url = new URL(this.newsUrl.toString() + '/' + id);

      return fetch(url).then((res) => res.json());
    }
  }

  newsService = new NewsService();
})();

(function () {
  const domObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
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

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const $menu = document.querySelector('.header__menu');
    const $drawer = document.querySelector('.drawer');
    const $drawerCloser = document.querySelector('.drawer__closer');
    /** @type {HTMLDivElement} */
    const $drawerContainer = document.querySelector('.drawer__container');

    if (!$drawerContainer) {
      return;
    }

    const drawerAnimation = $drawerContainer.animate(
      [
        {
          transform: `translateX(100%)`,
        },
        {
          transform: `translateX(0)`,
        },
      ],
      {
        duration: 300,
        easing: 'ease-in-out',
      },
    );

    drawerAnimation.pause();

    $menu.addEventListener('click', function () {
      toggleDrawer();
      $drawerContainer.style.transform = 'translateX(100%)';
      setTimeout(() => {
        drawerAnimation.playbackRate = 1;
        drawerAnimation.play();
        drawerAnimation.onfinish = () => {
          $drawerContainer.style.transform = 'translateX(0)';
        };
      }, 50);
    });

    $drawerCloser.addEventListener('click', function (e) {
      e.stopPropagation();
      drawerAnimation.playbackRate = -1;
      drawerAnimation.play();
      drawerAnimation.onfinish = () => {
        $drawerContainer.style.transform = 'translateX(100%)';
        toggleDrawer();
      };
    });

    $drawer.addEventListener('click', function () {
      toggleDrawer();
    });

    function toggleDrawer() {
      $drawer.classList.toggle('drawer--active');
    }
  });
})();

function setImageAttr(img) {
  const { lazy, placeholder, srcset } = img.dataset;
  img.src = lazy;

  if (srcset) {
    img.srcset = srcset;
  }

  if (placeholder) {
    img.classList.add(`bg-[url('${placeholder}')]`);
  }
}
