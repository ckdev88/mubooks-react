import { Routes, Route } from "react-router-dom"
import "@/functions/miscEventListeners.ts"
import { isLocal } from "@/utils/Helpers.ts"

// components
import Footer from "@/components/layout/Footer.tsx"
import NavWrapper from "@/components/NavWrapper"
import PopupNotification from "@/components/ui/PopupNotification"

// pages
import AuthConfirm from "@/pages/auth/AuthConfirm"
import ResetPasswordPage from "@/pages/auth/ResetPassword"
import DashboardPage from "@/pages/account/Dashboard"
import CheckMailNewAccountPage from "@/pages/account/CheckMailNewAccount"
import CheckMailPasswordPage from "@/pages/account/CheckMailPassword"
import UserLoginPage from "@/pages/account/UserLogin"
import UserLogoutPage from "@/pages/account/UserLogout"
import UserProfilePage from "@/pages/account/UserProfile"
import SavedBooksPage from "@/pages/SavedBooks"
import AddBookPage from "@/pages/AddBook"
import ClearMyBooks from "@/pages/ClearMyBooks"
import FavouritesPage from "@/pages/Favourites"
import FinishedPage from "@/pages/Finished"
import QuotedPage from "@/pages/Quoted"
import ReadingPage from "@/pages/Reading"
import SearchPage from "@/pages/Search"
import StatisticsPage from "@/pages/Statistics"
import TossedPage from "@/pages/Tossed"
import TropesPage from "@/pages/Tropes"
import WishlistPage from "@/pages/Wishlist"
import ErrorPage from "@/pages/Error"
import RootPage from "@/pages/Root"
import SuggestionsPage from "@/pages/Suggestions"

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
                        <Footer />
                    </div>
                )}
            </>
        </>
    )
}

export default App
