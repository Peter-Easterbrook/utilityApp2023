// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);

// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const HOURHAND = document.querySelector('#hours-hand');
const MINUTEHAND = document.querySelector('#minutes-hand');
const SECONDHAND = document.querySelector('#seconds-hand');

const now = new Date();
console.log(now);
let hr = now.getHours();
let min = now.getMinutes();
let sec = now.getSeconds();
console.log('Hour: ' + hr + ' Minute: ' + min + ' Second: ' + sec);

let hrPosition = (hr * 360) / 12 + (min * (360 / 60)) / 12;
let minPosition = (min * 360) / 60 + (sec * (360 / 60)) / 60;
let secPosition = (sec * 360) / 60;

function runTheClock() {
  hrPosition = hrPosition + 3 / 360;
  minPosition = minPosition + 6 / 60;
  secPosition = secPosition + 6;

  HOURHAND.style.transform = 'rotate(' + hrPosition + 'deg)';
  MINUTEHAND.style.transform = 'rotate(' + minPosition + 'deg)';
  SECONDHAND.style.transform = 'rotate(' + secPosition + 'deg)';
}

setInterval(runTheClock, 1000);

const dateEl = document.querySelector('.date');

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const date = now.getDate();
const day = now.getDay();
const month = now.getMonth();
const year = now.getFullYear();
dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span> ${year}`;

const timeEl = document.querySelector('.time');

function updateTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const hours = now.getHours();
  const hoursForClock = hours >= 13 ? hours % 12 : hours;
  const ampm = hours >= 12 ? 'pm' : 'am';

  timeEl.innerHTML = `${hoursForClock}:${
    mins < 10 ? `0${mins}` : mins
  }<span>${ampm}</span>`;
}

// Call updateTime() every second
setInterval(updateTime, 1000);
