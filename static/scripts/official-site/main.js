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
      image: './assets/official-site/banner1-lg.jpg',
      imageSet: './assets/official-site/banner1.jpg 800w, ./assets/official-site/banner1-lg.jpg 1200w',
      imagePlaceholder: './assets/official-site/banner1-xs.jpg',
      title: '开启互联网+ 从我们开始',
      description: '域名主机，网站建设，云服务器，企业邮箱一站式解决',
    },
    {
      image: './assets/official-site/banner2-lg.jpg',
      imageSet: './assets/official-site/banner2.jpg 800w, ./assets/official-site/banner2-lg.jpg 1200w',
      imagePlaceholder: './assets/official-site/banner2-xs.jpg',
      title: '新闻中心',
      description:
        '几乎所有的伟大成就，都是团队集体协作追求远大目标的结果。这些团队的领导者挑选了团队的成员，并激励他们追求自己不敢想象的成就。',
    },
    {
      image: './assets/official-site/banner3-lg.jpg',
      imageSet: './assets/official-site/banner3.jpg 800w, ./assets/official-site/banner3-lg.jpg 1200w',
      imagePlaceholder: './assets/official-site/banner3-xs.jpg',
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
    $carouselContent.append($carouselTitle);
    $carouselContent.append($carouselDescription);

    const $carouselImage = createLazyloadImage(
      banner.image,
      banner.imagePlaceholder,
      '横幅',
      banner.imageSet,
      "100vw"
    );
    $carouselImage.classList.add('carousel__image');

    const $carouselContentWrapper = document.createElement('div');
    $carouselContentWrapper.className = 'carousel__content-wrapper';
    $carouselContentWrapper.append($carouselImage, $carouselContent);

    const $carouselItem = document.createElement('div');
    $carouselItem.classList.add('carousel__item');
    $carouselItem.append($carouselContentWrapper);

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
  $newsList.innerHTML = '';

  newsService.getRecentNews(4).then((newsList) => {
    newsList.forEach((news, i) => {
      const $newItem = createNewsItem(
        `https://loremflickr.com/270/420?lock=${i}`,
        `https://loremflickr.com/90/140?lock=${i}`,
        news.title,
        news.summary,
        news.id,
      );

      $newsList.append($newItem);
    });
  });
})();
