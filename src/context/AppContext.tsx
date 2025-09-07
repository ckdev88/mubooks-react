import { createContext, useState, useEffect, useMemo } from "react"
import { supabase, localStorageKey } from "@/../utils/supabase"
import useInsertEmptyArray from "@/hooks/useInsertEmptyArray.ts"
import { timestampConverter } from "@/utils/convertDate"
const insertEmptyArray = useInsertEmptyArray()

const BG_COLORS = { dark: "#152129", light: "#f4f1ea" }

export const AppContext = createContext<AppContextType>({} as AppContextType)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const initVal = {
        userIsLoggedIn: false,
        username: null,
        userid: null,
        usermail: null,
        darkTheme: undefined,
    }
    if (localStorage.getItem(localStorageKey)) {
        const parsed = JSON.parse(localStorage.getItem(localStorageKey) as string)
        initVal.userIsLoggedIn = true
        initVal.username = parsed.user.user_metadata.screenname
        initVal.userid = parsed.user.id
        initVal.usermail = parsed.user.email
        initVal.darkTheme = parsed.user.user_metadata.darktheme
    }
    const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(initVal.userIsLoggedIn)
    const [userid, setUserid] = useState<string | null>(initVal.userid)
    const [username, setUsername] = useState<string | null>(initVal.username)
    const [usermail, setUsermail] = useState<string | null>(initVal.usermail)
    const [darkTheme, setDarkTheme] = useState<undefined | boolean>(initVal.darkTheme)

    const [userMyBooks, setUserMyBooks] = useState<Books | undefined>(undefined)
    const [popupNotification, setPopupNotification] = useState<string>("")
    const [popupNotificationShow, setPopupNotificationShow] = useState<boolean>(false)
    const [initialMyBooksSet, setInitialMyBooksSet] = useState<boolean>(false)
    const [bodyBgColor, setBodyBgColor] = useState<string>(
        darkTheme ? BG_COLORS.dark : BG_COLORS.light,
    )
    const [pageName, setPageName] = useState<string>("default")

    const GLOBALS: GlobalSettings = useMemo(
        () => ({
            headingIconsEnabled: false,
            synopsisEnabled: false,
            motionPageProps: {
                initial: {
                    opacity: 0,
                },
                exit: { opacity: 0 },
                transition: { duration: 1, delay: 0.19 },
                animate: { opacity: 1 },
            },
            userid: userid, // TODO check if used and/or remove
            bookRemoveAnimationDuration: 250,
        }),
        [userid],
    )

    const todaysDateDigit = Number(timestampConverter(Date.now(), "digit"))
    const todaysDateInput = timestampConverter(Date.now(), "input")

    const persistMyBooks = async () => {
        let booksArr: Books = []
        const res = await supabase.from("user_entries").select("json")
        if (res.data) {
            if (res.data.length === 0)
                await insertEmptyArray().catch(() => console.log("ging wat fout yo"))
            else booksArr = res.data[0].json
            setInitialMyBooksSet(true)
            setUserMyBooks(booksArr)
            return
        }
    }

    useEffect(() => {
        if (userIsLoggedIn === true && userMyBooks === undefined) {
            persistMyBooks()
        }
    }, [userIsLoggedIn, initialMyBooksSet, userMyBooks])

    useEffect(() => {
        if (userIsLoggedIn) {
            document.getElementsByTagName("html")[0].classList.add("loggedin")
        } else {
            document.getElementsByTagName("html")[0].classList.remove("loggedin")
        }
    }, [userIsLoggedIn])

    useEffect(() => {
        const htmlNode = document.getElementsByTagName("html")[0]
        if (darkTheme === true) {
            if (!htmlNode.classList.contains("dark-mode")) htmlNode.classList.add("dark-mode")
            setBodyBgColor(BG_COLORS.dark)
        } else {
            htmlNode.classList.remove("dark-mode")
            setBodyBgColor(BG_COLORS.light)
        }
    }, [darkTheme])

    return (
        <AppContext.Provider
            value={{
                popupNotification,
                popupNotificationShow,
                setPopupNotification,
                setPopupNotificationShow,
                setUserIsLoggedIn,
                setUserMyBooks,
                setUserid,
                setUsermail,
                setUsername,
                todaysDateInput,
                todaysDateDigit,
                userIsLoggedIn,
                userMyBooks,
                userid,
                usermail,
                username,
                setDarkTheme,
                darkTheme,
                bodyBgColor,
                pageName,
                setPageName,
                GLOBALS,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
