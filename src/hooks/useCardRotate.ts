const useCardRotate = () => {
	const cardSignup: HTMLElement | null = document.getElementById('card-signup')
	const cardRecover: HTMLElement | null = document.getElementById('card-recover')
	function recover() {
		document.getElementById('cards-draaideur')?.classList.add('rotate')
		if (cardSignup) cardSignup.style.display = 'none'
		if (cardRecover) cardRecover.style.display = 'block'
	}
	function signup() {
		document.getElementById('cards-draaideur')?.classList.add('rotate')
		if (cardRecover) cardRecover.style.display = 'none'
		if (cardSignup) cardSignup.style.display = 'block'
	}
	function login() {
		document.getElementById('cards-draaideur')?.classList.remove('rotate')
	}
	function see() {
		document.getElementById('cards-draaideur')?.classList.remove('rotate')
		// document.getElementById('card-see-profile').style.display = 'block'
	}
	function change() {
		document.getElementById('cards-draaideur')?.classList.add('rotate')
		// document.getElementById('card-change-profile').style.display = 'block'
		// document.getElementById('card-see-profile').style.display = 'none'
	}

	return { signup, recover, login, see, change }
}
export default useCardRotate
