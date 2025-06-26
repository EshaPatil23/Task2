const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function updateDisplay() {
  let time = elapsedTime;
  let hours = Math.floor(time / 3600000);
  let minutes = Math.floor((time % 3600000) / 60000);
  let seconds = Math.floor((time % 60000) / 1000);
  let milliseconds = time % 1000;

  display.textContent =
    `${hours.toString().padStart(2, '0')} : ` +
    `${minutes.toString().padStart(2, '0')} : ` +
    `${seconds.toString().padStart(2, '0')} : ` +
    `${milliseconds.toString().padStart(3, '0')}`;
}

startBtn.onclick = () => {
  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10); // Update every 10ms
    running = true;
  }
};

pauseBtn.onclick = () => {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
};

resetBtn.onclick = () => {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  laps.innerHTML = '';
};

lapBtn.onclick = () => {
  if (running) {
    let li = document.createElement('li');
    li.textContent = `Lap: ${display.textContent}`;
    laps.appendChild(li);
  }
};

updateDisplay(); // Initialize on load
