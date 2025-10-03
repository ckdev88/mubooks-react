export default function CoverModal({
    bookTitle,
    bookCoverM,
    bookCoverSource,
    toggleModal
}: {
    bookTitle: Book["title_short"]
    bookCoverM: Book["cover"]
    bookCoverSource: Book["cover"]
    toggleModal: () => void
}) {
    return (
        <div className="cover-modal-container" onClick={toggleModal} onKeyUp={toggleModal}>
            <div className="cover-modal">
                <div className="cover-placeholder-wrapper">
                    <header>{bookTitle}</header>
                    <img className="cover-placeholder" src={bookCoverM} alt="" />
                    <div
                        style={{ backgroundImage: "url(" + bookCoverSource + ")" }}
                        className="cover-hq"
                        onClick={toggleModal}
                        onKeyUp={toggleModal}
                    />
                </div>
            </div>
        </div>
    )
}
