import { useState } from "react"
export default function useBtnHeartAnimation(faved: boolean) {
    const [isFaved, setIsFaved] = useState<boolean>(faved)
    const [buttonClassName, setButtonClassName] = useState<string>(
        isFaved ? "icon-heart active" : "icon-heart inactive",
    )
    function showAnimation(): void {
        setButtonClassName(isFaved ? "icon-heart inactive shrink" : "icon-heart active grow")
        setTimeout(() => {
            setButtonClassName(isFaved ? "icon-heart inactive" : "icon-heart active")
            setIsFaved(!isFaved)
        }, 400)
    }
    return { showAnimation, isFaved, buttonClassName }
}
