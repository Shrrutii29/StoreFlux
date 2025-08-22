import { useCard } from "../../context/card.context";
import { findTotalCartAmount } from "../../utils/findTotalCartAmount";

export const PriceDetails = () => {
  const { cart } = useCard();
  const totalCartAmount = findTotalCartAmount(cart);
  const deliveryCharge = 49;

  return (
    <div className="w-[320px] p-6 bg-white shadow-lg rounded-2xl border border-gray-200 h-fit w-fit">
      {/* Header */}
      <p className="text-2xl font-bold border-b pb-3 mb-5 text-gray-800">Price Details</p>

      {/* Price breakdown */}
      <div className="flex flex-col gap-4 text-gray-700">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between gap-5 text-gray-700">
            <p>{item.title} x {item.quantity || 1}</p>
            <p>₹ {item.price * (item.quantity || 1)}</p>
          </div>
        ))}
        <div className="flex justify-between font-medium text-gray-800">
          <p>Delivery Charge</p>
          <p>₹ {deliveryCharge}</p>
        </div>
      </div>

      {/* Total Amount */}
      <div className="flex font-semibold text-lg border-t border-gray-200 pt-4 mt-5 text-gray-900">
        <p>Total Amount</p>
        <p className="ml-auto text-2xl font-bold text-blue-700">₹ {totalCartAmount + deliveryCharge}</p>
      </div>

      {/* Place Order Button */}
      <div className="mt-6">
        <button className="w-full py-3 bg-gradient-to-r from-pink-500 via-orange-500 to-pink-600 hover:from-pink-600 hover:via-orange-600 hover:to-pink-700 text-white text-lg font-semibold rounded-xl shadow-md transition-all">
          Place Order
        </button>
      </div>
    </div>
  );
};
