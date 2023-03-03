const $menu = document.querySelector('.header__menu');
const $drawer = document.querySelector('.drawer');
const $drawerCloser = document.querySelector('.drawer__closer');

function toggleDrawer() {
  $drawer.classList.toggle('drawer--active');
}

$menu.addEventListener('click', function () {
  toggleDrawer();
});

$drawerCloser.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleDrawer();
});

$drawer.addEventListener('click', function () {
  toggleDrawer();
});
