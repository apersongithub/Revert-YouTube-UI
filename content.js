// content.js

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

// Set the PREF cookie
setCookie("PREF", "f6=8", 365, ".youtube.com", "/");

// Check if the URL begins with "https://www.youtube.com/watch"
if (window.location.href.startsWith("https://www.youtube.com/watch")) {
  // Reload the page once
  if (!sessionStorage.getItem("reloaded")) {
    sessionStorage.setItem("reloaded", true);
    window.location.reload();
  }
}
