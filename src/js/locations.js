import {
	locationButton,
	locationModal,
	locationInput,
	locationsList,
	selectedList,
	headerLocation,
	headerLocationMobile,
	saveButton,
} from './constants.js'

let allFetchedCities = []
let cities = []
let selectedCities = []

let cityFromList
let selectedCitiesElements

let isLoaded = false
let isModalWasOpened = false

//open modal
export async function openModal() {
	locationModal.style.display = 'block'
	locationInput.focus()
	if (!isModalWasOpened) {
		cities = await fetchLocations()
		cities = cities.filter(element => element != null)
		cities = cities.map(city => city.name)
		allFetchedCities.push(...cities)
	}

	showLocations()
	isModalWasOpened = true
}

export function closeModal() {
	locationModal.style.display = 'none'
}

locationButton.addEventListener('click', e => {
	e.stopPropagation()
	openModal()
})

document.addEventListener('click', e => {
	const withinBoundaries = e.composedPath().includes(locationModal)

	if (!withinBoundaries) {
		closeModal()
	}
})

//fetch locations
async function fetchLocations() {
	try {
		const allCities = []
		await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities', {
			method: 'GET',
			headers: {
				'X-RapidAPI-Key': 'de68ce76d0msh9599ec4d8398169p1429e7jsn14e891a94f77',
				'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
			},
		})
			.then(res => res.json())
			.then(({ data }) => {
				allCities.push(data)
			})
		isLoaded = true
		return [].concat(...allCities)
	} catch (error) {
		console.log(error)
	}
}

//show locations
window.addEventListener('load', () => {
	if (!isLoaded) {
		locationsList.innerHTML =
			'<div class="lds-ripple"><div></div><div></div></div>'
	}
})

function showLocations() {
	locationsList.style.display = 'block'
	locationsList.innerHTML = `<ul>
		${cities
			.filter(city => !selectedCities.includes(city))
			.map(
				city =>
					`<li class='location-modal__city' data-city=${city}>` +
					'<b>' +
					locationInput.value.charAt(0).toUpperCase() +
					locationInput.value.slice(1) +
					'</b>' +
					city.slice(locationInput.value.length, city.length) +
					'</li>'
			)
			.join(' ')}
	</ul>`
	cityFromList = document.querySelectorAll('.location-modal__city')
	for (let i = 0; i < cityFromList.length; i++) {
		cityFromList[i].addEventListener('click', () => {
			addCityToSelected(i)
		})
	}
}

function showSelectedLocations() {
	selectedList.innerHTML = `${selectedCities
		.map(
			city => `
		<div class='select-city'>
			<span class="text-basic">${city}</span>
			<img
				src="./img/icons/close-white.svg"
				alt="Close Icon"
			/>
			</div>`
		)
		.join(' ')}`
	if (!selectedCities.length) {
		headerLocation.innerHTML = 'Любой регион'
		headerLocationMobile.innerHTML = 'Любой регион'
	} else {
		headerLocation.innerHTML = selectedCities.join(',')
		headerLocationMobile.innerHTML = selectedCities.join(',')
	}
	selectedCitiesElements = document.querySelectorAll('.select-city')
	for (let i = 0; i < selectedCitiesElements.length; i++) {
		selectedCitiesElements[i].addEventListener('click', () => {
			deleteCityFromSelected(i)
		})
	}
}

//add/delete city to selected

function addCityToSelected(i) {
	selectedCities.push(cityFromList[i].dataset.city)
	showLocations()
	showSelectedLocations()
}

function deleteCityFromSelected(i) {
	selectedCities = selectedCities.filter((city, indx) => indx !== i)

	showLocations()
	showSelectedLocations()
}

//search cities

locationInput.addEventListener('input', e => {
	if (e.target.value) {
		cities = allFetchedCities.filter(city =>
			city.toLowerCase().startsWith(e.target.value.trim().toLowerCase())
		)
	} else {
		cities = allFetchedCities.filter(city => !selectedCities.includes(city))
	}

	showLocations()
})

//debag refetch cities
locationModal.addEventListener('click', e => {
	e.stopPropagation()
})

//save cookies

saveButton.addEventListener('click', () => {
	saveButton.disabled = true
	setTimeout(() => {
		saveCookies(selectedCities)
		saveButton.disabled = false
	}, 2000)
})

function saveCookies(cities) {
	const cookie = JSON.stringify(cities)
	document.cookie = `selectedCities=${cookie};path=/;max-age=(60*60*24*10)'`
	alert('Cities was saved in cookie')
}
