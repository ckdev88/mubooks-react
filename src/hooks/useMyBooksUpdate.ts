// FIXME not used right now, probably redundant, but the wish is to harmonize actions of useMyBooksRemove and useMyBooksAdd together
import { useContext } from "react"
import { AppContext } from "@/context/AppContext"
import useUpdateDb from "@/hooks/useUpdateDb"

const useMyBooksUpdate = (myBooksNew: Books) => {
    const { setUserMyBooks, setPopupNotification } = useContext(AppContext)

    const initUpdateDb = useUpdateDb({
        msg: "zo gaat ie goed",
        logMsg: "ja prima",
        newJson: myBooksNew
    })

    // TODO animation also ./useMyBooksAdd.ts -- DRY
    const runMyBooksUpdate = async () => {
        setUserMyBooks(myBooksNew)
        const notification: string = await initUpdateDb()
        setPopupNotification(notification)
    }
    const runUpdate = () => runMyBooksUpdate()
    return runUpdate
}
export default useMyBooksUpdate
