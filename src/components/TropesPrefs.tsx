import { useState, useContext, useEffect } from "react"
import { AppContext } from "../App"
import { cleanIndexKey, cleanInput } from "../helpers/cleanInput"
import { supabase } from "../../utils/supabase"
import BtnInsideCaret from "./ui/BtnInsideCaret"
import { TropesPageContext } from "../routes/books/TropesPage"
import updateTropesDb from "../functions/updateTropesDb"
import BaseBadge from "./ui/BaseBadge"
import BtnCancel from "./ui/BtnCancel"

const TropesPrefs = ({
    field,
}: { field: "tropes_liked" | "tropes_disliked" }): JSX.Element => {
    const {
        setLikedTropes,
        likedTropes,
        likedTropesLowercase,
        setDislikedTropes,
        dislikedTropes,
        dislikedTropesLowercase,
    } = useContext(TropesPageContext)

    const { setPopupNotification, userid } = useContext(AppContext)
    const [showTropesForm, setShowTropesForm] = useState<boolean>(false)
    const [tropeInputValue, setTropeInputValue] = useState<BookTrope>("")

    /** Updates supabase user_entries tropes_liked and/or tropes_disliked */
    const tropesDb = async () => {
        if (field === "tropes_liked") {
            const res = await supabase.from("user_entries").select("tropes_liked")
            if (res.data) setLikedTropes(res.data[0].tropes_liked)
        } else if (field === "tropes_disliked") {
            const res = await supabase.from("user_entries").select("tropes_disliked")
            if (res.data) setDislikedTropes(res.data[0].tropes_disliked)
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO OPTIMIZE>
    useEffect(() => {
        tropesDb()
    }, [])

    // biome-ignore lint/correctness/useExhaustiveDependencies: <TODO OPTIMIZE>
    useEffect(() => {
        // OPTIMIZE: apply useLayoutEffect is faster?
        if (field === "tropes_liked" && showTropesForm === true)
            document.getElementById("trope_add_liked")?.focus()
        if (field === "tropes_disliked" && showTropesForm === true)
            document.getElementById("trope_add_disliked")?.focus()
    }, [showTropesForm])

    let bookTropesLowercase: BookTropes
    let tropesArr: BookTropes
    if (field === "tropes_liked") {
        bookTropesLowercase = likedTropesLowercase
        tropesArr = likedTropes
    } else if (field === "tropes_disliked") {
        bookTropesLowercase = dislikedTropesLowercase
        tropesArr = dislikedTropes
    }

    async function addTrope() {
        if (tropeInputValue.trim()) {
            const tropeToAdd: string = cleanInput(tropeInputValue.trim(), true)
            if (tropeToAdd !== undefined && tropeToAdd.length > 1) {
                if (
                    field === "tropes_liked" &&
                    dislikedTropesLowercase.includes(tropeToAdd.toLowerCase())
                )
                    removeTrope(tropeToAdd, "tropes_disliked")
                else if (
                    field === "tropes_disliked" &&
                    likedTropesLowercase.includes(tropeToAdd.toLowerCase())
                )
                    removeTrope(tropeToAdd, "tropes_liked")

                const tropeIndex = bookTropesLowercase.indexOf(tropeToAdd.toLowerCase())
                if (bookTropesLowercase.indexOf(tropeToAdd.toLowerCase()) > -1)
                    tropesArr.splice(tropeIndex, 1)
                const newArr: BookTropes = [...tropesArr, tropeToAdd]
                newArr.sort((a, b) => a.localeCompare(b))
                updateTropes(newArr, field)
                setTropeInputValue("")
            }
        }
    }

    async function updateTropes(
        newArr: BookTropes,
        field: "tropes_liked" | "tropes_disliked",
    ) {
        if (field === "tropes_liked") setLikedTropes(newArr)
        else if (field === "tropes_disliked") setDislikedTropes(newArr)
        const msg = await updateTropesDb(newArr, userid, field)
        setPopupNotification(msg)
    }

    function removeTrope(trope: string, field: "tropes_liked" | "tropes_disliked") {
        let newArr: BookTropes = []
        if (field === "tropes_liked")
            newArr = likedTropes.filter((t) => t.toLowerCase() !== trope.toLowerCase())
        if (field === "tropes_disliked")
            newArr = dislikedTropes.filter((t) => t.toLowerCase() !== trope.toLowerCase())
        updateTropes(newArr, field)
    }

    // NOTE: similar, but not same as TropesList in ./ReviewTropes.tsx
    const TropesList = ({ tropes }: { tropes: BookTropes }) => {
        return (
            <div className="tropes">
                {tropes.map((trope, index) => {
                    const key = cleanIndexKey(trope, index)
                    return (
                        <BaseBadge
                            key={key}
                            text={trope}
                            removeTrope={removeTrope}
                            field={field}
                            type="trope"
                        />
                    )
                })}
                <button
                    type="button"
                    className={
                        showTropesForm
                            ? "trope_add btn-sm mb0 active"
                            : "trope_add btn-sm mb0"
                    }
                    onClick={() => setShowTropesForm(!showTropesForm)}
                >
                    {tropes.length > 0 ? <>+</> : <>Add tropes</>}
                </button>
            </div>
        )
    }
    const handleKeyDownTrope = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            addTrope()
        }
    }

    return (
        <>
            <div className="h2">{field === "tropes_liked" ? "Like" : "Dislike"}</div>
            <section className="section-badges">
                <TropesList
                    tropes={field === "tropes_liked" ? likedTropes : dislikedTropes}
                />
                {showTropesForm && (
                    <>
                        <div
                            className="single-small-form clr"
                            style={{ alignItems: "center" }}
                        >
                            <input
                                type="text"
                                name="trope_add"
                                id={
                                    field === "tropes_liked"
                                        ? "trope_add_liked"
                                        : "trope_add_disliked"
                                }
                                value={tropeInputValue}
                                onChange={(e) => setTropeInputValue(e.target.value)}
                                onKeyDown={handleKeyDownTrope}
                                placeholder="Add a trope..."
                            />
                            <BtnInsideCaret
                                bStyle={{ margin: "0 0 0 -2rem" }}
                                bOnClick={addTrope}
                            />
                        </div>
                        <BtnCancel
                            bClassName="wauto"
                            bOnClick={() => setShowTropesForm(false)}
                        />
                    </>
                )}
            </section>
        </>
    )
}
export default TropesPrefs
