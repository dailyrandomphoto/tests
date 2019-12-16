'use strict';

const {expect} = require('chai');

describe('cache test', () => {
  it('lru-cache', () => {
    const LRU = require('lru-cache');
    const cache = new LRU(2);

    cache.set(1, 1);
    cache.set(2, 2);
    expect(cache.get(1)).to.be.eql(1); // returns 1
    cache.set(3, 3); // evicts key 2
    expect(cache.get(2)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3.
    cache.set(4, 4); // evicts key 1.
    expect(cache.get(1)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3
    expect(cache.get(4)).to.be.eql(4); // returns 4
  });

  it('node-lfu-cache - expected', () => {
    const LFU = require('node-lfu-cache');
    const cache = new LFU(2);

    cache.set(1, 1);
    cache.set(2, 2);
    expect(cache.get(1)).to.be.eql(1); // returns 1
    cache.set(3, 3); // evicts key 2
    expect(cache.get(2)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3.
    cache.set(4, 4); // evicts key 1.
    expect(cache.get(1)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3
    expect(cache.get(4)).to.be.eql(4); // returns 4
  });

  it('node-lfu-cache - actual', () => {
    const LFU = require('node-lfu-cache');
    const cache = new LFU(2);

    cache.set(1, 1);
    cache.set(2, 2);
    expect(cache.get(1)).to.be.eql(1); // returns 1
    cache.set(3, 3); // evicts key 2
    expect(cache.get(2)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3.
    cache.set(4, 4); // evicts key 1.
    expect(cache.get(4)).to.be.eql(undefined); // returns 4
    expect(cache.get(1)).to.be.eql(1); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3
  });

  it('lfu-cache - expected', () => {
    const LFU = require('lfu-cache');
    const cache = new LFU(2);

    cache.set(1, 1);
    cache.set(2, 2);
    expect(cache.get(1)).to.be.eql(1); // returns 1
    cache.set(3, 3); // evicts key 2
    expect(cache.get(2)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3.
    cache.set(4, 4); // evicts key 1.
    expect(cache.get(1)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3
    expect(cache.get(4)).to.be.eql(4); // returns 4
  });

  it('lfu-cache - actual', () => {
    const LFU = require('lfu-cache');
    const cache = new LFU(2);

    cache.set(1, 1);
    cache.set(2, 2);
    expect(cache.get(1)).to.be.eql(1); // returns 1
    cache.set(3, 3); // evicts key 2
    expect(cache.get(2)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(3)).to.be.eql(3); // returns 3.
    cache.set(4, 4); // evicts key 3. but should evicts key 1 !!!
    expect(cache.get(3)).to.be.eql(undefined); // returns undefined (not found)
    expect(cache.get(1)).to.be.eql(1); // returns 1
    expect(cache.get(4)).to.be.eql(4); // returns 4
  });
});
