// helper function to set the document's cookie
const setCookie = (name, value, days, domain = ".youtube.com", path = "/") => {
  // if days exists, convert days to seconds for expiration
  const expires = days ? `max-age=${days * 86400}` : "";
  // include "secure" if https is used
  const isSecure = window.location.protocol === "https:" ? "secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; ${expires}; domain=${domain}; path=${path}; ${isSecure}`;
};

const openYoutubeVideoInTab = (e) => {
  // ignore right-click or if Alt key is pressed
  if (e.button > 1 || e.altKey) return;

  // ignore if the target is the player's scrubber
  if (e.target.classList.contains("ytp-scrubber-pull-indicator")) return;

  // find the closest link element that starts with "/watch"
  const link = e.target.closest('[href^="/watch"]');

  // ignore if the link is not valid or a JavaScript/anchor link
  if (
    !link ||
    (link.getAttribute("href") || "").match(/^(javascript|#|$)/) ||
    link.href.replace(/#.*/, "") === location.href.replace(/#.*/, "")
  )
    return;

  // extract search parameters from the current URL
  const searchParams = new URLSearchParams(window.location.search);

  // append search parameters to the link href
  const href = new URL(link.href);
  if (searchParams.size > 1) href.searchParams.append(...searchParams);

  // open the link with preserved search parameters in the same tab
  window.open(href.toString(), "_self");

  // cancel events YouTube uses for dynamic websites
  e.preventDefault();
};

// set the PREF value to disable new UI
setCookie("PREF", "f6=8", 365);

// add listener to open the video with new UI
window.addEventListener('mouseup', openYoutubeVideoInTab, true);
