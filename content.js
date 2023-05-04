// creates set cookie function for easy replacement
function setCookie(name, value, days, domain, path) {
  let expires = "";
  let secureFlag = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  let cookieString = name + "=" + value + expires;
  if (domain) {
    cookieString += "; domain=" + domain;
  }
  if (path) {
    cookieString += "; path=" + path;
  } else {
    cookieString += "; path=/";
  }
  if (window.location.protocol === "https:") {
    secureFlag = "; secure";
  }
  document.cookie = cookieString + secureFlag;
}

// Set the PREF cookie reponsible for your theme
setCookie("PREF", "f6=8", 365, ".youtube.com", "/");

//the function is self explanatory but the new update doesnt force open it in a new tab anymore
function openYoutubeVideoInTab(e) {
  if (e.button > 1 || e.altKey) return;
  if (e.target.classList.contains('ytp-scrubber-pull-indicator')) return;
  
  var link = e.target.closest('[href^="/watch"]');
  if (!link || (link.getAttribute('href') || '').match(/^(javascript|#|$)/) || link.href.replace(/#.*/, '') == location.href.replace(/#.*/, '')) return;
 
  window.open(link.href, '_self');
  //cancels the event that youtube uses for dynamic websites
  e.preventDefault();
}

window.addEventListener('mouseup', openYoutubeVideoInTab, true);
