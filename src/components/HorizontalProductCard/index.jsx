import { useCard } from "../../context/card.context"
import { findProductInWishlist } from "../../utils/findProductInWishlist"

export const HorizontalProductCard = ({ product }) => {
  const { wishlist, cart, cardDispatch } = useCard()
  const isProductInWishlist = findProductInWishlist(wishlist, product.id)

  // Get quantity from cart context
  const cartItem = cart.find((item) => item.id === product.id)
  const quantity = cartItem?.quantity || 1

  const onRemoveClick = (product) => {
    cardDispatch({
      type: "REMOVE_FROM_CART",
      payload: { id: product.id },
    })
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

  const onIncreaseQuantity = () => {
    cardDispatch({
      type: "UPDATE_CART_QUANTITY",
      payload: { id: product.id, quantity: quantity + 1 },
    })
  }

  const onDecreaseQuantity = () => {
    if (quantity > 1) {
      cardDispatch({
        type: "UPDATE_CART_QUANTITY",
        payload: { id: product.id, quantity: quantity - 1 },
      })
    }
  }

  return (
    <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-5 shadow-md rounded-2xl hover:shadow-xl hover:scale-105 transition duration-300 w-full p-4 sm:p-6 items-center bg-white">
      {/* Product Image */}
      <div className="sm:w-28 h-48 sm:h-28 flex-shrink-0">
        <img
          src={product?.images?.[0] || "https://placehold.co/150x150?text=No+Image"}
          alt={product?.title || "Product"}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-between flex-1 mt-3 sm:mt-0">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{product?.title}</h3>
          <p className="text-gray-500 text-sm mt-1 line-clamp-2">{product?.description}</p>
          <p className="text-lg font-bold mt-2 text-gray-900">₹ {product?.price}</p>
        </div>

        {/* Quantity + Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
          {/* Quantity */}
          <div className="flex items-center gap-2 border rounded-full px-3 py-1 bg-gray-50 shadow-inner">
            <button
              className="px-2 text-lg font-bold text-gray-600 hover:text-gray-800 transition cursor-pointer"
              onClick={onDecreaseQuantity}
            >
              -
            </button>
            <span className="px-2 font-medium text-gray-700">{quantity}</span>
            <button
              className="px-2 text-lg font-bold text-gray-600 hover:text-gray-800 transition cursor-pointer"
              onClick={onIncreaseQuantity}
            >
              +
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => onWishlistClick(product)}
              className="flex items-center gap-1 text-pink-600 hover:text-pink-700 bg-pink-50 px-3 py-1 rounded-full shadow hover:bg-pink-100 transition text-sm sm:text-base cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] sm:text-[22px]">
                {isProductInWishlist ? "heart_minus" : "heart_plus"}
              </span>
              Wishlist
            </button>
            <button
              onClick={() => onRemoveClick(product)}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 bg-red-50 px-3 py-1 rounded-full shadow hover:bg-red-100 transition text-sm sm:text-base cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] sm:text-[20px]">shopping_cart_off</span>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
