import config from '../store/config.js';
import { scrapeWeekInfo, scrapeVideoLessonsInfo, scrapeVideoInfo } from '../content_scripts/page.js';

console.log('content_scripts/main.js executed');

// Message From Background
chrome.runtime.onMessage.addListener((msg, sender, callback) => {
  switch (msg.action) {
    case config.env.ACTIONS.GET_WEEK_INFO:
      const weekHref = scrapeWeekInfo();
      callback(weekHref);
      break;
    case config.env.ACTIONS.GET_VIDEO_LESSONS_INFO:
      const videoHref = scrapeVideoLessonsInfo();
      callback(videoHref);
      break;
    case config.env.ACTIONS.GET_VIDEO_INFO:
      const downloadHrefs = scrapeVideoInfo();
      callback(downloadHrefs);
      break;
    // case CONFIG.ACTIONS.LOG_INTO_PLATFORM:
    //   logIntoPlatform(msg)
    //     .then(res => {
    //       sendResponse(res);
    //     })
    //     .catch(err => {
    //       sendResponse(err);
    //     });
    //   break;
    // case CONFIG.ACTIONS.SCRAPE_CONTENT:
    //   getAudioContext(msg)
    //     .then(res => {
    //       sendResponse(res);
    //     })
    //     .catch(err => {
    //       sendResponse(err);
    //     });
    //   break;
  }

  //Need to add return true then only it will wait for asyn response
  return true;
})