const durationInput = document.getElementById('duration');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r') * 2 * Math.PI;

let duration;
let cache = { offset: 0 };

const myTimer = new Timer(durationInput, startButton, pauseButton, stopButton, {
  onStart(totalDuration) {
    duration = totalDuration;
  },
  onTick(timeLeft) {
    let offset = -(((duration - timeLeft) / duration) * perimeter);

    circle.setAttribute('stroke-dashoffset', offset);
  },

  onPause(timeLeft) {
    const { initialDuration, offset, elapsed } = cache;

    /*     cache.pausedAt = timeLeft;

    cache.initialDuration = initialDuration ? initialDuration : duration;

    cache.offset = offset
      ? Number(offset) - Math.abs(Number(circle.getAttribute('stroke-dashoffset')).toFixed(2))
      : +Number(circle.getAttribute('stroke-dashoffset')).toFixed(2);

      console.log(cache.offset)
    cache.elapsed = elapsed
      ? elapsed + (duration - timeLeft).toFixed(2)
      : (duration - timeLeft).toFixed(2); */
  },

  onStop() {
    durationInput.value = Math.floor(duration);
    circle.setAttribute('stroke-dashoffset', 0);
    circle.setAttribute('stroke-dasharray', perimeter);
  },

  onComplete() {
    durationInput.value = Math.floor(duration);
    circle.setAttribute('stroke-dashoffset', 0);
    circle.setAttribute('stroke-dasharray', perimeter);
  },
});
