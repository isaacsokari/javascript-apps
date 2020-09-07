const durationInput = document.getElementById('duration');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;

let duration;
let step;
let wasPaused = false;
let cache = { offset: 0 };

const myTimer = new Timer(durationInput, startButton, pauseButton, stopButton, {
  onStart(totalDuration) {
    if (totalDuration !== cache.pausedAt) {
      duration = totalDuration;
      step = parseFloat(perimeter / (duration * 100));
      cache.offset = 0;
    }
    
    if (!wasPaused) step = parseFloat(perimeter / (duration * 100));
  },
  onTick(timeLeft) {
    cache.offset -= step;
    circle.setAttribute('stroke-dashoffset', cache.offset);
  },

  onPause(timeLeft) {
    wasPaused = true;
    cache.pausedAt = timeLeft;
  },

  onStop() {
    durationInput.value = Math.floor(duration);
    wasPaused = false;
    cache.pausedAt = undefined;
    cache.offset = 0;
    circle.setAttribute('stroke-dashoffset', 0);
    circle.setAttribute('stroke-dasharray', perimeter);
  },

  onComplete() {
    durationInput.value = Math.floor(duration);
    wasPaused = false;
    cache.offset = 0;
    cache.pausedAt = undefined;
    circle.setAttribute('stroke-dashoffset', 0);
    circle.setAttribute('stroke-dasharray', perimeter);
  },
});
