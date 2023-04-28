const colors = ['#FF00FF', '#00FA9A', '#00FFFF', '#FFE4C4', '#ff1a1a', ' #bfbfbf']
const startBtn = document.querySelector('#startButton');
const timeList = document.querySelector('#time-list');
const borad = document.querySelector('#board');
const timer = document.querySelector('#time');
const screens = document.querySelectorAll('.screen');

let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
	event.preventDefault();
	const $target = event.target

	const screen = $target.closest('.screen');
	screen.classList.add('up');
})


timeList.addEventListener('click', (event) => {
	if (event.target.classList.contains('time-btn')) {
		const $target = event.target;
		time = parseInt($target.dataset.time);

		const screen = $target.closest('.screen');
		screen.classList.add('up');

		startGame();
	}
})

board.addEventListener('click', (event) => {
	if (event.target.classList.contains('circle')) {
		score++;
		event.target.remove();
		createRandomCircle();
	}
})


function startGame() { 
	setTime(time);
	createRandomCircle();
	const interval = setInterval(() => {
		decreaseTimer(interval)
	}, 1000);
}

function decreaseTimer(interval) {
	if (time === 0) {
		clearInterval(interval);
		finishGame();
	} else {
		let current = --time;
		setTime(current)
	}
}	

function setTime(value) {
	if (value < 10) {
		value = `0${value}`;
	} 
	timer.innerHTML = `00:${value}`;
}

function createRandomCircle() {
	const circle = document.createElement('div');

	const size = getRandomNumber(10, 45);
	const color = getRandomColor();
	const {width, height} = board.getBoundingClientRect();
	const x = getRandomNumber(0, width - size);
	const y = getRandomNumber(0, height - size);

	circle.classList.add('circle');
	circle.style.height = `${size}px`; 
	circle.style.width = `${size}px`;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	circle.style.background = color;

	board.append(circle);
}

function getRandomNumber(min = 5, max = 50) {
	return Math.round(Math.random() * (max - min) + min);
}

function finishGame() {
	timer.parentNode.classList.add('hide');
	borad.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>
	 	<button class="restart" id="restart">Restart</button>
	`
	const restartBtn = document.querySelector('#restart');

	restartBtn.addEventListener('click', (event) => {
		event.preventDefault();
		timer.parentNode.classList.remove('hide');
		score = 0;
		borad.innerHTML = '';
		screens[1].classList.remove('up');

	})
}

function getRandomColor() {
	const index = Math.round(Math.random() * colors.length);
	return colors[index];
}

