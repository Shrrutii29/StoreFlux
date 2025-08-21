export const ProductCard = ({ product }) => {
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
                    <button className="flex items-center gap-2 bg-sky-700 text-white px-4 py-2 rounded hover:bg-sky-800 transition">
                        <span
                            className="material-symbols-outlined"
                            style={{ fontSize: '20px' }}
                        >
                            add_shopping_cart
                        </span>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}
