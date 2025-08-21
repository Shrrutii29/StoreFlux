import { useCart } from "../../context/cart.context"

export const HorizontalProductCard = ({ product }) => {
    const {cartDispatch} = useCart()

    const onRemoveClick = (product) => {

        cartDispatch({
            type: 'REMOVE_FROM_CART',
            payload: {id:product.id}
        })
    }
    return (
      <div className="flex gap-4 border rounded-xl shadow-md p-4 w-full bg-white">
        {/* Product Image */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <img
            src={product?.images?.[0] || "https://placehold.co/150x150?text=No+Image"}
            alt={product?.title || "Product"}
            className="w-full h-full object-cover rounded-lg border"
          />
        </div>
  
        {/* Product Details */}
        <div className="flex flex-col justify-between flex-1">
          {/* Title + Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product?.title}</h3>
            <p className="text-gray-500 text-sm line-clamp-2">{product?.description}</p>
            <p className="text-lg font-bold mt-1 text-gray-800">₹ {product?.price}</p>
          </div>
  
          {/* Quantity + Actions */}
          <div className="flex items-center justify-between mt-3">
            {/* Quantity */}
            <div className="flex items-center gap-2 border rounded-lg px-3 py-1">
              <button className="px-2 text-lg font-bold text-gray-600 hover:text-gray-800">-</button>
              <span className="px-2 font-medium">1</span>
              <button className="px-2 text-lg font-bold text-gray-600 hover:text-gray-800">+</button>
            </div>
  
            {/* Actions */}
            <div className="flex gap-4">
              <button className="flex items-center gap-1 text-pink-600 hover:text-pink-700 transition text-sm font-medium">
                <span className="material-symbols-outlined text-[20px]">favorite</span>
                Wishlist
              </button>
              <button onClick={() => onRemoveClick(product)} className="flex items-center gap-1 text-red-600 hover:text-red-700 transition text-sm font-medium">
                <span className="material-symbols-outlined text-[20px]">shopping_cart_off</span>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  