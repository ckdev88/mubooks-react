import { useContext, useEffect, useState } from "react"
import BooksOverviewPage from "@/pages/books/BooksOverviewPage"
import { getOlCover } from "@/Helpers"
import Heading from "@/components/ui/Heading"
import { motion } from "motion/react"
import BtnBig from "@/components/ui/buttons/BtnBig"
import SearchResultsMessage from "@/components/SearchResultsMessage"
import { AppContext } from "@/App"

const pageTitle = "Search"
const currentPage = "search"
const minimumSearchLetters = 3
const maximumSearchResults = 30
const maximumSearchResultsMessage =
    "Showing only" + maximumSearchResults + " results. Specify a bit more."

const SearchPage = () => {
    const { GLOBALS } = useContext(AppContext)
    const [resultsMessage, setResultsMessage] = useState<string>("")
    const [resultCount, setResultCount] = useState<number>(0)
    const [searchResults, setSearchResults] = useState<Books>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        document.getElementById("search_term")?.focus()
    }, [])

    async function processSearchForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const search_term: string = e.currentTarget.search_term.value.trim()
        if (search_term.length > minimumSearchLetters) {
            setLoading(true)
            setResultsMessage("")
            const searchfields: string =
                "title,author_name,isbn,cover_edition_key,author_key,edition_key,key,first_publish_year,number_of_pages_median,subject"
            await fetch(
                "https://openlibrary.org/search.json?q=" +
                    search_term +
                    "&mode=everything&limit=" +
                    maximumSearchResults +
                    "&fields=" +
                    searchfields,
            )
                .then((response) => response.json())
                .then((json) =>
                    json.docs.filter(
                        (r: Book) =>
                            r.author_key !== undefined &&
                            r.edition_key !== undefined &&
                            r.key !== undefined &&
                            r.cover_edition_key !== undefined,
                    ),
                )
                .then((filtered) => {
                    setResultCount(filtered.length)
                    for (let i = 0; i < filtered.length; i++) {
                        filtered[i].id = filtered[i].key.toString().replace("/works/", "")
                        filtered[i].title_short = filtered[i].title.slice(0, 45).toString()
                        filtered[i].cover = getOlCover(filtered[i].cover_edition_key)
                    }
                    filtered.length > maximumSearchResults
                        ? setResultsMessage(maximumSearchResultsMessage)
                        : setResultsMessage("Showing " + filtered.length + " results.")
                    setSearchTerm(search_term)
                    return filtered
                })
                .then((result) => {
                    setSearchResults(result)
                })
                .catch((error) => setResultsMessage("error " + error))
                .finally(() => setLoading(false))
        } else if (search_term.length === 0) setResultsMessage(search_term)
        else setResultsMessage("keep typing...")
        // console.log('search performed in:', performance.now() - before)
    }

    return (
        <>
            <motion.div {...GLOBALS.motionPageProps}>
                <div>
                    <Heading text={pageTitle} sub="Find the book you want to add" />
                    <form onSubmit={processSearchForm}>
                        <label htmlFor="search_term">
                            <div className="description">Term or title</div>
                            <input type="text" id="search_term" />
                        </label>
                        <BtnBig bType="submit" bIsLoading={loading} bText="Search" />
                    </form>
                    <div>
                        <SearchResultsMessage
                            searchTerm={searchTerm}
                            resultsMessage={resultsMessage}
                            resultCount={resultCount}
                        />
                        <BooksOverviewPage books={searchResults} page={currentPage} />
                    </div>
                </div>
            </motion.div>
        </>
    )
}
export default SearchPage
