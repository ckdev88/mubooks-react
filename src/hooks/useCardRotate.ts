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
	return { signup, recover, login }
}
export default useCardRotate
