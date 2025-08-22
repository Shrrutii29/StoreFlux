export const cardReducer = (state, { type, payload }) => {
    console.log("Reducer called:", type, payload);

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
            console.log("Before Add:", state.wishlist);

            return {
                ...state,
                wishlist: [...state.wishlist, payload.product]
            }

        case 'REMOVE_FROM_WISHLIST':
            console.log("Before Remove:", state.wishlist);

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

        default:
            return state

    }

}