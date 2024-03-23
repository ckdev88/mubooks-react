export default function setDraaideurHeight(): void {
	console.log('run setDraaideurHeight')

	const axis = document.getElementsByClassName('axis')[0] as HTMLDivElement
	const draaideur = document.getElementsByClassName('axis')[0].parentNode
	const cards = axis.getElementsByClassName('card') as HTMLCollectionOf<HTMLDivElement>

	let max: number = cards[0].offsetHeight
	for (let i = 0; i < cards.length; i++) {
		// get max height
		if (cards[i].offsetHeight > max) max = cards[i].offsetHeight
	}
	for (let i = 0; i < cards.length; i++) {
		//	apply max height to all inner draaideur-cards
		cards[i].style.height = max + 'px'
	}
	draaideur.style.height = max + 'px'
	axis.style.height = max + 'px'

}
