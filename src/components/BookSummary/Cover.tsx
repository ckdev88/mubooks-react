import { useEffect, useState } from "react"
import { getBookCover } from "@/utils/Helpers"
import CoverModal from "@/components/BookSummary/CoverModal"

const BookSummaryCover = ({
    book_title_short = "",
    book_cover = "",
    book_cover_redir = ""
}: {
    book_title_short: Book["title_short"]
    book_cover?: Book["cover"]
    book_cover_redir?: Book["cover_redir"]
}) => {
    const [showCoverModal, setShowCoverModal] = useState(false)

    // TODO abstract to global helper
    useEffect(() => {
        const headerElement = document.getElementById("header")
        if (headerElement) {
            headerElement.style.zIndex = showCoverModal ? "10" : "1"
            if (showCoverModal) headerElement.style.zIndex = "1"
            else headerElement.style.zIndex = "10"
        }
    }, [showCoverModal])
    function toggleModal() {
        setShowCoverModal(!showCoverModal)
    }

    let bookCover: Book["cover"]
    let bookCoverFull: Book["cover"]

    if (book_cover_redir !== undefined && book_cover_redir !== "") {
        bookCover = book_cover_redir
        // bookCoverLarge = book_cover_redir
        bookCoverFull = getBookCover(book_cover)
    } else {
        bookCover = getBookCover(book_cover, "M")
        bookCoverFull = getBookCover(book_cover)
    }

    // NOTE set showOLImages to false when archive/OpenLibrary is unavailable
    const showOLImages = true
    if (!showOLImages && book_cover_redir.includes("openlibrary")) {
        bookCover = getBookCover("", "M")
        bookCoverFull = getBookCover()
    }

    return (
        <>
            <img
                src={bookCover}
                alt=""
                className="cover shade"
                onClick={() => toggleModal()}
                onKeyUp={() => toggleModal()}
            />
            {showCoverModal && (
                <CoverModal
                    bookCoverM={bookCover}
                    bookCoverSource={bookCoverFull}
                    toggleModal={toggleModal}
                    bookTitle={book_title_short}
                />
            )}
        </>
    )
}

export default BookSummaryCover
