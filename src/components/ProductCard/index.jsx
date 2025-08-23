import { useCard } from "../../context/card.context"
import { findProductInCart } from "../../utils/findProductInCart"
import { findProductInWishlist } from "../../utils/findProductInWishlist"
import { useNavigate } from "react-router-dom"

export const ProductCard = ({ product }) => {
    const { wishlist, cart, cardDispatch } = useCard()
    const navigate = useNavigate()
    const isProductInCart = findProductInCart(cart, product.id)
    const isProductInWishlist = findProductInWishlist(wishlist, product.id)

    const onAddCartClick = (product) => {
        !isProductInCart
            ? cardDispatch({
                type: "ADD_TO_CART",
                payload: { product },
            })
            : navigate("/cart")
    }

    const onWishlistClick = (product) => {
        !isProductInWishlist
            ? cardDispatch({
                type: "ADD_TO_WISHLIST",
                payload: { product },
            })
            : cardDispatch({
                type: "REMOVE_FROM_WISHLIST",
                payload: { product },
            })
    }

    return (
        <div className="relative max-w-sm w-full sm:w-80 bg-white shadow-lg rounded-2xl m-2 flex flex-col justify-between hover:shadow-2xl hover:scale-[1.02] transition-transform duration-300">
            {/* Wishlist Icon */}
            <button
                onClick={() => onWishlistClick(product)}
                className={`absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full shadow-md transition-colors z-10 ${isProductInWishlist ? "bg-pink-800 hover:bg-pink-300" : "bg-white hover:bg-pink-100"}`}
            >
                <span className={`material-symbols-outlined text-[22px] ${isProductInWishlist ? "text-gray-100" : "text-pink-600"}`}>
                    {isProductInWishlist ? "heart_minus" : "heart_plus"}
                </span>
            </button>

            {/* Product Image */}
            <div className="h-64 sm:h-72 w-full flex items-center justify-center bg-gray-50 rounded-t-2xl overflow-hidden">
                <img
                    src={product.images?.[0] || "https://placehold.co/300x300?text=No+Image"}
                    alt={product.title || "Product Image"}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300?text=No+Image"; }}
                />
            </div>

            {/* Product Details */}
            <div className="p-4 sm:p-5 flex flex-col flex-grow">
                <h1 className="text-base sm:text-lg font-semibold mb-1 line-clamp-1 text-gray-900">
                    {product.title}
                </h1>
                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-2">
                    {product.description}
                </p>
                <p className="text-lg sm:text-xl font-bold text-blue-600 mb-3">
                    ₹ {product.price}
                </p>

                {/* Cart Button */}
                <button
                    className="mt-auto flex items-center justify-center gap-2
      bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500
      hover:from-orange-600 via-orange-700 to-pink-600
      text-white px-3 sm:px-5 py-2.5 rounded-full
      shadow-lg hover:shadow-xl
      transition-all duration-300"
                    onClick={() => onAddCartClick(product)}
                >
                    <span className="material-symbols-outlined text-[18px] sm:text-[20px]">
                        {isProductInCart ? "shopping_cart_checkout" : "add_shopping_cart"}
                    </span>
                    {isProductInCart ? "Go to Cart" : "Move to Cart"}
                </button>
            </div>
        </div>

    )
}