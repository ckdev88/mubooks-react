import { supabase } from "../../utils/supabase"
const UserUpdate = async () => {
	const { data, error } = await supabase.auth.updateUser({
		email: 'i.likeespressoalot@gmail.com',
		data: { screenname: 'asdasdasd' },
	})
	return { error, data }
}
export default UserUpdate
