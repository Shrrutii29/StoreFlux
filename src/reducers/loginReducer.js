export const loginReducer = (state, { type, payload }) => {
    switch (type) {
        case 'NAME':
            return {
                ...state,
                name: payload.value
            }
        case 'EMAIL':
            return {
                ...state,
                email: payload.value
            }
        case 'PASSWORD':
            return {
                ...state,
                password: payload.value
            }
        case 'TOKEN':
            return {
                ...state,
                token: payload.token
            }
        case 'ID':
            return {
                ...state,
                id: payload.id
            }

        case 'LOGOUT':
            return {
                ...state,
                email: '',
                password: '',
                token: ''
            }

        case "UPDATE_USER":
            // ✅ update flat fields instead of nested inside token
            return {
                ...state,
                id: payload.user.id,
                name: payload.user.name,
                email: payload.user.email
            };
        default:
            return state
    }

}