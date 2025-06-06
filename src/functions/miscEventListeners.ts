if (location.hostname === "localhost") {
    addEventListener("keydown", (keyboardEvent: KeyboardEvent) => {
        if (keyboardEvent.ctrlKey && keyboardEvent.key === "k") {
            keyboardEvent.preventDefault()
            if (location.pathname !== "/mubooks") location.pathname = "/mubooks"
            if (location.hash.split("/").pop() !== "search") location.hash = "#/search"
        }
        if (keyboardEvent.key === "/") {
            keyboardEvent.preventDefault()
            document.getElementById("search_term")?.setAttribute("value", "calvin")
            document.getElementById("search_term")?.focus()
        }
    })
}
