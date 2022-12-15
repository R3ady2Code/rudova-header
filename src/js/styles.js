import { searchInput, closeIcon, searchInputBlock } from './constants.js'

searchInput[1].addEventListener('focus', () => {
	searchInputBlock[1].classList.add('search-input_focus')
})

searchInput[1].addEventListener('blur', () => {
	if (!searchInput.value) {
		searchInputBlock[1].classList.remove('search-input_focus')
	}
})

searchInput.forEach((si, indx) =>
	si.addEventListener('input', e => {
		if (e.target.value) {
			closeIcon[indx].style.display = 'block'
		} else {
			closeIcon[indx].style.display = 'none'
		}
	})
)

closeIcon.forEach((ci, indx) => {
	ci.addEventListener('click', () => {
		searchInput[indx].value = ''
		closeIcon[indx].style.display = 'none'
		if (indx === 0) {
			cities = allFetchedCities.filter(city => !selectedCities.includes(city))
		}
	})
})
