export const download = (category, subFolder, url, fileName) => {
  return new Promise((resolve, reject) => {
    chrome.downloads.download(
      {
        url: url,
        saveAs: false,
        conflictAction: 'overwrite',
        filename: `coursera/${category}/${subFolder}/${fileName}`
      }, (downloadItemId) => {
        resolve();
      }
    )
  })
}