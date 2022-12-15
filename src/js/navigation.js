import { leftButton, rightButton, navBar, leftDisplay } from './constants.js'

rightButton.addEventListener('click', () => {
	navBar.style.left = '-80px'
	leftButton.style.display = 'block'
	rightButton.style.display = 'none'
	leftDisplay.set(true)
})

leftButton.addEventListener('click', () => {
	navBar.style.left = '0'
	rightButton.style.display = 'block'
	leftButton.style.display = 'none'
	leftDisplay.set(false)
})
