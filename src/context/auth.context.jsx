import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const initialState = {
        id: localStorage.getItem("userId") || null,
        email: '',
        password: '',
        name: '',
        token: {access_token: localStorage.getItem("token") || '', refresh_token: ''},
        avatar: null
    }
    const [{id, email, password, name, token, avatar}, authDispatch] = useReducer(authReducer, initialState)
    
    return (
        <AuthContext.Provider value={{id, email, password, name, token, avatar,authDispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    return useContext(AuthContext)

}

export {AuthProvider, useAuth}