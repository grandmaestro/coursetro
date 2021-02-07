'use strict';

// Import file as ES 6 module
(async () => {
    const src = chrome.runtime.getURL("./content_scripts/main.js");
    await import(src);
})();