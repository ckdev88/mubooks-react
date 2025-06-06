interface GlobalSettings {
    headingIconsEnabled: boolean
    synopsisEnabled: boolean
    pageAnimationDelay: number
    pageAnimationDuration: number
}

interface AppContextType {
    username: string
    setUsername(username: username): void
    usermail: string
    setUsermail(usermail: username): void
    userid: string
    setUserid(userid: userid): void
    userMyBooks: Books
    setUserMyBooks(userMyBooks: Books): void
    userIsLoggedIn: boolean
    setUserIsLoggedIn(userIsLoggedIn: userIsLoggedIn): void
    popupNotification: string
    setPopupNotification(popupNotification: popupNotification): void
    popupNotificationShow: boolean
    setPopupNotificationShow(popupNotificationShow: popupNotificationShow): void
    todaysDateInput: string
    todaysDateDigit: number
    darkTheme: undefined | boolean
    setDarkTheme(darkTheme: darkTheme): void
    bodyBgColor: string
    pageName: string
    setPageName(pageName: pageName): void
    GLOBALS: GlobalSettings
}

interface IsModdingPagesContextType {
    isModding: boolean
    setIsModding(isModding: isModding): void
    numberOfPages: number
    setNumberOfPages(numberOfPages: numberOfPages): void
}
interface IsModdingReviewContextType {
    isModding: boolean
    setIsModding(isModding: isModding): void
    reviewText: Book["review_text"]
    setReviewText(reviewText: reviewText): void
    o_key: "review_text" | "review_fav_quote"
}
interface TropesPageContextType {
    likedTropes: BookTropes
    setLikedTropes(likedTropes: likedTropes): void
    dislikedTropes: BookTropes
    setDislikedTropes(dislikedTropes: dislikedTropes): void
    likedTropesLowercase: BookTropes
    dislikedTropesLowercase: BookTropes
    tropesInMyBooksArr: Books
    setTropesInMyBooksArr(tropesInMyBooksArr: tropesInMyBooksArr): void
}
interface BooksOverviewFilterContextType {
    booksFilter: string
    setBooksFilter(booksFilter: booksFilter): void
}

type PageWithoutParameters =
    | "addbook"
    | "dashboard"
    | "favorites"
    | "finished"
    | "profile"
    | "quoted"
    | "reading"
    | "savedbooks"
    | "search"
    | "tropes"
    | "wishlist"

type Page = `${PageWithoutParameters}${string | null}`

type Quote = {
    quote: string
    authors: string
    title: string
}

type User = {
    email: string
    password: string
    screenname?: string
}

/**
 * On which list the book is or should be.
 * 0: No list, about to be removed
 * 1: Wishlist -- Reading,  finished, favorite = false
 * 2: Reading  -- Wishlist, finished, favorite = false
 * 3: Finished -- Wishlist & reading = false, favorite ambiguous
 * 4: Favorite -- Wishlist & reading = false, finished true
 */
type BookList = 0 | 1 | 2 | 3 | 4

type CoverSize = undefined | "S" | "M" | "L"
type Scale5 = 0 | 1 | 2 | 3 | 4 | 5

interface LoginFormInput {
    login_email: { value: string }
    login_password: { value: string }
}

type BookData = [
    {
        id: Id
        index?: number
        title: string
        author_name: string[]
        number_of_pages_median: number
        first_publish_year: number
        cover_edition_key: string
        cover: string
        cover_redir?: string
        img?: string
        title_short?: string
    },
]
interface Book {
    author_key?: string[]
    author_name: BookAuthors
    cover_edition_key: string
    cover: string
    cover_redir?: string
    edition_key?: string[]
    first_publish_year: number | null
    id: Id
    img?: string
    index?: number
    isbn?: string[]
    key?: string[]
    /** 1: Wishlist | 2: Reading | 3: Finished | 4: Favorite (+Finished) */
    list: BookList
    number_of_pages_median: number
    title: string
    title_short: string
    date_reading?: number
    date_finished?: number
    rate_stars: Scale5
    rate_spice: Scale5
    review_tropes: BookTropes
    review_text?: string | undefined
    review_fav_quote?: Book["review_text"]
    subject?: BookSubjects
    days?: number
}
type BookAuthor = string
type BookAuthors = BookAuthor[]
type BookTrope = string
type BookTropes = BookTrope[]
type BookSubject = string
type BookSubjects = BookSubject[]

type Results = Book[]
interface Books extends Array<Book> {}

interface BookObject {
    book: Book
}
interface BooksObject {
    books: Books
}
interface IdObject {
    id: Id
}
type Id = string

interface ApiError {
    error?: string
    error_code?: string
    error_description?: string
}

type StatsAmountTypes = "books" | "pages" | "daysperbook" | "pagesperday"

interface FinishedBooksStatsYears {
    yearArr: number[]
    oldest: number
}
type BooksWithoutPages = BookWithoutPages[]
interface BookWithoutPages {
    id: Book["id"]
    title_short: Book["title_short"]
}
type BooksWithoutStars = BookWithoutStars[]
interface BookWithoutStars {
    id: Book["id"]
    title_short: Book["title_short"]
}
type BooksDaysPerBooks = BookDaysPerBook[]
interface BookDaysPerBook {
    id: Book["id"]
    title_short: Book["title_short"]
}
// interface CountBookValues {
// 	/** Count books finished */
// 	cbf: number
// 	/** Count Pages Finished */
// 	cpf: number
// 	/** Count Books Without Pages */
// 	cbwp: number
// 	/** Average Days Per Book */
// 	adpb: number
// 	/** Average Pages Per Day */
// 	appd: number
// 	/** Books Without Pages */
// 	bwp: BooksWithoutPages
// }
