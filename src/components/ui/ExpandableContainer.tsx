import { useRef, useEffect, useState, type ReactNode, useCallback } from "react"
import BtnTextGeneral from "@/components/ui/buttons/BtnTextGeneral"

export default function ExpandableContainer({
    children,
    buttonText = "Details",
    extraClass
}: { children: ReactNode; buttonText?: string; extraClass?: string }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)
    const animationDuration = "400ms"
    const bText = buttonText

    const toggleExpansion = useCallback(() => {
        setIsExpanded((prev) => !prev)
    }, [])

    useEffect(() => {
        const element = contentRef.current
        if (!element) return

        if (isExpanded) {
            // Expand
            element.style.height = "0"
            const fullHeight = element.scrollHeight
            void element.offsetHeight // Force reflow

            element.style.transition = `height ${animationDuration} linear`
            element.style.height = `${fullHeight}px`

            const onComplete = () => {
                element.style.height = "auto"
                element.style.transition = "none"
            }
            element.addEventListener("transitionend", onComplete, { once: true })
        } else {
            // Collapse
            const currentHeight = element.scrollHeight
            element.style.height = `${currentHeight}px`
            element.style.transition = `height ${animationDuration} linear`

            void element.offsetHeight // Force reflow
            element.style.height = "0"

            const onComplete = () => {
                element.style.transition = "none"
            }
            element.addEventListener("transitionend", onComplete, { once: true })
        }
    }, [isExpanded])

    const containerClassName = `expandable-container${extraClass !== undefined && extraClass !== "" ? ` ${extraClass}` : ""}`

    return (
        <div className={containerClassName}>
            <BtnTextGeneral
                bClassName={
                    isExpanded ? "sf bold caret-right-toggle active" : "sf bold caret-right-toggle"
                }
                bOnClick={toggleExpansion}
                bText={bText}
                bAlign="left"
                aria-expanded={isExpanded}
            />
            <div
                ref={contentRef}
                style={{
                    overflow: "hidden",
                    height: "0"
                }}
                aria-hidden={!isExpanded}
            >
                {children}
            </div>
        </div>
    )
}
