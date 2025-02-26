(function (uh, uid, hdl) {
  var settings = {
    ...(window.intercomSettings || {}),
    user_hash: uh,
    user_id: uid,
  };

  // `hide_default_launcher` param overrides app config preferences
  if (hdl === 'true') {
    settings.hide_default_launcher = true;
  }

  window.intercomSettings = settings;
})(
  document.currentScript.dataset.user_hash,
  document.currentScript.dataset.user_id,
  document.currentScript.dataset.hide_default_launcher
);
