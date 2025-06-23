export default function assignListById(
    myBooksArg: Books,
    bookId: Book["id"],
    listId: Book["list"],
    toss: "no" | "toss" | "untoss" | "permatoss" = "no",
): Books {
    const myBooks: Books = myBooksArg
    for (let i = 0; i < myBooks.length; i++) {
        if (myBooks[i].id === bookId) {
            console.log("myBooks[i].list REMOVE:", myBooks[i].list, listId)
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
            if (toss === "toss") myBooks[i].tossed = true
            else if (toss === "untoss") myBooks[i].tossed = false
            else if (toss === "permatoss") myBooks.splice(i, 1)
            break
        }
    }
    return myBooks
}
