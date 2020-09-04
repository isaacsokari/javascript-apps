class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (typeof callbacks === 'object') {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if (this.onStart) this.onStart();
    this.tick();
    this.interval = setInterval(this.tick, 1000);
    this.startButton.disabled = true;
  };

  tick = () => {
    if (this.onTick) this.onTick();
    this.timeLeft <= 0
      ? (() => {
          this.pause();
          if (this.onComplete) this.onComplete();
        })()
      : (this.timeLeft = this.timeLeft - 1);
  };

  pause = () => {
    clearInterval(this.interval);
    this.startButton.disabled = false;
  };

  get timeLeft() {
    return parseFloat(this.durationInput.value);
  }

  set timeLeft(time) {
    this.durationInput.value = time;
  }
}