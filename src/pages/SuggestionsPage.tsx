import { useContext } from "react"
import SuggestionsForm from "@/components/SuggestionsForm"
import { motion } from "motion/react"
import { AppContext } from "@/App"

function SuggestionsPage() {
    const { GLOBALS } = useContext(AppContext)
    return (
        <>
            <motion.div {...GLOBALS.motionPageProps}>
                <SuggestionsForm />
            </motion.div>
        </>
    )
}
export default SuggestionsPage
