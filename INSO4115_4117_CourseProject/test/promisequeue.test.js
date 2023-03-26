import PromiseQueue from '../src/classes/PromiseQueue.js'

const myPromiseQueue = new PromiseQueue(1000); // 1 second delay
myPromiseQueue.enqueuePromise(new Promise(resolve => setTimeout(() => resolve("Result 1"), 2000)));
myPromiseQueue.enqueuePromise(new Promise(resolve => setTimeout(() => resolve("Result 2"), 1000)));
myPromiseQueue.enqueuePromise(new Promise(resolve => setTimeout(() => resolve("Result 3"), 3000)));

function processNextPromise() {
  myPromiseQueue.resolveNextPromise();
  if (!myPromiseQueue.isEmpty()) {
    setTimeout(processNextPromise, myPromiseQueue.delay);
  }
}

processNextPromise(); // Start processing promises

setTimeout(() => console.log("Processed all promises"), 5000); // Wait 5 seconds to see the results
