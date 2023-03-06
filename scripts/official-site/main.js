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
