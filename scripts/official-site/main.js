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
      entry.target.classList.add(animation);
      animationObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0,
  },
);

const lazyloadObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.intersectionRatio === 0) {
        return;
      }

      const { lazy } = entry.target.dataset;

      entry.target.src = lazy;
      lazyloadObserver.unobserve(entry.target);
    }
  },
  {
    threshold: 0,
    rootMargin: '0px 0px 100px 0px',
  },
);

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

(function () {
  const baseUrl = 'https://64006b1463e89b0913ae6339.mockapi.io/api/';

  class NewsService {
    static newsUrl = new URL('news', baseUrl);

    getNews(page, limit) {
      const search = new URLSearchParams([
        ['page', String(page)],
        ['limit', String(limit)],
      ]);
      const url = new URL(NewsService.newsUrl);
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

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const animationItems = document.querySelectorAll('[data-animation]');

    observeAnimationItems(animationItems);
  });
})();

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    /** @type {HTMLImageElement[]} */
    const lazyItems = document.querySelectorAll('img[data-lazy]');

    observeLazyloadItems(lazyItems);
  });
})();

(function () {
  const bannerInfos = [
    {
      image: './assets/official-site/banner1.jpg',
      title: '开启互联网+ 从我们开始',
      description: '域名主机，网站建设，云服务器，企业邮箱一站式解决',
    },
    {
      image: './assets/official-site/banner2.jpg',
      title: '新闻中心',
      description:
        '几乎所有的伟大成就，都是团队集体协作追求远大目标的结果。这些团队的领导者挑选了团队的成员，并激励他们追求自己不敢想象的成就。',
    },
    {
      image: './assets/official-site/banner3.jpg',
      title: '关于我们',
      description:
        '企业构建互联网信息技术服务平台，领先技术变革，提升产业效率，致力于使能软件企业引领发展，服务制造企业转型升级，为政企客户提供“多快好省”的信息技术服务。',
    },
  ];

  /** @type {HTMLDivElement[]} */
  const bannerDoms = [];

  /** @type {HTMLDivElement} */
  const $carousel = document.querySelector('.carousel');

  /** @type {HTMLDivElement} */
  const $carouselContainer = document.querySelector('.carousel__container');

  /** @type {HTMLDivElement} */
  const $carouselIndicator = document.querySelector('.carousel__indicator');

  const indicatorItems = createIndicators();

  let counter = 0;
  /** @type {HTMLDivElement | null} */
  let currentBanner = null;
  /** @type {HTMLDivElement | null} */
  let currentIndicator = null;
  /** @type {Animation | null} */
  let animation = null;

  $carousel.addEventListener('mouseenter', function (e) {
    if (!animation) {
      return;
    }

    animation.pause();
  });

  $carousel.addEventListener('mouseleave', function () {
    if (!animation) {
      return;
    }

    animation.play();
  });

  indicatorItems.forEach((item) => {
    $carouselIndicator.append(item);
  });

  indicatorItems.forEach((item, i) => {
    item.addEventListener('click', function () {
      counter = i;

      bannerDoms.forEach((banner) => {
        banner.style.zIndex = -1;
      });

      animation.cancel();
      start(counter);
      animation.pause();
    });
  });

  function start(currentIndex) {
    const index = currentIndex % bannerInfos.length;

    if (!bannerDoms[index]) {
      const bannerDom = createBannerDom(index);
      bannerDoms[index] = bannerDom;
      $carouselContainer.append(bannerDom);
    }

    const banner = bannerDoms[index];
    const indicator = indicatorItems[index];

    if (currentBanner) {
      currentBanner.classList.add('fadeout');
      currentBanner.classList.remove('fadein');
    }

    if (currentIndicator) {
      currentIndicator.classList.remove('carousel__indicator-item--active');
    }

    currentBanner = banner;
    currentBanner.classList.add('fadein');
    currentBanner.classList.remove('fadeout');
    currentBanner.style.zIndex = currentIndex;

    currentIndicator = indicator;
    currentIndicator.classList.add('carousel__indicator-item--active');

    /** @type {HTMLElement | undefined} */
    const $innerBar = Array.from(
      document.querySelectorAll('.progress__inner-bar'),
    ).find((el) => matchParent(el.parentElement, currentIndicator));

    animation = $innerBar.animate(
      [
        {
          strokeDashoffset: 2 * Math.PI * 40,
        },
        {
          strokeDashoffset: 0,
        },
      ],
      5000,
    );

    animation.onfinish = () => {
      counter += 1;
      start(counter);
    };
  }

  start(counter);

  function createBannerDom(index) {
    const banner = bannerInfos[index];

    const $carouselTitle = document.createElement('div');
    $carouselTitle.classList.add('carousel__title', 'sm:text-6xl');
    $carouselTitle.textContent = banner.title;

    const $carouselDescription = document.createElement('div');
    $carouselDescription.classList.add(
      'carousel__description',
      'sm:mt-6',
      'sm:text-3xl',
    );
    $carouselDescription.textContent = banner.description;

    const $carouselContent = document.createElement('div');
    $carouselContent.classList.add('carousel__content', 'sm:justify-center');
    $carouselContent.style.backgroundImage = `url(${banner.image})`;
    $carouselContent.append($carouselTitle);
    $carouselContent.append($carouselDescription);

    const $carouselItem = document.createElement('div');
    $carouselItem.classList.add('carousel__item');
    $carouselItem.append($carouselContent);

    return $carouselItem;
  }

  function createIndicators() {
    return Array.from({ length: bannerInfos.length }).map(() => {
      const $indicatorItem = document.createElement('div');
      $indicatorItem.classList.add('carousel__indicator-item');
      $indicatorItem.innerHTML = `
        <svg class="progress" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle class="progress__inner-bar" cx="50" cy="50" r="40"></circle>
          <circle class="progress__bar" cx="50" cy="50" r="40" />
        </svg>
      `;

      return $indicatorItem;
    });
  }

  /**
   * @param {HTMLElement} node
   * @param {HTMLElement} parent
   */
  function matchParent(node, parent) {
    if (!node.parentElement) {
      return false;
    }

    if (node.parentElement === parent) {
      return true;
    }

    return matchParent(node.parentElement, parent);
  }
})();

(function () {
  const $newsList = document.querySelector('.news__list');

  newsService.getRecentNews(4).then((newsList) => {
    newsList.forEach((news) => {
      const $newItem = createNewsItem(
        'https://loremflickr.com/270/420?lock=1',
        news.title,
        news.summary,
      );

      $newsList.append($newItem);
    });
  });

  /**
   * @param {string} _image 新闻图片
   * @param {string} title 新闻标题
   * @param {string} summary 新闻概览
   */
  function createNewsItem(image, title, summary) {
    const $img = document.createElement('img');
    $img.setAttribute('data-lazy', image);
    $img.setAttribute('alt', '新闻插图');

    const $imgWrapper = document.createElement('div');
    $imgWrapper.classList.add('news__image', 'hover-scale');
    $imgWrapper.append($img);

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
})();

/**
 * @param {HTMLElement[]} items
 */
function observeAnimationItems(items) {
  if (items.length === 0) {
    return;
  }

  for (const item of items) {
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
