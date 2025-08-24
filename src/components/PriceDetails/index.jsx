import { useNavigate } from "react-router-dom";
import { useCard } from "../../context/card.context";
import { findTotalCartAmount } from "../../utils/findTotalCartAmount";

export const PriceDetails = () => {
  const { cart, cardDispatch } = useCard();
  const totalCartAmount = findTotalCartAmount(cart);
  const deliveryCharge = 49;
  const navigate = useNavigate()
  const loadScript = (src) => {
    return new Promise(resolve => {
      const script = document.createElement("script")
      script.src = src
      script.onload = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })
  }

  const displayRazorpay = async () => {
    await loadScript("https://checkout.razorpay.com/v1/checkout.js")

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: (totalCartAmount + deliveryCharge) * 100,
      currency: "INR",
      name: "StoreFlux",
      description: "Thank you for shopping with us.",
      image: "https://therightfit.netlify.app/assets/The%20Right%20Fit-logos.jpeg",

      handler: ({ payment_id }) => {
        cardDispatch({
          type: "CLEAR_CART"
        })

        navigate(`/receipt?paymentId=${payment_id}`);

      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className="w-full sm:w-[350px] p-4 sm:p-6 bg-white shadow-lg rounded-2xl border border-gray-200 h-fit">
      {/* Header */}
      <p className="text-xl sm:text-2xl font-bold border-b pb-3 mb-5 text-gray-800">Price Details</p>

      {/* Price breakdown */}
      <div className="flex flex-col gap-3 sm:gap-4 text-gray-700">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between gap-3 sm:gap-5 text-gray-700 text-sm sm:text-base">
            <p>{item.title} x {item.quantity || 1}</p>
            <p>₹ {item.price * (item.quantity || 1)}</p>
          </div>
        ))}
        <div className="flex justify-between font-medium text-gray-800 text-sm sm:text-base">
          <p>Delivery Charge</p>
          <p>₹ {deliveryCharge}</p>
        </div>
      </div>

      {/* Total Amount */}
      <div className="flex font-semibold text-base sm:text-lg border-t border-gray-200 pt-4 mt-5 text-gray-900">
        <p>Total Amount</p>
        <p className="ml-auto text-xl sm:text-2xl font-bold text-blue-700">₹ {totalCartAmount + deliveryCharge}</p>
      </div>

      {/* Place Order Button */}
      <div className="mt-4 sm:mt-6">
        <button
          onClick={displayRazorpay}
          className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 via-orange-500 to-pink-600 hover:from-pink-600 hover:via-orange-600 hover:to-pink-700 text-white text-base sm:text-lg font-semibold rounded-xl shadow-md transition-all cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>

  );
};
