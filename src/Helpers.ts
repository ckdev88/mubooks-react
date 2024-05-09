function isUrl(url: string) {
	if (url.slice(0, 8) === 'https://') return true
	return false
}

function getOlCover(id: string, size: CoverSize = undefined) {
	let appendSize: string = ''
	if (size) appendSize = '-' + size

	if (id.slice(0, 2) === 'OL') return 'https://covers.openlibrary.org/b/olid/' + id + appendSize + '.jpg'
	return 'https://covers.openlibrary.org/b/isbn/' + id + appendSize + '.jpg'
}

function getBookCover(url: string, size: CoverSize) {
	let appendSize: string = ''
	if (size) {
		appendSize = '-' + size
		return url.replace('.jpg', appendSize + '.jpg')
	}
	return url
}

function debounce<T extends (...args: []) => void>(func: T, delay: number): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout 
	return function (this: object) {
		const context = this || window 
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func.apply(context), delay)
	}
}

function openCalendarPopUp(dateFieldId: string): void {
	const dateElement = document.getElementById(dateFieldId) as HTMLInputElement
	try {
		dateElement.showPicker()
	} catch (e) {
		dateElement.classList.remove('calendar-hidden')
		dateElement.focus()
		console.error(e)
	}
}

export { isUrl, getOlCover, getBookCover, debounce, openCalendarPopUp }
