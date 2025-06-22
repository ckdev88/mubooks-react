import logError from "../utils/logError"
const getListName = (listId: BookList): string => {
    if (listId === undefined || listId > 4 || listId < 1)
        logError("getListName", "getListName.ts", 4)

    const listNameMap = {0: "outerspace", 1: "wishlist", 2: "reading", 3: "finished", 4: "favorite" }
    return listNameMap[listId]
}
export default getListName
