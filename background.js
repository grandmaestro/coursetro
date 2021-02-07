import store from './store/store.js';

import { openUrlInTab, updateUrlInTab, closeTab } from './handlers/tab.js';
import { getWeeksInfo, getVideoLessonsInfo, getVideoInfo } from './handlers/scrape.js';
import { download } from './handlers/download.js';


console.log("Background Script Started");

const initScrapingTask = async () => {
  const now = Date.now();
  for (let index = 0; index < store.SEED_COURSES.length; index++) {
    let course = store.SEED_COURSES[index];
    if (course.skip) {
      console.log(`Skipping the tasks for ${course.courseUrl}`);
      continue;
    }
    console.log(`Initiating the tasks for ${course.courseUrl}`);
    try {
      let tab = await openUrlInTab(course.courseUrl)
      const weeksInfo = await getWeeksInfo(tab);
      for (let weekIndex = 0; weekIndex < weeksInfo.length; weekIndex++) {
        if ((course.skipWeeks || []).includes(weekIndex + 1)) {
          continue;
        }
        let weekHref = weeksInfo[weekIndex];
        tab = await updateUrlInTab(tab, weekHref);
        const videoLessons = await getVideoLessonsInfo(tab);

        var i, j, chunk = 3;
        for (i = 0, j = videoLessons.length; i < j; i += chunk) {
          let batch = videoLessons.slice(i, i + chunk);
          let videoTabs = [];
          let videoInfoReq = [];
          batch.forEach(videoHref => {
            const vidTab = openUrlInTab(videoHref);
            videoTabs.push(vidTab);
          });

          videoTabs = await Promise.all(videoTabs);
          videoTabs.forEach((vidTab) => videoInfoReq.push(getVideoInfo(vidTab)));
          videoInfoReq = await Promise.all(videoInfoReq);
          videoInfoReq = videoInfoReq.filter((v) => !!v);
          videoTabs.forEach((vidTab) => closeTab(vidTab));

          for (let downloadable of videoInfoReq) {
            const fNow = Date.now();
            await download(course.category, `${now}/${index + 1}`, downloadable.videoHref, `${fNow}.mp4`);
            await download(course.category, `${now}/${index + 1}`, downloadable.subTitleHref, `${fNow}.vtt`);
          }
        }
      }
      closeTab(tab);
      console.log(`Completed the tasks for ${course.courseUrl}`);
    } catch (e) {
      console.error(`Something went wrong in tasks for ${course.courseUrl}`);
      console.error(e.message);
    }
  }
}

// Starting at t = 0
initScrapingTask();