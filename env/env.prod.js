const SCHEDULER_INTERVAL = 300000; // in milliseconds
const CLOSE_TAB_TIMEOUT = 3000; // in milliseconds
const PAGE_LOAD_TIMEOUT = 5000; // in milliseconds
const COURSERA_BASE_URL = `https://www.coursera.org`;

const ACTIONS = {
    GET_WEEK_INFO: "GET_WEEK_INFO",
    GET_VIDEO_LESSONS_INFO: "GET_VIDEO_LESSONS_INFO",
    GET_VIDEO_INFO: "GET_VIDEO_INFO"
};

const EVENTS = {
    CLICK: new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    }),
    INPUT: new Event('input', {
        bubbles: true
    })
};

export const CONFIG = {
    SCHEDULER_INTERVAL,
    CLOSE_TAB_TIMEOUT,
    PAGE_LOAD_TIMEOUT,
    ACTIONS,
    EVENTS,
    COURSERA_BASE_URL
}