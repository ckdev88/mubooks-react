const SearchResultsMessage = ({
    searchTerm,
    resultsMessage,
    resultCount,
}: {
    searchTerm: string
    resultsMessage: string
    resultCount: number
}): JSX.Element => {
    return (
        <>
            <div className={searchTerm !== "" || resultsMessage !== "" ? "dblock" : "dnone"}>
                <div className="h2 resultsfound">
                    {resultCount > 30 ? "Over 30" : resultCount}
                    {resultCount > 1 || resultCount === 0 ? " books" : " book"} found for{" "}
                    <em>"{searchTerm}"</em>
                    <sub className={resultsMessage !== "" ? "dblock" : "dnone"}>
                        {resultsMessage}
                    </sub>
                </div>
            </div>
        </>
    )
}
export default SearchResultsMessage
