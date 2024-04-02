import UpdateMyBooks from "../../stores/UpdateMyBooks"
import { useContext } from "react"
import { AppContext } from "../../App"
const ClearMyBooks = () => {
	const { setUserMyBooks } = useContext(AppContext)
	function clearbooks() {
		UpdateMyBooks('[]')
		setUserMyBooks('[]')
	}
	return (
		<>
			<button onClick={clearbooks}>Clear my books</button>
		</>
	)
}
export default ClearMyBooks
