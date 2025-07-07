export default function assignListById(
    myBooksArg: Books,
    bookId: Book["id"],
    listId: Book["list"],
    toss: "no" | "toss" | "untoss" | "permatoss" = "no",
): Books {
    if (myBooksArg === undefined) return // revert to login?
    const myBooks: Books = myBooksArg
    for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === bookId) {
            switch (toss) {
                case "no":
                    switch (listId) {
                        case 3:
                            myBooks[i].list = 3
                            break
                        case 2:
                            myBooks[i].list = 2
                            myBooks[i].date_finished = undefined
                            break
                        case 1:
                            myBooks[i].list = 1
                            myBooks[i].date_reading = undefined
                            myBooks[i].date_finished = undefined
                            break
                    }
                    break
                case "untoss":
                    myBooks[i].tossed = false
                    break
                case "toss":
                    myBooks[i].tossed = true
                    break
                case "permatoss":
                    myBooks[i].list = 0
                    // splice(i, 1)
                    break
            }
        }
    }
    return myBooks
}
