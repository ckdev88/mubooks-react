// @ts-nocheck
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import LoginCard from "../../components/account/LoginCard"
import SignupCard from "../../components/account/SignupCard"
import RecoverCard from "../../components/account/RecoverCard"
// TODO: set setDraaideurHeight composable equivalent in react

async function loginAccount() {
	console.log('login into account')
}
async function seeCurrentUser() {
	console.log('see current user')
}
async function logoutAccount() {
	console.log('log out of account')
}

export default function Login() {

function toProfile() {
	console.log('click toProfile')
	useNavigate('/profile') // TODO: invalid hook call
}
	return (
		<>
			<div id="welcome-logo" style={{marginBottom:1+'rem'}}>
				<h1 style={{ textAlign: 'center' }}>MuBooks</h1>
				<img id="welcome-logo-img" src="/img/logo.svg" style={{	maxWidth: '33%',
	display: 'block', margin: '0 auto', position: 'relative', zIndex: 2 }} />
			</div>
			<div id="cards-draaideur" className="cards-draaideur">
				<div className="axis">
					<LoginCard />
					<SignupCard />
					<RecoverCard />
				<button onClick={()=>toProfile()}>To profile</button>
				</div>
			</div>
			<br style={{ clear: 'both' }} />
			<div className="hidden">
				<br />
				<button onClick={()=>toProfile}>To profile</button>
				<button onClick={loginAccount}>Login</button>
				<button onClick={seeCurrentUser}>See user</button>
				<button onClick={logoutAccount}>Log out</button>
				<br style={{ clear: 'both' }} />
				Or...<br />
				Use google auth, apple id, etc
			</div>

		</>
	)
}
