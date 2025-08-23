import { useLocation } from "react-router-dom";

export default function Receipt() {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("paymentId");

  return (
    <div className="max-w-full sm:max-w-md mx-auto bg-gray-200 shadow-lg rounded-2xl p-6 mt-12 flex flex-col justify-center items-center">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600 mb-4 text-center">
        ✅ Payment Successful!
      </h1>
      <p className="text-gray-700 text-center mb-2">
        Thank you for shopping with <span className="font-semibold">StoreFlux</span>.
      </p>
      
      <div className="bg-gray-100 rounded-lg p-4 mt-4 w-full">
        <p className="font-medium text-gray-800">Receipt</p>
        <p className="text-sm sm:text-base text-gray-600">
          Payment ID: <span className="font-mono break-all">{paymentId}</span>
        </p>
        <p className="text-sm sm:text-base text-gray-600">
          Date: {new Date().toLocaleString()}
        </p>
        {/* You can fetch and show ordered items from DB here */}
      </div>

      <button 
        onClick={() => window.location.href="/"} 
        className="w-full mt-6 py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500
        hover:from-orange-600 via-orange-700 to-pink-600 transition-all"
      >
        Continue Shopping
      </button>
    </div>
  );
}
