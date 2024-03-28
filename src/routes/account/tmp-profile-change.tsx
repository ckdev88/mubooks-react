	const [screenname, setScreenname] = useState<string>('')
	const [testvar,setTestvar]=useState<string>('nogniets')
	useEffect(() => {
		if (localStore !== null) {
			setScreenname(localStore.user.user_metadata.screenname)
		}
	}, [])

		const { username, setUsername } = useContext(AppContext)
	const [newUsername, setNewUsername] = useState<string>('')
	const [status, setStatus] = useState<string>('')
	const updateUsername = (newUsername: string) => {
		setUsername(newUsername)
		setStatus('Updated!')
	}
				<br />

							<input
				type="text"
				onChange={(event) => {
					setNewUsername(event.target.value)
				}}
			/>
			<button
				onClick={() => {
					updateUsername(newUsername)
				}}
			>
				Change username
			</button>
			{status} {username}

// localStorage.setItem(localStorageKey, sessionStorage.getItem(localStorageKey))
// const localStore = JSON.parse(sessionStorage.getItem(localStorageKey))
