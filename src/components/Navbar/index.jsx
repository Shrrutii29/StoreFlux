import { useState } from "react";
import { useCard } from "../../context/card.context";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/login.context";

export const Navbar = () => {
    const navigate = useNavigate();
    const { cart, wishlist } = useCard();
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
    const { token, loginDispatch } = useLogin()

    const onLoginClick = () => {
        if (!token?.access_token) {
            navigate('/auth/login')
        } else {
            loginDispatch({
                type: 'LOGOUT'

            })
            navigate('/auth/login')
        }
    }
    return (
        <header className="flex items-center justify-between bg-slate-800 px-8 py-3 shadow-lg relative">
            {/* Logo */}
            <div className="cursor-pointer" onClick={() => navigate("/")}>
                <h1 className="text-6xl md:text-4xl font-extrabold text-white tracking-tight hover:text-sky-600 transition-colors">
                    StoreFlux
                </h1>
            </div>

            {/* Navigation Icons */}
            <nav className="flex items-center gap-6 md:gap-4 relative">
                {/* Wishlist */}
                <div className="relative">
                    <span
                        onClick={() => navigate("/wishlist")}
                        className="material-symbols-outlined text-white hover:text-pink-400 cursor-pointer transition-colors duration-300"
                        style={{ fontSize: "30px" }}
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
                        className="material-symbols-outlined text-white hover:text-yellow-400 cursor-pointer transition-colors duration-300"
                        style={{ fontSize: "30px" }}
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
                    <span onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                        className="material-symbols-outlined text-white hover:text-green-400 cursor-pointer transition-colors duration-300"
                        style={{ fontSize: "30px" }}
                    >
                        account_circle
                    </span>
                    {
                        isAccountDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
                                <button
                                    onClick={onLoginClick}
                                    className="w-full px-4 py-2 text-left text-gray-700 hover:bg-green-500 hover:text-white rounded-md transition"
                                >
                                    {token?.access_token ? 'Logout' : 'Login'}
                                </button>
                            </div>
                        )
                    }



                </div>

            </nav>
        </header>
    );
};
