function formatBookTitle(bookTitle = ""): Book["title"] {
    return String(bookTitle).charAt(0).toUpperCase() + String(bookTitle).slice(1)
}

/** Format as author name, capitalizing every word */
function formatBookAuthor(bookAuthor = ""): string {
    const author_arr = bookAuthor.split(" ")
    for (let i = 0; i < author_arr.length; i++) {
        author_arr[i] = author_arr[i].charAt(0).toUpperCase() + author_arr[i].slice(1)
    }
    return author_arr.join(" ")
}

export { formatBookTitle, formatBookAuthor }
