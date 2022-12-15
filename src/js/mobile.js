import {
	burger,
	headerNav,
	mobileNav,
	rightButton,
	leftButton,
	leftDisplay,
} from './constants.js'
import { openModal, closeModal } from './locations.js'
;['resize', 'load'].forEach(event => {
	window.addEventListener(event, () => {
		if (window.innerWidth < 1215) {
			headerNav.style.display = 'none'
			rightButton.style.display = 'none'
			leftButton.style.display = 'none'

			burger.addEventListener('click', () => {
				headerNav.style.display = 'flex'
			})

			headerNav.addEventListener('click', () => {
				headerNav.style.display = 'none'
			})

			mobileNav.addEventListener('click', e => {
				e.stopPropagation()
			})

			const locationButtonMobile = document.querySelector(
				'.header-top__location_mobile'
			)

			const buttonCloseLocation = document.querySelector(
				'.location-modal__close'
			)

			locationButtonMobile.addEventListener('click', () => {
				openModal()
			})

			buttonCloseLocation.addEventListener('click', () => {
				closeModal()
			})
		} else {
			headerNav.style.display = 'block'
			if (leftDisplay.get()) {
				rightButton.style.display = 'none'
				leftButton.style.display = 'block'
			} else {
				rightButton.style.display = 'block'
				leftButton.style.display = 'none'
			}
		}
	})
})
