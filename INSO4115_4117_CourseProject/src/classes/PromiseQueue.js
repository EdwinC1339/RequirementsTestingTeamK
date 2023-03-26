import Queue from './Queue.js'
class PromiseQueue extends Queue {
  constructor(delay = 0) {
    super();
    this.delay = delay;
    this.currentPromise = null;
  }

  enqueuePromise(promise) {
    const wrappedPromise = () => new Promise(resolve => {
      promise.then(result => {
        resolve(result);
        if (this.currentPromise === wrappedPromise) {
          this.currentPromise = null;
          this.resolveNextPromise();
        }
      });
    });
    this.enqueue(wrappedPromise);
    this.resolveNextPromise();
  }

  resolveNextPromise() {
    if (this.currentPromise || this.isEmpty()) {
      return;
    }
    const promise = this.dequeue();
    this.currentPromise = promise;
    promise().then(() => {
      setTimeout(() => {
        if (this.currentPromise === promise) {
          this.currentPromise = null;
          this.resolveNextPromise();
        }
      }, this.delay);
    });
  }
}

export default PromiseQueue