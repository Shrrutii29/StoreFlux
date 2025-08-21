import { useCart } from "../../context/cart.context"
import { fineProductInCart } from "../../utils/findProductInCart"
import { useNavigate } from "react-router-dom"

export const ProductCard = ({ product }) => {

    const { cart, cartDispatch } = useCart()
    const navigate = useNavigate()
    const isProductInCart = fineProductInCart(cart, product.id)

    const onAddCartClick = (product) => {
        !isProductInCart ? cartDispatch({
            type: 'ADD_TO_CART',
            payload: { product }
        }) : navigate("/cart")
    }
    return (
        <div className="max-w-sm bg-white shadow-md rounded-lg m-4 flex flex-col justify-between">
            {/* Product Image */}
            <div className="h-64 w-full flex items-center justify-center">
                <img
                    src={product.images?.[0] || "https://placehold.co/150x150?text=No+Image"}
                    alt={product.title || "Product Image"}
                    className="h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null; // prevent infinite loop
                        e.target.src = "https://placehold.co/150x150?text=No+Image";
                    }}
                />

            </div>

            {/* Product Details */}
            <div className="p-4">
                <h1 className="text-lg font-semibold mb-2">{product.title}</h1>
                <div className="mb-2">
                    <p className="text-gray-600 truncate">{product.description}</p>
                    <p className="text-gray-800 font-bold">
                        Rs. {product.price}
                    </p>
                </div>

                {/* Add to Cart Button */}
                <div className="flex gap-5 mt-auto">
                    <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800 transition">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '20px' }}
                        >
                            favorite
                        </span>
                        Add to Wishlist
                    </button>
                    <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800 transition" onClick={() => onAddCartClick(product)}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                            {
                                isProductInCart ? 'shopping_cart_checkout' : 'add_shopping_cart'
                            }
                        </span>
                        {
                            isProductInCart ? 'Go to Cart' : 'Add to Cart'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
