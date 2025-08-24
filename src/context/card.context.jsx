import { createContext, useContext, useReducer, useEffect } from "react";
import { cardReducer } from "../reducers/cardReducer";
import { useAuth } from "./auth.context";

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const { id } = useAuth();

  const initialState = { cart: [], wishlist: [] };
  const [state, cardDispatch] = useReducer(cardReducer, initialState);

  // Whenever user ID changes, load their cart/wishlist from localStorage
  useEffect(() => {
    if (id) {
      const userCart = JSON.parse(localStorage.getItem(`cart_${id}`)) || [];
      const userWishlist = JSON.parse(localStorage.getItem(`wishlist_${id}`)) || [];

      cardDispatch({ type: "SET_CART", payload: userCart });
      cardDispatch({ type: "SET_WISHLIST", payload: userWishlist });
    } else {
      // If no user, reset to empty arrays
      cardDispatch({ type: "SET_CART", payload: [] });
      cardDispatch({ type: "SET_WISHLIST", payload: [] });
    }
  }, [id]);

  // Save to localStorage whenever cart/wishlist changes
  useEffect(() => {
    if (id) localStorage.setItem(`cart_${id}`, JSON.stringify(state.cart));
  }, [state.cart, id]);

  useEffect(() => {
    if (id) localStorage.setItem(`wishlist_${id}`, JSON.stringify(state.wishlist));
  }, [state.wishlist, id]);

  return (
    <CardContext.Provider value={{ ...state, cardDispatch }}>
      {children}
    </CardContext.Provider>
  );
};

const useCard = () => useContext(CardContext);

export { CardProvider, useCard };
