import { useState, useEffect, useContext } from "react"
import { AppContext } from "@/App"

function PopupNotification() {
    const { popupNotification, setPopupNotification } = useContext(AppContext)

    // FIXME dirty hack to trigger a re-render to show Heart animation immediately
    if (popupNotification === "optimist") return

    const Popper = () => {
        // TODO apply time into global settings.json or something
        setTimeout(() => setPopupNotification(""), 2000)
        return <>{popupNotification}</>
    }
    // online state checker & notifier
    const [isOnline, setIsOnline] = useState(navigator.onLine)

    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO OPTIMIZE>
    useEffect(() => {
        // OPTIMIZE apply useLayoutEffect?
        const handleStatusChange = () => setIsOnline(navigator.onLine)
        window.addEventListener("online", handleStatusChange)
        window.addEventListener("offline", handleStatusChange)
        return () => {
            window.removeEventListener("online", handleStatusChange)
            window.removeEventListener("offline", handleStatusChange)
        }
    }, [isOnline])

    return (
        <>
            <div
                id="popupNotification"
                className={popupNotification || !isOnline ? "show" : "hide"}
            >
                {!isOnline ? (
                    <>Offline. Some things won&lsquo;t work.</>
                ) : (
                    popupNotification !== "" && <> {popupNotification && <Popper />}</>
                )}
            </div>
        </>
    )
}
export default PopupNotification
