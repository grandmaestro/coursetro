import config from '../store/config.js';
import store from '../store/store.js';

export const getWeeksInfo = (tab) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, {
        action: config.env.ACTIONS.GET_WEEK_INFO
      }, (res, err) => {
        try {
          if (err) {
            throw new Error(err);
          }
          return resolve(res);
        } catch (e) {
          console.error(`Unable to get week details for ${tab.url}`);
          return resolve([]);
        }
      })

    }, 15000);
  })
}

export const getVideoLessonsInfo = (tab) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, {
        action: config.env.ACTIONS.GET_VIDEO_LESSONS_INFO
      }, (res, err) => {
        try {
          if (err) {
            throw new Error(err);
          }
          return resolve(res);
        } catch (e) {
          console.error(`Unable to get video lessons details for ${tab.url}`);
          return resolve([]);
        }
      })

    }, 15000);
  })
}

export const getVideoInfo = (tab) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      chrome.tabs.sendMessage(tab.id, {
        action: config.env.ACTIONS.GET_VIDEO_INFO
      }, (res, err) => {
        try {
          if (err) {
            throw new Error(err);
          }
          return resolve(res);
        } catch (e) {
          console.error(`Unable to get video info for ${tab.url}`);
          return resolve(null);
        }
      })

    }, 20000);
  })
}
