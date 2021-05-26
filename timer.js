const refs = {
  days: document.querySelector("[data-value='days']"),
  hours: document.querySelector("[data-value='hours']"),
  mins: document.querySelector("[data-value='mins']"),
  secs: document.querySelector("[data-value='secs']"),
};

class CountdownTimer {
  constructor(selector, targetDate) {
    this.$el = document.querySelector(selector);
    this.targetDate = targetDate;
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.mins.textContent = `${mins}`;
    refs.secs.textContent = `${secs}`;
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  intervalId = setInterval(() => {
    const startTime = Date.now();
    const deltaTime = this.targetDate - startTime;
    this.getTimeComponents(deltaTime);

    if (deltaTime < 0) {
      clearInterval();
      refs.days.textContent = "00";
      refs.hours.textContent = "00";
      refs.mins.textContent = "00";
      refs.secs.textContent = "00";
    }
  }, 1000);
}

new CountdownTimer(
  ...Object.values({
    selector: "#timer-1",
    targetDate: new Date("May 30, 2021"),
  })
);
