import Queue from '../src/classes/Queue.js'

const q1 = new Queue();

q1.enqueue(1);
q1.enqueue("Maine");

console.assert(q1.peek() === 1);
console.assert(q1.dequeue() === 1);
console.assert(q1.dequeue() === "Maine");

const q2 = new Queue();

console.assert(q2.dequeue() === null);
console.assert(q2.dequeue() === null);

q2.enqueue(2)
q2.enqueue(5)

console.assert(q2.dequeue() === 2)

q2.enqueue(30)

console.assert(q2.dequeue() === 5)

q2.enqueue(35)

console.assert(q2.dequeue() === 30)