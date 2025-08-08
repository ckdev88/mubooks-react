// TODO account_emails: when making an account on an emailaddress that already exists, send an email to that address, need to figure out text for that
/*
https://ckdev88.github.io/mubooks/#error=access_denied&error_code=403&error_description=Email+link+is+invalid+or+has+expired
*/
import { useCallback, useContext, useEffect, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../App"
import { supabase, localStorageKey } from "../../utils/supabase"
import { getUrlParamVal } from "../Helpers"

const RootPage = () => {
    const navigate = useNavigate()
    const { setUsermail, userIsLoggedIn, setPopupNotification, setPopupNotificationShow } =
        useContext(AppContext)

    // Memoize URL and tokens
    const { url, accessToken, refreshToken } = useMemo(
        () => ({
            url: window.location.href,
            accessToken: getUrlParamVal(window.location.href, "access_token", true),
            refreshToken: getUrlParamVal(window.location.href, "refresh_token", true),
        }),
        [],
    )

    // Memoize user from localStorage
    const userInLs = useMemo(() => {
        const item = localStorage.getItem(localStorageKey)
        return item ? JSON.parse(item) : null
    }, [])

    // Memoize API error check
    const hasApiError = useMemo(() => Boolean(getUrlParamVal(url, "error", true)), [url])

    // Memoize API errors
    const apiErrors = useMemo(
        () => ({
            error: getUrlParamVal(url, "error", true),
            error_code: getUrlParamVal(url, "error_code", true),
            error_description: getUrlParamVal(url, "error_description", true),
        }),
        [url],
    )

    // Handle token login
    const loginWithToken = useCallback(async (accessToken: string, refreshToken: string) => {
        if (!accessToken || !refreshToken) return

        const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
        })
        if (error) {
            console.error("Error logging in with token:", error.message)
        }
    }, [])

    // Handle navigation logic
    useEffect(() => {
        const isAuthenticated = userInLs?.user?.aud === "authenticated"
        const isRecovery = getUrlParamVal(url, "type") === "recovery"

        let navigateTo: string

        if (hasApiError) {
            navigateTo = `/error?error_description=${encodeURIComponent(apiErrors.error_description)}`
        } else if (isAuthenticated) {
            navigateTo = "/dashboard"
            setUsermail(userInLs.user.email)
            setPopupNotification("Logged in, redirecting")
            setPopupNotificationShow(true)
        } else {
            navigateTo = isRecovery ? "/auth/resetpassword" : "/account/login"
        }

        // Handle token login if tokens exist
        if (accessToken && refreshToken) {
            loginWithToken(accessToken, refreshToken)
        }

        // Navigate immediately unless we need to wait for auth state
        if (!userIsLoggedIn || isAuthenticated) {
            navigate(navigateTo)
        }
    }, [
        url,
        hasApiError,
        apiErrors.error_description,
        userInLs,
        accessToken,
        refreshToken,
        loginWithToken,
        navigate,
        setUsermail,
        userIsLoggedIn,
        setPopupNotification,
        setPopupNotificationShow,
    ])

    return (
        <main id="main">
            <div>
                Redirecting to wherever you should be right now... <br />
                <Link to="/dashboard">dashboard</Link>
                <br />
                <Link to="/auth/resetpassword">password reset page</Link>
            </div>
        </main>
    )
}

export default RootPage
