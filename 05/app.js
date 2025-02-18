const stats = {
	paragraphs: {
		p1: 0,
	},
	links: {
		'/dolor.html': 0,
	},
}

/* tutaj umieść swój kod */
const pList = document.querySelectorAll('p')

pList.forEach(function (item) {
	item.addEventListener('click', function (e) {
		e.preventDefault()

		if (e.target.tagName === 'P') {
			const elId = e.currentTarget.dataset.id
			const property = 'paragraphs'
			countClick(property, elId)
		} else if (e.target.tagName === 'A') {
			const elLink = e.target.getAttribute('href')
			const property = 'links'
			countClick(property, elLink)
		}
	})
})

function countClick(property, id) {
	if (typeof stats[property][id] === 'undefined') {
		stats[property][id] = 1
	} else {
		stats[property][id]++
	}
}

/* nie modyfikuj kodu poniżej, ale przeanalizuj go */

const statsElement = document.querySelector('.stats')
const fireCustomEvent = function (element, name) {
	// console.log(element, '=>', name)

	const event = new CustomEvent(name, {
		bubbles: true,
	})

	element.dispatchEvent(event)
}

const renderStats = function (data, element) {
	let html = ''
	for (let elementType in data) {
		html += '<ul>'

		for (let key in data[elementType]) {
			html += '<li>'
			html += key + ' -> ' + data[elementType][key]
			html += '</li>'
		}

		html += '</ul>'
	}

	element.innerHTML = html
}

document.addEventListener('click', function (e) {
	const tagName = e.target.tagName
	if (tagName.includes('P') || tagName.includes('A')) {
		fireCustomEvent(statsElement, 'render')
	}
})
statsElement.addEventListener(
	'render',
	renderStats.bind(this, stats, statsElement)
)
document.addEventListener(
	'DOMContentLoaded',
	fireCustomEvent.bind(null, statsElement, 'render')
)
