import { createContext, useContext, useReducer } from "react";
import { cardReducer } from "../reducers/cardReducer";
import { useAuth } from "./auth.context";

const CardContext = createContext()

const CardProvider = ({ children }) => {
    const { id } = useAuth()

    const initialState = {
        cart: JSON.parse(localStorage.getItem('cart')) || [],
        wishlist: JSON.parse(localStorage.getItem('wishlist')) || []
    }
    const [{ cart, wishlist }, cardDispatch] = useReducer(cardReducer, initialState)

    return (
        <CardContext.Provider value={{ cart, wishlist, cardDispatch }}>
            {children}
        </CardContext.Provider>
    )
}

const useCard = () => {
    return useContext(CardContext)

}

export { CardProvider, useCard }