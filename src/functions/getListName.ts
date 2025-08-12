import logError from "@/utils/logError"
import { listNameMap } from "../i18n/listnames"

const getListName = (listId: BookList, capitalize = false): string => {
    if (listId === undefined || listId > 4 || listId < 0)
        logError("getListName", "getListName.ts", 4, `passed id: ${listId}`)

    if (capitalize)
        return listNameMap[listId].slice(0, 1).toUpperCase() + listNameMap[listId].slice(1)

    return listNameMap[listId]
}
export default getListName
