// FIXME not used right now, probably redundant, but the wish is to harmonize actions of useMyBooksRemove and useMyBooksAdd together
import { useContext } from "react"
import { AppContext } from "./../App"
import useUpdateDb from "./useUpdateDb"

const useMyBooksUpdate = (myBooksNew: Books) => {
    const { setUserMyBooks, setPopupNotification, setRerender } = useContext(AppContext)

    const initUpdateDb = useUpdateDb({
        msg: "zo gaat ie goed",
        logMsg: "ja prima",
        newJson: myBooksNew,
    })

    // OPTIMIZE ewwwwwww brother ewwwwwww, see also ./useMyBooksAdd.ts
    const runMyBooksUpdate = async () => {
        setUserMyBooks(myBooksNew)
        setPopupNotification("optimist")
        const notification: string = await initUpdateDb()
        // setIsLoading(false)
        setPopupNotification(notification)
        setRerender(true)
    }
    const runUpdate = () => runMyBooksUpdate()
    return runUpdate
}
export default useMyBooksUpdate
