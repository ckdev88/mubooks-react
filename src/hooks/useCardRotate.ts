const useCardRotate = () => {
	function recover() {
		document.getElementById('cards-draaideur').classList.add('rotate')
		document.getElementById('card-signup').style.display = 'none'
		document.getElementById('card-recover').style.display = 'block'
	}
	function signup() {
		document.getElementById('cards-draaideur').classList.add('rotate')
		document.getElementById('card-recover').style.display = 'none'
		document.getElementById('card-signup').style.display = 'block'
	}
	function login() {
		document.getElementById('cards-draaideur').classList.remove('rotate')
	}
	function see() {
		document.getElementById('cards-draaideur')?.classList.remove('rotate')
		// document.getElementById('card-see-profile').style.display = 'block'
	}
	function change() {
		document.getElementById('cards-draaideur').classList.add('rotate')
		// document.getElementById('card-change-profile').style.display = 'block'
		// document.getElementById('card-see-profile').style.display = 'none'
	}

	return { signup, recover, login, see, change }
}
export default useCardRotate
