/* eslint-disable prefer-template */
const path = require('path');
const { Worker, isMainThread } = require('worker_threads');

const pathToResizeWorker = path.resolve(__dirname, 'resizeWorker.js');
const pathToMonochromeWorker = path.resolve(__dirname, 'monochromeWorker.js');

function uploadPathResolver(filename) {
  return path.resolve(__dirname, '../uploads', filename);
}

function imageProcessor(filename) {
  const sourcePath = uploadPathResolver(filename);
  const resizedDestination = uploadPathResolver('resized-' + filename);
  const monochromeDestination = uploadPathResolver('monochrome-' + filename);

  let resizeWorkerFinished = false;
  let monochromeWorkerFinished = false;

  return new Promise((resolve, reject) => {
    if (isMainThread) {
      try {
        const resizeWorker = Worker(pathToResizeWorker, {
          workerData: {
            source: sourcePath,
            destination: resizedDestination,
          },
        })
          .on('message', (message) => {
            resizeWorkerFinished = true;
            if (monochromeWorkerFinished) {
              resolve('resizeWorker finished processing');
            }
          })
          .on('error', (error) => {
            reject(new Error(error.message));
          })
          .on('exit', (code) => {
            if (code !== 0) {
              reject(new Error('Exited with status code ' + code));
            }
          });
        const monochromeWorker = Worker(pathToMonochromeWorker, {
          workerData: {
            source: sourcePath,
            destination: monochromeDestination,
          },
        })
          .on('message', (message) => {
            monochromeWorkerFinished = true;
            if (resizeWorkerFinished) {
              resolve('monochrome worker finised processing');
            }
          })
          .on('error', (error) => {
            reject(new Error(error.message));
          })
          .on('exit', (code) => {
            if (code !== 0) {
              reject(new Error('Exited withh status code ' + code));
            }
          });
      } catch (e) {
        reject(e);
      }
    } else {
      reject(new Error('not on the main thread'));
    }
  });
}

module.exports = imageProcessor;
