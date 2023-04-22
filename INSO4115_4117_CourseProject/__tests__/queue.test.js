import Queue from "../src/classes/Queue.js";
import fc from "fast-check";

test("Q1", () => {
  const q1 = new Queue();

  q1.enqueue(1);
  q1.enqueue("Maine");

  expect(q1.peek()).toBe(1);
  expect(q1.dequeue()).toBe(1);
  expect(q1.dequeue()).toBe("Maine");
});

test("Q2", () => {
  const q2 = new Queue();

  expect(q2.dequeue()).toBe(null);
  expect(q2.dequeue()).toBe(null);

  q2.enqueue(2);
  q2.enqueue(5);

  expect(q2.dequeue()).toBe(2);

  q2.enqueue(30);

  expect(q2.dequeue()).toBe(5);

  q2.enqueue(35);

  expect(q2.dequeue()).toBe(30);
});

describe("Queue", () => {
  test("should add and remove items in a FIFO order", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()), // Generate an array of integers to enqueue
        (items) => {
          const q = new Queue();
          items.forEach((item) => q.enqueue(item));
          return items.every((item) => q.dequeue() === item);
        }
      ),
      { seed: Date.now() } // Set a random seed for reproducibility
    );
  });

  test("should return null when dequeuing an empty queue", () => {
    const q = new Queue();
    expect(q.dequeue()).toBeNull();
  });

  test("should return the size of the queue", () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()), // Generate an array of integers to enqueue
        (items) => {
          const q = new Queue();
          items.forEach((item) => q.enqueue(item));
          return q.size() === items.length;
        }
      ),
      { seed: Date.now() } // Set a random seed for reproducibility
    );
  });

  test("should clear the queue", () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    q.clear();
    expect(q.size()).toBe(0);
  });
});
