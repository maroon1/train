(() => {
  // 弹幕速度，px/s(像素每秒)
  const SPEED_MIN = 100;
  const SPEED_MAX = 350;

  // 弹幕字体大小倍数，初始大小 12px
  const FONT_SIZE_MIN = 1;
  const FONT_SIZE_MAX = 3;

  /** @type {Set<JQuery<HTMLElement>>} */
  const bullets = new Set();

  /** @type {JQuery<HTMLElement>[]} */
  let bulletRecycle = [];

  let canvasWidth = 0;
  let canvasHeight = 0;

  /** @type {JQuery<HTMLElement> | null} */
  let $canvas = null;

  $(() => {
    $canvas = $('#canvas');
    const $input = $('#content-input');
    const $emitButton = $('#emit-button');
    const $clearButton = $('#clear-button');

    canvasWidth = $canvas.innerWidth();
    canvasHeight = $canvas.innerHeight();

    $(window).on('resize', function () {
      canvasWidth = $canvas.innerWidth();
    });

    // 发射
    $clearButton.on('click', function () {
      Array.from(bullets).forEach((bullet) => {
        bulletRecycle = [];
        bullet.remove();
      });
      bullets.clear();
    });

    // 清除
    $emitButton.on('click', function () {
      const content = $input.val();

      if (!content) {
        return;
      }

      $input.val('');

      sendBullet(content);
    });
  });

  function mock() {
    sendBullet('测试');
    setTimeout(() => {
      mock();
    }, 300);
  }

  mock();

  function sendBullet(content) {
    const bullet = getBullet(content);

    bullet.send();
    bullets.add(bullet.target);
  }

  function getBullet(content) {
    const { fontSizeScale, duration, color, top } = getBulletConfig();

    let bullet = bulletRecycle.pop();

    if (bullet) {
      bullet.css('visibility', 'visible');
    } else {
      bullet = $(`<i class="text">${content}</i>`).appendTo($canvas);
    }

    bullet.css('color', color).css('rightPosition', 0).text(content);

    const textWidth = bullet.innerWidth();

    bullet.css(
      'transform',
      `translate3d(${textWidth}px, ${top}px, 0px) scale3d(${fontSizeScale}, ${fontSizeScale}, 1)`,
    );

    return {
      target: bullet,
      send() {
        bullet.animate(
          { rightPosition: canvasWidth + textWidth },
          {
            duration,
            easing: 'linear',
            step(now) {
              bullet.css(
                'transform',
                `translate3d(${
                  textWidth - now
                }px, ${top}px, 0px) scale3d(${fontSizeScale}, ${fontSizeScale}, 1)`,
              );
            },
            complete() {
              if (!$canvas.has(bullet.get()).length) {
                return;
              }

              bullets.delete(bullet);
              bullet.css('visibility', 'hidden');
              bulletRecycle.push(bullet);
            },
          },
        );
      },
    };
  }

  function getBulletConfig() {
    const fontSizeScale = getFontSizeScale();
    const duration = getDuration();
    const color = getColor();
    // 高度需要减去字体大小，避免被画布底部遮挡
    const top = getTop(canvasHeight - fontSizeScale);

    return {
      fontSizeScale,
      duration,
      color,
      top,
    };
  }

  /**
   * 随机选择一个范围内的值
   *
   * @param {number} min 最小值
   * @param {number} max 最大值
   */
  function randomRange(min, max) {
    const offset = max - min;
    return Math.round(min + Math.random() * offset);
  }

  /**
   * 获取随机字体高度
   * @returns 字体高度
   */
  function getFontSizeScale() {
    return randomRange(FONT_SIZE_MIN, FONT_SIZE_MAX);
  }

  /**
   * 获取随机速度
   * @returns 速度
   */
  function getDuration() {
    const durationMax = (canvasWidth / SPEED_MIN) * 1000;
    const durationMin = (canvasWidth / SPEED_MAX) * 1000;

    return randomRange(durationMin, durationMax - durationMin);
  }

  /**
   * 获取随机颜色
   * @returns 颜色
   */
  function getColor() {
    return (
      '#' +
      Math.floor(Math.random() * (0xffffff + 1))
        .toString(16)
        .padStart(6, '0')
    );
  }

  /**
   * 获取弹幕位置
   *
   * @returns 距离顶部位置
   */
  function getTop(height) {
    return randomRange(0, height);
  }
})();

/**
 * @param {*[]} items
 */
function random(items) {
  const index = (Math.random() * 1000000) / items.length;

  return items[index];
}

function randomColor(colors) {
  return random();
}
