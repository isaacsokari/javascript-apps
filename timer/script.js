const durationInput = document.getElementById('duration');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');

const myTimer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log('Timer Started');
  },
  onTick() {
    console.log('Timer ticked down');
  },
  onComplete() {
    console.log('Timer Complete');
  },
});
