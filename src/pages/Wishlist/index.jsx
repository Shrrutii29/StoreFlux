import { Navbar } from "../../components/Navbar"
import { useCard } from "../../context/card.context"
import { useNavigate } from "react-router-dom"
import { WishlistProductCard } from "../../components/WishlistProductCard"

export const Wishlist = () => {

    const { wishlist } = useCard()
    const Navigate = useNavigate()
    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center justify-center bg-gray-50 min-h-screen px-4">                {
                wishlist?.length > 0 ? (
                    <>
                        <h2 className="text-3xl font-bold mb-6 text-gray-900">My Wishlist</h2>
                        <div className="flex flex-col items-center justify-center lg:flex-row gap-10 w-full max-w-6xl">

                            {/* Wishlist Items */}
                            <div className="grid grid-cols-1 place-items-center gap-4 w-full lg:w-2/3">
                                {
                                    wishlist?.length > 0 ? wishlist.map(product => <WishlistProductCard key={product.id} product={product} />) : <p>Wishlist is empty, add product to wishlist</p>
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 px-6 bg-white shadow-lg rounded-xl w-200">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-6">🛒 Your Wishlist is Empty</h1>
                        <button
                            onClick={() => Navigate("/")}
                            className="cursor-pointer text-lg bg-gradient-to-r from-orange-400 via-pink-400 to-pink-500 hover:from-orange-500 hover:via-pink-500 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md"
                        >
                            ➕ Browse Products
                        </button>
                    </div>
                )}
            </main>
        </>
    )

}