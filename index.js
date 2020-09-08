#!/usr/bin/env node

const chokidar = require('chokidar');

const debounce = (func, delay = 1000) => {
  let timerId;

  return (...args) => {
    if (timerId) clearTimeout(timerId);

    timerId = setTimeout((...args) => func.apply(null, args), delay);
  };
};

chokidar
  .watch('.', {
    ignored: 'node_modules/*',
  })
  .on(
    'add',
    debounce(() => {
      console.log('file(s) added');
    }, 1000)
  )
  .on(
    'change',
    debounce(() => {
      console.log('file(s) changed');
    })
  )
  .on(
    'unlink',
    debounce(() => {
      console.log('file(s) unlinked');
    })
  );
