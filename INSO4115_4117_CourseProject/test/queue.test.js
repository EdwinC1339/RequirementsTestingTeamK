import Queue from '../src/classes/Queue.js'

test('Q1', () => {
    const q1 = new Queue();

    q1.enqueue(1);
    q1.enqueue("Maine");

    expect(q1.peek()).toBe(1);
    expect(q1.dequeue()).toBe(1);
    expect(q1.dequeue()).toBe("Maine");
})

test('Q2', () => {
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
    
})


