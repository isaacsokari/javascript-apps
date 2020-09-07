class Timer {
  constructor(durationInput, startButton, pauseButton, stopButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.stopButton = stopButton;

    if (typeof callbacks === 'object') {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onPause = callbacks.onPause;
      this.onStop = callbacks.onStop;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
    this.stopButton.addEventListener('click', this.stop);
  }

  start = () => {
    if (this.onStart) this.onStart(this.timeLeft);
    if (isNaN(this.durationInput.value) || !this.durationInput.value) {
      alert('Enter a valid number');
      return;
    }
    this.tick();
    this.interval = setInterval(this.tick, 10);
    this.startButton.disabled = true;
    this.pauseButton.disabled = false;
    this.stopButton.disabled = false;
  };

  tick = () => {
    if (this.onTick) this.onTick(this.timeLeft);
    this.timeLeft <= 0
      ? (() => {
          this.pause();
          if (this.onComplete) this.onComplete();
          this.stopButton.disabled = true;
        })()
      : (this.timeLeft = this.timeLeft - 0.01);
  };

  pause = () => {
    this.onPause(this.timeLeft);
    clearInterval(this.interval);
    this.startButton.disabled = false;
    this.pauseButton.disabled = true;
  };

  stop = () => {
    this.onStop();
    clearInterval(this.interval);
    this.startButton.disabled = false;
    this.stopButton.disabled = true;
    this.pauseButton.disabled = true;
  };

  get timeLeft() {
    return parseFloat(this.durationInput.value);
  }

  set timeLeft(time) {
    this.durationInput.value = time.toFixed(2);
  }
}
