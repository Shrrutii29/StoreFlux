import { useState } from "react";
import { useCard } from "../../context/card.context";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth.context";

export const Navbar = () => {
    const navigate = useNavigate();
    const { cart, wishlist } = useCard();
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
    const { token, authDispatch } = useAuth()

    const onLoginClick = () => {
        if (!token?.access_token) {
            navigate('/auth/login')
        } else {
            authDispatch({
                type: 'LOGOUT'

            })
            navigate('/auth/login')
        }
    }
    return (
        <header className="flex w-full h-full justify-between bg-slate-800 px-4 py-3 shadow-lg relative">
            {/* Logo */}
            <div className="cursor-pointer mb-2 sm:mb-0" onClick={() => navigate("/")}>
                <h1 className="text-4xl font-extrabold text-white tracking-tight hover:text-sky-600 transition-colors">
                    StoreFlux
                </h1>
            </div>

            {/* Navigation Icons */}
            <nav className="flex items-center gap-4 sm:gap-6 relative">
                {/* Wishlist */}
                <div className="relative">
                    <span
                        onClick={() => navigate("/wishlist")}
                        className="material-symbols-outlined text-white hover:text-pink-400 cursor-pointer transition-colors duration-300 text-2xl sm:text-[30px]"
                    >
                        favorite
                    </span>
                    {wishlist.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            {wishlist.length}
                        </span>
                    )}
                </div>

                {/* Cart */}
                <div className="relative">
                    <span
                        onClick={() => navigate("/cart")}
                        className="material-symbols-outlined text-white hover:text-yellow-400 cursor-pointer transition-colors duration-300 text-2xl sm:text-[30px]"
                    >
                        shopping_cart
                    </span>
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            {cart.length}
                        </span>
                    )}
                </div>

                {/* Account */}
                <div className="relative">
                    <span
                        onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                        className="material-symbols-outlined text-white hover:text-green-400 cursor-pointer transition-colors duration-300 text-3xl"
                    >
                        account_circle
                    </span>

                    {isAccountDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in">
                            {!token?.access_token ? (
                                <>
                                    {/* Login */}
                                    <button
                                        onClick={onLoginClick}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-green-500 hover:text-white transition"
                                    >
                                        <span className="material-symbols-outlined text-lg">login</span>
                                        Login
                                    </button>

                                    {/* Sign Up */}
                                    <button
                                        onClick={() => navigate("/auth/signup")}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-blue-500 hover:text-white transition"
                                    >
                                        <span className="material-symbols-outlined text-lg">how_to_reg</span>
                                        Sign Up
                                    </button>
                                </>
                            ) : (
                                <>
                                    {/* Logout */}
                                    <button
                                        onClick={onLoginClick}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-red-500 hover:text-white transition"
                                    >
                                        <span className="material-symbols-outlined text-lg">logout</span>
                                        Logout
                                    </button>

                                    {/* Profile */}
                                    <button
                                        className="w-full flex items-center gap-2 px-4 py-2 text-left text-gray-700 hover:bg-yellow-500 hover:text-white transition"
                                        onClick={() => navigate("/profile")}
                                    >
                                        <span className="material-symbols-outlined text-lg">person</span>
                                        Profile
                                    </button>
                                </>
                            )}
                        </div>
                    )}

                </div>
            </nav>
        </header>

    );
};
