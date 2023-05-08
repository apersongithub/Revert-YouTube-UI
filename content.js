// helper function to set the document's cookie
const setCookie = (name, value, days, domain = ".youtube.com", path = "/") => {
  // if days exists, convert days to seconds for expiration
  const expires = days ? `max-age=${days * 86400}` : "";
  //
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
  // open the link in the same tab
  window.open(link.href, "_self");
  // cancel events YouTube uses for dynamic websites
  e.preventDefault();
};

// set the PREF value to disable new UI
setCookie("PREF", "f6=8", 365);

// add listener to open the video with new UI
window.addEventListener('mouseup', openYoutubeVideoInTab, true);
