const LFU = require('node-lfu-cache');
const cache = new LFU(50);

const random = (min, max) => Math.round(Math.random() * (max - min)) + min;

const cacheFunc = (key, value) => {
  if (cache.has(key)) return cache.get(key);
  cache.set(key, value);
  return value;
}

// Will be called only once
cacheFunc('cold', '123');
// Will be called for 10 times
for (let i = 1; i <= 10; i++) {
  cacheFunc('hot', '456');
}

// Let the cache size limit exceeded
for (let i = 1; i <= 60; i++) {
  // save to cache
  cacheFunc(String(100 + i),  random(100, 900));
  // read from cache
  cacheFunc(String(100 + i),  random(100, 900));
}

cacheFunc('new', '123');

console.log('Cold: ' + cacheFunc('cold', '789'));
// Should be 789 not 123, because the cold cache will be removed from the cache.
console.log('Hot: ' + cacheFunc('hot', '789'));
// Should be 456 not 789, because it is hot and remains in the cache.
console.log('New: ' + cacheFunc('new', '789'));
// Should be 123 not 789, because it is a new item.

// You will find that, when the cache is full, no more items can be added to the cache.
console.log(cache.dump());
