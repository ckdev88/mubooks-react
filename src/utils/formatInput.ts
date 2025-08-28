// TODO check if there is redundancy in ./utils/formatInput.ts & ./utils/formatInputAuthor.ts

/** Format as book title, capitalizing the first word */
function formatBookTitle(bookTitle = ""): Book["title"] {
    const title = bookTitle.trim()
    return title.charAt(0).toUpperCase() + title.slice(1)
}

/** Format as author name, capitalizing every word */
function formatBookAuthor(bookAuthor = ""): BookAuthor {
    const author_arr = bookAuthor.split(" ")
    for (let i = 0; i < author_arr.length; i++) {
        author_arr[i] = author_arr[i].charAt(0).toUpperCase() + author_arr[i].slice(1)
    }
    return author_arr.join(" ")
}

export { formatBookTitle, formatBookAuthor }
