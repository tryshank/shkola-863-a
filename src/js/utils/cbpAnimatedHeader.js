/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
export default (function () {
  const docElem = document.documentElement,
    changeHeaderOn = 5;
  let didScroll = false;

  function init() {
    window.addEventListener('scroll', function (event) {
      if (!didScroll) {
        didScroll = true;
        setTimeout(scrollPage, 250);
      }
    }, false);
  }

  function scrollPage() {
    const sy = scrollY();
    const header = document.querySelector('.navbar-fixed-top');
    if (sy >= changeHeaderOn) {
      classie.add(header, 'navbar-shrink');
    }
    else {
      classie.remove(header, 'navbar-shrink');
    }
    didScroll = false;
  }

  function scrollY() {
    return window.pageYOffset || docElem.scrollTop;
  }

  console.log('2');
  init();
})();
