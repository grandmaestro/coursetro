import config from '../store/config.js';

export const scrapeWeekInfo = () => {
  const weekEle = document.querySelectorAll(".rc-WeekCollectionNavigationItem .rc-NavigationDrawer a");
  const weekHref = [];
  weekEle.forEach((w) => weekHref.push(w.href));
  return weekHref;
}

export const scrapeVideoLessonsInfo = () => {
  const vidEle = document.querySelectorAll(".od-lesson-collection-element ul li a");
  const videoHref = [];
  vidEle.forEach((vid) => {
    if (vid.innerText.includes("Video:")) {
      videoHref.push(vid.href);
    }
  });
  return videoHref;
}

export const scrapeVideoInfo = () => {
  const downloadToggleBtn = document.querySelector("#downloads-dropdown-btn");
  downloadToggleBtn.dispatchEvent(config.env.EVENTS.CLICK);
  const downloadVid = document.querySelector(".rc-DownloadsDropdown a[data-track-component='download_video']");
  const subtitle = document.querySelector(".rc-DownloadsDropdown a[data-track-component='download_subtitle']");
  return {
    videoHref: downloadVid.href,
    subTitleHref: subtitle.href
  }

}

