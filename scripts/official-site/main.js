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
    const lazyItems = document.querySelectorAll('[data-animation]');

    if (lazyItems.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
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
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0,
      },
    );

    for (const item of lazyItems) {
      observer.observe(item);
    }
  });
})();
