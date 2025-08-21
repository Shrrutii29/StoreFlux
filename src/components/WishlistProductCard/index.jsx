import { useCard } from "../../context/card.context"
import { useNavigate } from "react-router-dom"
import { findProductInCart } from "../../utils/findProductInCart"

export const WishlistProductCard = ({ product }) => {
  const { cart, cardDispatch } = useCard()
  const Navigate = useNavigate()

  const isProductInCart = findProductInCart(cart, product.id)

  const onRemoveClick = (product) => {
    cardDispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: { product },
    })
  }

  const onAddCartClick = (product) => {
    !isProductInCart
      ? cardDispatch({
        type: "ADD_TO_CART",
        payload: { product },
      })
      : Navigate("/cart")
  }

  return (
    <div className="relative flex gap-5 shadow-md rounded-2xl hover:shadow-xl hover:scale-105 transition duration-300 w-full p-6 items-center">
      {/* Wishlist Icon (top-right) */}
      <button
        onClick={() => onRemoveClick(product)}
        className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full bg-red-50 shadow cursor-pointer hover:bg-red-100 transition"
      >
        <span className="material-symbols-outlined text-red-600">
          heart_minus
        </span>
      </button>

      {/* Product Image */}
      <div className="w-28 h-27">
        <img
          src={
            product?.images?.[0] ||
            "https://placehold.co/150x150?text=No+Image"
          }
          alt={product?.title || "Product"}
          className="rounded-xl border"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1 pr-10">
        {/* Title + Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {product?.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-3 mt-1">
            {product?.description}
          </p>
          <p className="text-lg font-bold mt-2 text-gray-900">
            ₹ {product?.price}
          </p>
        </div>

        {/* Actions */}
        <button
          className="mt-2 bg-gradient-to-r from-pink-500 via-orange-500 to-pink-600
          hover:from-pink-600 hover:via-orange-600 hover:to-pink-700
          text-white py-2 rounded-xl hover:bg-pink-600 transition flex gap-3 justify-center"
          onClick={() => onAddCartClick(product)}
        >
          <span className="material-symbols-outlined text-[20px]">
            {isProductInCart
              ? "shopping_cart_checkout"
              : "add_shopping_cart"}
          </span>
          {isProductInCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  )
}
