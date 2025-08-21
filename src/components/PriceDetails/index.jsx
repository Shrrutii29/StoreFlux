import { useCart } from "../../context/cart.context"
import { findTotalCartAmount } from "../../utils/findTotalCartAmount"

export const PriceDetails = () => {
  const { cart } = useCart()

  const totalCartAmount = findTotalCartAmount(cart)
  const deliveryCharge = 49

  return (
    <div className="w-[320px] p-5 bg-white shadow-md rounded-xl border border-gray-200 h-fit">
      <p className="text-xl font-semibold border-b pb-3 mb-4 text-gray-800">Price Details</p>

      <div className="flex flex-col gap-4 text-gray-700">
        <div className="flex">
          <p>Price ({cart.length} items)</p>
          <p className="ml-auto font-medium">₹ {totalCartAmount}</p>
        </div>
        <div className="flex">
          <p>Delivery Charge</p>
          <p className="ml-auto text-green-600 font-medium">Rs. {deliveryCharge} </p>
        </div>
      </div>

      <div className="flex font-semibold text-lg border-t pt-4 mt-4 text-gray-800">
        <p>Total Amount</p>
        <p className="ml-auto">₹ {totalCartAmount + deliveryCharge}</p>
      </div>

      <div className="mt-6">
        <button className="w-full py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition">
          Place Order
        </button>
      </div>
    </div>
  )
}
