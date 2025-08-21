import { Navbar } from "../../components/Navbar"
import { HorizontalProductCard } from "../../components/HorizontalProductCard"
import { useCart } from "../../context/cart.context"
import { PriceDetails } from "../../components/PriceDetails"
import { useNavigate } from "react-router-dom"

export const Cart = () => {

    const { cart } = useCart()
    const Navigate = useNavigate()
    return (
        <>
            <Navbar />
            <main className="flex flex-col items-center pt-6">
                {
                    cart?.length > 0 ? (
                        <>
                            <h2 className="text-3xl">My Cart</h2>
                            <div className="flex gap-10 ">
                                <div className="pt-4 flex flex-col gap-4 max-w-2xl w-full mx-auto">
                                    {
                                        cart?.length > 0 ? cart.map(product => <HorizontalProductCard key={product.id} product={product} />) : <p>Cart is empty, add product to cart</p>
                                    }
                                </div>
                                <PriceDetails />
                            </div>
                        </>
                    ) : <div className="flex flex-col items-center justify-center py-16 px-6 bg-white shadow-md rounded-lg">
                        <h1 className="text-2xl font-semibold text-gray-800 mb-4">🛒 Your Cart is Empty</h1>
                        <p
                            onClick={() => Navigate('/')}
                            className="cursor-pointer text-lg bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg transition"
                        >
                            ➕ Click here to add items
                        </p>
                    </div>

                }
            </main>
        </>
    )

}