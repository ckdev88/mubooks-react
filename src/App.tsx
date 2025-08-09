import { Routes, Route } from "react-router-dom"
import "@/functions/miscEventListeners.ts"
import { isLocal } from "@/Helpers.ts"

// components
import AppFooter from "@/components/AppFooter.tsx"
import NavWrapper from "@/components/NavWrapper"
import PopupNotification from "@/components/ui/PopupNotification"

// pages
import AuthConfirm from "@/pages/auth/AuthConfirm"
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage"
import DashboardPage from "@/pages/account/DashboardPage"
import CheckMailNewAccountPage from "@/pages/account/CheckMailNewAccountPage"
import CheckMailPasswordPage from "@/pages/account/CheckMailPasswordPage"
import UserLoginPage from "@/pages/account/UserLoginPage"
import UserLogoutPage from "@/pages/account/UserLogoutPage"
import UserProfilePage from "@/pages/account/UserProfilePage"
import SavedBooksPage from "@/pages/SavedBooksPage"
import AddBookPage from "@/pages/AddBookPage"
import ClearMyBooks from "@/pages/ClearMyBooks"
import FavouritesPage from "@/pages/FavouritesPage"
import FinishedPage from "@/pages/FinishedPage"
import QuotedPage from "@/pages/QuotedPage"
import ReadingPage from "@/pages/ReadingPage"
import SearchPage from "@/pages/SearchPage"
import StatisticsPage from "@/pages/StatisticsPage"
import TossedPage from "@/pages/TossedPage"
import TropesPage from "@/pages/TropesPage"
import WishlistPage from "@/pages/WishlistPage"
import ErrorPage from "@/pages/ErrorPage"
import RootPage from "@/pages/RootPage"
import SuggestionsPage from "@/pages/SuggestionsPage"

import { AppContextProvider, AppContext } from "@/context/AppContext"
import { useContext } from "react"

const App = () => {
    return (
        <AppContextProvider>
            <AppWrapper />
        </AppContextProvider>
    )
}

const AppWrapper = () => {
    const { userIsLoggedIn, pageName } = useContext(AppContext)
    return (
        <>
            <div id="top" style={{ position: "absolute" }} />

            <>
                {userIsLoggedIn && (
                    <header id="header" className="shade">
                        <NavWrapper />
                    </header>
                )}

                <main id="main" className={pageName + " main"}>
                    <PopupNotification />
                    <Routes>
                        <Route path="/*" element={<RootPage />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/account/login" element={<UserLoginPage />} />
                        <Route path="/account/logout" element={<UserLogoutPage />} />
                        <Route path="/auth/confirm" element={<AuthConfirm />} />
                        {!userIsLoggedIn && (
                            <>
                                <Route path="/auth/resetpassword" element={<ResetPasswordPage />} />
                                <Route
                                    path="/account/forgotpassword"
                                    element={<CheckMailPasswordPage />}
                                />
                            </>
                        )}
                        <Route path="/account/new" element={<CheckMailNewAccountPage />} />
                        {userIsLoggedIn && (
                            <>
                                <Route path="/account/profile" element={<UserProfilePage />} />
                                <Route path="/account/*" element={<UserLoginPage />} />
                                <Route path="/suggestions" element={<SuggestionsPage />} />
                                <Route path="/dashboard" element={<DashboardPage />} />
                                <Route path="/search" element={<SearchPage />} />
                                <Route path="/addbook" element={<AddBookPage />} />
                                <Route path="/savedbooks" element={<SavedBooksPage />} />
                                <Route path="/tossed" element={<TossedPage />} />
                                <Route path="/wishlist" element={<WishlistPage />} />
                                <Route path="/reading" element={<ReadingPage />} />
                                <Route path="/finished" element={<FinishedPage />} />
                                <Route path="/favourites" element={<FavouritesPage />} />
                                <Route path="/quoted" element={<QuotedPage />} />
                                <Route path="/tropes" element={<TropesPage />} />
                                <Route path="/statistics" element={<StatisticsPage />} />
                                {isLocal() && (
                                    <Route path="/clear-my-books" element={<ClearMyBooks />} />
                                )}
                            </>
                        )}
                    </Routes>
                </main>

                {userIsLoggedIn && (
                    <div id="footer" className="sf">
                        <AppFooter />
                    </div>
                )}
            </>
        </>
    )
}

export default App
