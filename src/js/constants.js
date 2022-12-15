//styles
export const searchInputBlock = document.querySelectorAll('.search-input')

export const searchInput = document.querySelectorAll('.search-input>input')
export const closeIcon = document.querySelectorAll('.search-input__close')

//navigation
export const leftButton = document.querySelector('.navigation__arrow_left')
export const rightButton = document.querySelector('.navigation__arrow_right')

export const navBar = document.querySelector('.navigation')

class isLeftDisplay {
	constructor() {
		this.value = false
	}
	get() {
		return this.value
	}
	set(value) {
		this.value = value
	}
} //какая стрелка в навбаре показывается

export const leftDisplay = new isLeftDisplay()

//locations
export const locationButton = document.querySelector('.header-top__location')

export const locationModal = document.querySelector('.location-modal')
export const locationInput = document.querySelector(
	'.location-modal__header>.search-input>input'
)

export const locationsList = document.querySelector('.location-modal__list')
export const selectedList = document.querySelector('.location-modal__cities')
export const headerLocation = document.querySelector(
	'.header-top__location>.text-basic'
)
export const headerLocationMobile = document.querySelector(
	'.header-top__location_mobile>.text-basic'
)
export const saveButton = document.querySelector('.location-modal__save-button')

//mobile

export const burger = document.querySelector('.burger')
export const headerNav = document.querySelector('.nav-mobile__container')
export const mobileNav = document.querySelector('.nav-mobile')
