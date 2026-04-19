const btnPlay = document.querySelector('.fa-play')
const btnPause = document.querySelector('.fa-pause')
const btnStop = document.querySelector('.fa-stop')
const btnReset = document.querySelector('.fa-xmark')
const btnArchive = document.querySelector('.archive-btn')
const btnClose = document.querySelector('.close')
const btnPaint = document.querySelector('.fa-paintbrush')
const btnQuestion = document.querySelector('.fa-question')
const showtime = document.querySelector('.showtime')
const time = document.querySelector('.recorded-time')
const lastTime = document.querySelector('.last-record')

const popup = document.querySelector('.popup')
const btns = document.querySelectorAll('.buttons-interface')
const playPop = document.querySelector('.play-popup')
const pausePop = document.querySelector('.pause-popup')
const stopPop = document.querySelector('.stop-popup')
const xPop = document.querySelector('.xmark-popup')
const archivePop = document.querySelector('.archives-text-popup')

const popupColors = document.querySelector('.popup-colors')
const btnsColors = document.querySelectorAll('.button-color')
const btnColorRed = document.querySelector('.red')
const btnColorGreen = document.querySelector('.green')
const btnColorBlue = document.querySelector('.blue')

const archive = document.querySelector('.archive-records')
const archiveList = document.querySelector('.archive-list')

const liItem = document.createElement('li')
const liSpan = document.createElement('span')

const minCl = document.querySelector('.minutes')
const secCl = document.querySelector('.seconds')
const cenCl = document.querySelector('.centiseconds')

const arrayBtns = []
arrayBtns.push(btnPlay, btnPause, btnStop, btnReset)

const arrayPopElements = []
arrayPopElements.push(playPop, pausePop, stopPop, xPop, archivePop)

let minutes = 0
let seconds = 0
let centiseconds = 0
let counter = 0
let playCounter = 0
let myInterval
let archLength

function formatMinAndSec(unit) {
	return unit.toString().padStart(2, '0')
}

function formatCentisec(unit) {
	return unit.toString().padStart(3, '0')
}

const timer = () => {
	centiseconds++

	time.textContent = `${formatMinAndSec(minutes)}:${formatMinAndSec(seconds)}:${formatCentisec(centiseconds)}`
	// time.textContent = `${minutes}:${seconds}:${centiseconds}`

	if (centiseconds >= 100) {
		centiseconds = 0
		counter = 1

		if (counter === 1) {
			seconds++
		}
		if (seconds >= 60) {
			seconds = 0
			counter = 2
		}
		if (counter === 2) {
			minutes++
		}
	}
}

const timeStart = () => {
	if (playCounter === 0) {
		myInterval = setInterval(timer, 10)
		// myInterval = setInterval(timer, 100)
		playCounter++
	}
}

const timeStop = () => {
	clearInterval(myInterval)
	if (playCounter > 0) playCounter--
}

const showLastRecord = () => {
	lastTime.textContent = 'Last time: ' + time.textContent
	lastTime.style.visibility = 'visible'
}

const showRecords = () => {
	if (archiveList.childElementCount == 0 && time.textContent != '0:0:0') {
		const liItem = document.createElement('li')
		const liSpan = document.createElement('span')
		liItem.textContent = 'Measurement ' + `${archiveList.childElementCount + 1}` + ': '
		liSpan.textContent = time.textContent
		liSpan.style.fontWeight = 'bold'
		liSpan.style.paddingLeft = 20 + 'px'
		liItem.append(liSpan)
		archiveList.append(liItem)
	} else if (
		archiveList.childElementCount > 0 &&
		time.textContent != '0:0:0' &&
		archiveList.childElementCount <= 4 &&
		time.textContent != archLength[archLength.length - 1].textContent
	) {
		{
			const liItem = document.createElement('li')
			const liSpan = document.createElement('span')
			liItem.textContent = 'Measurement ' + `${archiveList.childElementCount + 1}` + ': '
			liSpan.textContent = time.textContent
			liSpan.style.fontWeight = 'bold'
			liSpan.style.paddingLeft = 20 + 'px'
			liItem.append(liSpan)
			archiveList.append(liItem)
		}
	}

	archLength = archiveList.getElementsByTagName('span')
	console.log(archLength)
}

const clearArchive = () => {
	for (let i = 0; i <= 4; i++) {
		archiveList.lastElementChild.remove()
	}
}

const timeReset = () => {
	minutes = 0
	seconds = 0
	centiseconds = 0
	clearInterval(myInterval)
	if (playCounter > 0) playCounter--
	console.log(playCounter)
	time.textContent = `${formatMinAndSec(minutes)}:${formatMinAndSec(seconds)}:${formatCentisec(centiseconds)}`
	lastTime.style.visibility = 'hidden'

	clearArchive()
}

const showPopUp = () => {
	popup.classList.toggle('show-popup')
}

const showColors = () => {
	popupColors.classList.toggle('show-colors')

	for (let i = 0; i <= btnsColors.length; i++) {
		btnsColors[i].classList.toggle('show-btns')
	}
}

const changeColorRed = () => {
	time.style.color = 'rgba(244, 75, 26)'
	btnArchive.style.borderColor = 'rgba(244, 75, 26)'
	btnArchive.classList.add('red-change')

	btnQuestion.classList.remove('paint-questio-green')
	btnQuestion.classList.add('paint-questio-red')
	btnQuestion.classList.remove('paint-questio-blue')

	btnPaint.classList.remove('paint-questio-green')
	btnPaint.classList.add('paint-questio-red')
	btnPaint.classList.remove('paint-questio-blue')

	btnArchive.classList.remove('green-change')
	btnArchive.classList.remove('blue-change')
	btnArchive.classList.add('red-change')

	for (let i = 0; i <= btns.length; i++) {
		btns[i].style.borderColor = 'rgba(244, 75, 26)'
		arrayBtns[i].classList.remove('green-change')
		arrayBtns[i].classList.remove('blue-change')
		arrayBtns[i].classList.add('red-change')
	}
}
const changeColorGreen = () => {
	time.style.color = 'rgb(134, 212, 134)'
	btnArchive.style.borderColor = 'rgb(134, 212, 134)'

	btnQuestion.classList.add('paint-questio-green')
	btnQuestion.classList.remove('paint-questio-red')
	btnQuestion.classList.remove('paint-questio-blue')

	btnPaint.classList.add('paint-questio-green')
	btnPaint.classList.remove('paint-questio-red')
	btnPaint.classList.remove('paint-questio-blue')

	btnArchive.classList.remove('red-change')
	btnArchive.classList.remove('blue-change')
	btnArchive.classList.add('green-change')

	for (let i = 0; i <= btns.length; i++) {
		btns[i].style.borderColor = 'rgb(134, 212, 134)'
		arrayBtns[i].classList.remove('red-change')
		arrayBtns[i].classList.remove('blue-change')
		arrayBtns[i].classList.add('green-change')
	}
}

const greenPopUp = () => {
	btnClose.classList.remove('close-blue')
	btnClose.classList.add('close-green')
	btnClose.style.borderColor = 'rgba(134, 212, 134)'

	for (let i = 0; i <= arrayPopElements.length; i++) {
		arrayPopElements[i].classList.remove('blue-popup')
		arrayPopElements[i].classList.add('green-popup')
	}
}

const bluePopUp = () => {
	btnClose.classList.remove('close-green')
	btnClose.classList.add('close-blue')
	btnClose.style.borderColor = 'rgba(37, 93, 216)'

	for (let i = 0; i <= arrayPopElements.length; i++) {
		arrayPopElements[i].classList.remove('green-popup')
		arrayPopElements[i].classList.add('blue-popup')
	}
}

const redPopUp = () => {
	btnClose.classList.remove('close-blue')
	btnClose.classList.remove('close-green')
	btnClose.style.borderColor = 'rgba(244, 75, 26)'

	for (let i = 0; i <= arrayPopElements.length; i++) {
		arrayPopElements[i].classList.remove('green-popup')
		arrayPopElements[i].classList.remove('blue-popup')
	}
}

const changeColorBlue = () => {
	time.style.color = 'rgb(37, 93, 216)'
	btnArchive.style.borderColor = 'rgb(37, 93, 216)'

	btnQuestion.classList.remove('paint-questio-green')
	btnQuestion.classList.remove('paint-questio-red')
	btnQuestion.classList.add('paint-questio-blue')

	btnPaint.classList.remove('paint-questio-green')
	btnPaint.classList.remove('paint-questio-red')
	btnPaint.classList.add('paint-questio-blue')

	btnArchive.classList.remove('red-change')
	btnArchive.classList.remove('green-change')
	btnArchive.classList.add('blue-change')

	for (let i = 0; i <= btns.length; i++) {
		btns[i].style.borderColor = 'rgb(37, 93, 216)'
		arrayBtns[i].classList.remove('red-change')
		arrayBtns[i].classList.remove('green-change')
		arrayBtns[i].classList.add('blue-change')
	}
}

const changeColor = e => {
	if (e.target.classList.contains('red')) {
		changeColorRed()
	} else if (e.target.classList.contains('green')) {
		changeColorGreen()
	} else if (e.target.classList.contains('blue')) {
		changeColorBlue()
	}
}

btnPlay.addEventListener('click', timeStart)
btnPause.addEventListener('click', timeStop)
btnStop.addEventListener('click', timeStop)
btnStop.addEventListener('click', showLastRecord)
btnReset.addEventListener('click', timeReset)
btnArchive.addEventListener('click', showRecords)
btnQuestion.addEventListener('click', showPopUp)
btnClose.addEventListener('click', function () {
	popup.classList.remove('show-popup')
})
btnPaint.addEventListener('click', showColors)
// btnPaint.addEventListener('click', correctPopUpcolor)
btnColorRed.addEventListener('click', changeColor)
btnColorRed.addEventListener('click', redPopUp)
btnColorGreen.addEventListener('click', changeColor)
btnColorGreen.addEventListener('click', greenPopUp)
btnColorBlue.addEventListener('click', changeColor)
btnColorBlue.addEventListener('click', bluePopUp)
