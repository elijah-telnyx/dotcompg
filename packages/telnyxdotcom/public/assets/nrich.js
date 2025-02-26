var config = {
  cookieless: document.currentScript.dataset.cookieless === 'true',
};
!(function (n, a, t, i, f, y) {
  (n[t] =
    n[t] ||
    function () {
      (n[t].q = n[t].q || []).push(arguments);
    }),
    (n[t].l = 1 * new Date()),
    (f = a.createElement(i)),
    (f.async = true),
    (y = a.getElementsByTagName(i)[0]),
    (f.src = 'https://us-serve.nrich.ai/tracker/assets/tracker.js?nto=' + t),
    y.parentNode.insertBefore(f, y);
})(window, document, 'nt', 'script');
// eslint-disable-next-line no-undef
nt('load', '7b06d5db-90c8-45c1-99c8-f4c94997865c', config);
