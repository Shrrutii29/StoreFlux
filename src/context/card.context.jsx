import { createContext, useContext, useReducer } from "react";
import { cardReducer } from "../reducers/cardReducer";

const CardContext = createContext()

const CardProvider = ({children}) => {

    const initialState = {
        cart: [],
        wishlist: []
    }
    const [{cart, wishlist}, cardDispatch] = useReducer(cardReducer, initialState)
    
    return (
        <CardContext.Provider value={{cart, wishlist, cardDispatch}}>
            {children}
        </CardContext.Provider>
    )
}

const useCard = () => {
    return useContext(CardContext)

}

export {CardProvider, useCard}