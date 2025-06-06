// TODO when adding a title, trim it
// TODO openlibrary: make this form interact with openlibrary.org to help append to their database
import { useContext, useState, useEffect, useLayoutEffect } from "react"
import { isUrl } from "../../Helpers"
import BookSummaryTitle from "../../components/BookSummaryTitle"
import { AppContext } from "../../App"
import updateEntriesDb from "../../functions/updateEntriesDb"
import { cleanAnchor, cleanIndexKey, cleanInput } from "../../helpers/cleanInput"
import Heading from "../../components/ui/Heading"
import { motion } from "motion/react"
import BaseBadge from "../../components/ui/BaseBadge"
import { checkSimilar } from "../../helpers/checks"
import { formatBookTitle } from "../../helpers/formatInput"
import { formatBookAuthor } from "../../helpers/formatInput"
import BtnInsideCaret from "../../components/ui/BtnInsideCaret"

const pageTitle: string = "Add a book"

const AddBookPage = () => {
    const { userMyBooks, setUserMyBooks, userid, setPopupNotification } =
        useContext(AppContext)
    const [coverImg, setCoverImg] = useState<string>("")

    useLayoutEffect(() => {
        const firstField = document.getElementById("abTitle")
        if (firstField) firstField.focus()
    }, [])

    const [title, setTitle] = useState<Book["title"]>("")
    const [firstPublishYear, setFirstPublishYear] =
        useState<Book["first_publish_year"]>(null)
    const bookId: Book["id"] = "MU" + new Date().getTime().toString()
    const [numberOfPages, setNumberOfPages] = useState<Book["number_of_pages_median"]>(0)
    const [selectedImage, setSelectedImage] = useState<null | File>(null)
    const [bookAuthors, setBookAuthors] = useState<BookAuthors>([])
    const [bookTropes, setBookTropes] = useState<BookTropes>([])
    const [bookTropesLowercase, setBookTropesLowercase] = useState<BookTropes>([])
    useEffect(() => {
        setBookTropesLowercase(bookTropes.map((trope) => trope.toLowerCase()))
    }, [bookTropes])

    // OPTIMIZE these states seem a bit redundant
    const [authorsArr, setAuthorsArr] = useState<BookAuthors>([])
    const [tropesArr, setTropesArr] = useState<BookTropes>([])

    const [selectedImageType, setSelectedImageType] = useState<
        undefined | "url" | "upload"
    >(undefined)

    function changePages(e: React.ChangeEvent<HTMLInputElement>) {
        const num: number = Number(e.currentTarget.value)
        setNumberOfPages(num)
    }

    function changeCover(e: React.ChangeEvent<HTMLInputElement>) {
        const url = e.currentTarget.value
        if (isUrl(url)) setCoverImg(e.currentTarget.value.trim())
    }

    function changeFirstPublishYear(e: React.ChangeEvent<HTMLInputElement>): void {
        setFirstPublishYear(Number(e.currentTarget.value))
    }
    // /for the preview

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const processAbForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // NOTE set to false when all is done if the redirect to wishlist is canceled
        setIsSubmitting(true)

        let coverImgPosted: string = coverImg.trim() // coverImg = via url

        if (selectedImage) {
            const formData = new FormData()
            formData.append("image", selectedImage)
            formData.append("userid", userid)
            formData.append("bookid", bookId)

            try {
                const response = await fetch("ProcessCover.php", {
                    method: "POST",
                    body: formData,
                })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }

                const result = await response.json()
                if (result.error) {
                    console.error(result.error)
                } else {
                    if (result.path !== null) {
                        coverImgPosted = result.path
                    } else console.error("Error uploading image: doin nothin")
                }
            } catch (error) {
                console.error("Error uploading image:", error)
            }
        }

        const newArr = userMyBooks
        const list: Book["list"] = 1
        const rate_stars: Book["rate_stars"] = 0
        const rate_spice: Book["rate_spice"] = 0
        const title_short = title.slice(0, 55)
        let author_array: BookAuthors = []
        if (authorInputValue.length > 1) author_array = authorsArr
        let tropes_array: BookTropes = []
        if (tropeInputValue.length > 1) tropes_array = tropesArr

        const book: Book = {
            author_name: author_array,
            cover: coverImgPosted,
            cover_redir: coverImgPosted,
            first_publish_year: firstPublishYear,
            id: bookId,
            list: list,
            number_of_pages_median: numberOfPages,
            review_tropes: tropes_array,
            title: title,
            title_short: title_short,
            cover_edition_key: "",
            rate_stars: rate_stars,
            rate_spice: rate_spice,
        }
        newArr.push(book)

        setUserMyBooks([...userMyBooks, book])
        const msg = await updateEntriesDb(newArr, userid)

        const bookAnchor: string = `${cleanAnchor(title_short)}_${bookId}`
        const linkto: string = "/wishlist#" + bookAnchor
        location.href = linkto

        setPopupNotification(msg)
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // shorthand for: if (e.target.files && e.target.files[0]) {
        if (e.target.files?.[0]) {
            setSelectedImage(e.target.files[0])
        }
    }

    function resetFile() {
        setSelectedImage(null)
        setSelectedImageType(undefined)
        setCoverImg("")
        const fileImage = document.querySelector(".file")
        if (fileImage !== null && "value" in fileImage) fileImage.value = ""
    }

    const showCover = (
        <>
            {coverImg !== "" && <img alt="" src={coverImg} className="cover shade" />}
            {selectedImage !== null && (
                <img
                    alt=""
                    src={URL.createObjectURL(selectedImage)}
                    className="cover shade"
                />
            )}
        </>
    )

    const [authorInputValue, setAuthorInputValue] = useState<string>("")

    async function addAuthor(addAnother = true): Promise<void> {
        let returnAuthors: BookAuthors = []
        if (authorInputValue.trim()) {
            const authorToAdd = authorInputValue
            if (authorToAdd !== undefined && authorToAdd.length > 1) {
                // find duplicate author value: if found, splice it
                const authorIndex = bookAuthors.indexOf(authorToAdd)
                if (bookAuthors.indexOf(authorToAdd) > -1) {
                    bookAuthors.splice(authorIndex, 1)
                }
                const newArr: BookAuthors = [
                    ...bookAuthors,
                    cleanInput(authorToAdd, true),
                ]
                returnAuthors = newArr
                setBookAuthors(newArr)

                if (addAnother) setAuthorInputValue("")
            }
        }
        if (addAnother) document.getElementById("abAuthorAdd")?.focus()
        setAuthorsArr(returnAuthors)
    }

    function removeAuthor(filterAuthor: string) {
        setBookAuthors(bookAuthors.filter((author) => author !== filterAuthor))
    }

    const [tropeInputValue, setTropeInputValue] = useState<string>("")

    /**
     * Sanitize and add trope in active input field to local state,
     * return array of type BookTropes
     */
    // TODO this addTrope is different (newer) from addTrope methods... needs fixing?
    async function addTrope(addAnother = false): Promise<void> {
        let returnTropes: BookTropes = []
        if (tropeInputValue.trim()) {
            const tropeToAdd: string = cleanInput(tropeInputValue.trim(), true)

            if (tropeToAdd !== undefined && tropeToAdd.length > 1) {
                const tropeIndex = bookTropesLowercase.indexOf(tropeToAdd.toLowerCase())
                if (bookTropesLowercase.indexOf(tropeToAdd.toLowerCase()) > -1)
                    bookTropes.splice(tropeIndex, 1)
                const newArr: BookTropes = [...bookTropes, tropeToAdd]
                newArr.sort((a, b) => a.localeCompare(b))
                returnTropes = newArr
                setBookTropes(newArr)
                if (addAnother) setTropeInputValue("")
            }
        }
        if (addAnother) document.getElementById("abTropeAdd")?.focus()
        setTropesArr(returnTropes)
    }

    /** Remove a trope from the bookTropes state array */
    function removeTrope(filterTrope: string) {
        setBookTropes(bookTropes.filter((trope) => trope !== filterTrope))
    }

    /** Initiate addAuthor|addTrope when `,` is inputted */
    function handleBadgerInput(
        e: React.ChangeEvent<HTMLInputElement>,
        badger: "author" | "trope",
    ) {
        e.preventDefault()
        const a = e.target.value
        if (badger === "author") {
            if (a.charAt(a.length - 1) === ",") addAuthor(true)
            else setAuthorInputValue(formatBookAuthor(a))
        } else if (badger === "trope") {
            if (a.charAt(a.length - 1) === ",") addTrope(true)
            else setTropeInputValue(a)
        } else console.warn("This is not a valid type to add: " + badger)
    }

    // TODO generate same badge as in preview, with x-feature: to erase input field, put cursor in empty input field
    return (
        <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            animate={{ opacity: 1, transition: { duration: 2 } }}
        >
            <Heading
                text={pageTitle}
                sub="See your preview below"
                icon="icon-addbook.svg"
            />
            <form onSubmit={processAbForm}>
                <fieldset style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="abTitle">
                        <div className="description">Title</div>
                        <input
                            type="text"
                            id="abTitle"
                            name="abTitle"
                            required
                            onChange={(e) =>
                                setTitle(formatBookTitle(e.currentTarget.value))
                            }
                        />
                    </label>
                    <label htmlFor="abAuthors">
                        <div className="description">
                            Author(s) <em>... separate with comma (,)</em>
                        </div>
                        <div className="dflex ">
                            <input
                                type="text"
                                id="abAuthorAdd"
                                value={authorInputValue}
                                onChange={(e) => handleBadgerInput(e, "author")}
                                placeholder="Add an author..."
                            />
                            <BtnInsideCaret
                                bStyle={{ margin: ".75rem 0 0 -2rem" }}
                                bOnClick={addAuthor}
                            />
                        </div>
                    </label>
                    {bookAuthors.length > 0 && (
                        <div className="mb1 mt-05">
                            {bookAuthors.map((author, index) => {
                                const key = cleanIndexKey("abpRemoveAuthor", index)
                                return (
                                    <BaseBadge
                                        key={key}
                                        text={author}
                                        removeText={removeAuthor}
                                        type="author"
                                    />
                                )
                            })}
                            <br />
                        </div>
                    )}
                    <div
                        style={{
                            display: "flex",
                            alignContent: "center",
                            justifyContent: "space-between",
                            gap: "1rem",
                        }}
                    >
                        <label htmlFor="abYearPublished">
                            <div className="description">Year published</div>
                            <input
                                type="number"
                                name="abYearPublished"
                                id="abYearPublished"
                                onChange={changeFirstPublishYear}
                            />{" "}
                        </label>
                        <label htmlFor="abPages">
                            <div className="description">Pages</div>
                            <input
                                type="number"
                                name="abPages"
                                id="abPages"
                                onChange={changePages}
                            />
                        </label>
                    </div>
                    <label
                        htmlFor="abCover"
                        className="dblock pb0"
                        style={{ marginBottom: ".75rem" }}
                    >
                        <div className="description">
                            Cover{" "}
                            {!selectedImage && (
                                <em>... paste URL or press Choose File</em>
                            )}
                        </div>
                        {!selectedImage && (
                            <>
                                <input
                                    type="url"
                                    name="abCover"
                                    id="abCover"
                                    onChange={(event) => {
                                        changeCover(event)
                                        setSelectedImageType("url")
                                    }}
                                    value={coverImg ? coverImg : ""}
                                    placeholder="Paste the URL here, or Choose File below..."
                                    className={coverImg ? "" : "mb0o"}
                                />
                                {coverImg && (
                                    <span
                                        className="btn-text-cancel btn-text sf2 mt-075 mb05"
                                        onClick={resetFile}
                                        onKeyDown={resetFile}
                                    >
                                        cancel
                                    </span>
                                )}
                            </>
                        )}
                        {selectedImageType !== "url" && (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                name="myImage"
                                className={coverImg ? "" : "mb0o"}
                            />
                        )}
                        <div className="dnone">
                            {selectedImage ? (
                                <>created blob: {URL.createObjectURL(selectedImage)} </>
                            ) : (
                                ""
                            )}
                        </div>
                        {selectedImage && (
                            <span
                                className="btn-text-cancel btn-text sf2 mb05"
                                onClick={resetFile}
                                onKeyDown={resetFile}
                            >
                                cancel
                            </span>
                        )}
                    </label>
                    <label htmlFor="abTropeAdd" className="dblock pb035">
                        <div className="description">
                            Tropes <em>... shown again when finished reading</em>
                        </div>
                        <div className="dflex">
                            <input
                                type="text"
                                id="abTropeAdd"
                                value={tropeInputValue}
                                onChange={(e) => handleBadgerInput(e, "trope")}
                                placeholder="Add a trope..."
                            />
                            <BtnInsideCaret
                                bStyle={{ margin: ".75rem 0 0 -2rem" }}
                                bOnClick={addTrope}
                            />
                        </div>
                    </label>
                    {bookTropes.length > 0 && (
                        <div className="mb1 mt-05">
                            {bookTropes.map((trope, index) => {
                                const key = cleanIndexKey("abpRemoveTrope" + trope, index)
                                return (
                                    <BaseBadge
                                        key={key}
                                        text={trope}
                                        removeText={removeTrope}
                                        type="trope"
                                    />
                                )
                            })}
                            <br />
                        </div>
                    )}
                </fieldset>
                <button className="btn-lg" type="submit" disabled={isSubmitting}>
                    Add book to wishlist{" "}
                    {isSubmitting && <span className="loader-dots" />}
                </button>
            </form>
            <div className="h2">
                Preview
                {!title && <sub>No title yet...</sub>}
            </div>
            <article className="book-summary preview">
                <aside className="aside">{showCover}</aside>
                <div className="article-main">
                    <header>
                        <BookSummaryTitle
                            book_title_short={title}
                            book_first_publish_year={firstPublishYear}
                            book_author_name={[...bookAuthors, authorInputValue]}
                            book_id={bookId}
                            currentPage="wishlist"
                        />
                        {numberOfPages > 0 && <>{numberOfPages} pages</>}
                        <div className="tropes">
                            {
                                // const bookTropesPreview = [...bookTropes,tropeInputValue]
                                [...bookTropes, tropeInputValue].map((trope, index) => {
                                    if (trope.length > 0) {
                                        const key = cleanIndexKey(
                                            "abpBookTrope" + trope,
                                            index,
                                        )
                                        // OPTIMIZE deduplicate final trope in array with input value
                                        if (
                                            index === bookTropes.length &&
                                            checkSimilar(
                                                bookTropes[bookTropes.length - 1],
                                                trope,
                                            )
                                        ) {
                                            return
                                        }
                                        return (
                                            <BaseBadge
                                                key={key}
                                                text={trope}
                                                type="trope"
                                            />
                                        )
                                    }
                                })
                            }
                        </div>
                    </header>
                </div>
            </article>
        </motion.div>
    )
}
export default AddBookPage
