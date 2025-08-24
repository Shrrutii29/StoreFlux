export const authReducer = (state, { type, payload }) => {
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

        case 'AVATAR':
            return {
                ...state,
                avatar: payload.value
            }

        case 'LOGOUT':
            return {
                ...state,
                email: '',
                password: '',
                name: '',
                token: ''
            }

        case "SET_USER":
            return { ...state, ...action.payload };

        default:
            return state
    }

}