export const TABLEGO_WIDGET_URL =
  process.env.NEXT_PUBLIC_TABLEGO_WIDGET_URL ??
  "https://tablego.uk/widget/pupa-restaurant-and-bar--wwefqm";

export const TABLEGO_IFRAME_RESIZER_URL =
  process.env.NEXT_PUBLIC_TABLEGO_IFRAME_RESIZER_URL ??
  "https://tablego.uk/js/iframeResizer.min.js";

/** Origin allowed for iframeResizer postMessage (never use checkOrigin: false). */
export const TABLEGO_ALLOWED_ORIGIN = (() => {
  try {
    return new URL(TABLEGO_WIDGET_URL).origin;
  } catch {
    return "https://tablego.uk";
  }
})();
