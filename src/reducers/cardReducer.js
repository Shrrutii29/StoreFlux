export const cardReducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, payload.product]
            }

        case 'REMOVE_FROM_CART':
            return {
                ...state,
                cart: state.cart.filter(product => product.id !== payload.id)
            }

        case 'ADD_TO_WISHLIST':
            return {
                ...state,
                wishlist: [...state.wishlist, payload.product]
            }

        case 'REMOVE_FROM_WISHLIST':
            return {
                ...state,
                wishlist: state.wishlist.filter(product => product.id !== payload.product.id)
            }

        case "UPDATE_CART_QUANTITY":
            return {
                ...state,
                cart: state.cart.map((item) =>
                    item.id === payload.id
                        ? { ...item, quantity: payload.quantity }
                        : item
                ),
            }

        case "CLEAR_CART":
            return {
                ...state,
                cart: []
            }

        case "SET_CART":
            return { ...state, cart: payload };

        case "SET_WISHLIST":
            return { ...state, wishlist: payload };


        default:
            return state

    }

}