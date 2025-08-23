import { Navbar } from "../../components/Navbar";
import { HorizontalProductCard } from "../../components/HorizontalProductCard";
import { useCard } from "../../context/card.context";
import { PriceDetails } from "../../components/PriceDetails";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { cart } = useCard();
  const Navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center bg-gray-50 min-h-screen px-4 py-8">
        {cart?.length > 0 ? (
          <>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              My Cart
            </h2>
            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">

              {/* Cart Items */}
              <div className="flex flex-col gap-4 w-full lg:w-2/3">
                {cart.map((product) => (
                  <HorizontalProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Price Details */}
              <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
                <PriceDetails />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 px-6 bg-white shadow-lg rounded-xl w-full sm:w-200">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6">
              🛒 Your Cart is Empty
            </h1>
            <button
              onClick={() => Navigate("/")}
              className="cursor-pointer text-lg bg-gradient-to-r from-orange-400 via-pink-400 to-pink-500 hover:from-orange-500 hover:via-pink-500 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md"
            >
              ➕ Browse Products
            </button>
          </div>
        )}
      </main>
    </>
  );
};
