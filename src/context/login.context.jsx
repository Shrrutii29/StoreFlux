import { createContext, useContext, useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";

const LoginContext = createContext()

const LoginProvider = ({children}) => {

    const initialState = {
        id: null,
        email: '',
        password: '',
        name: '',
        token: '',
        loading: false
    }
    const [{id, email, password, name, token, loading}, loginDispatch] = useReducer(loginReducer, initialState)
    
    return (
        <LoginContext.Provider value={{id, email, password, name, token , loading,loginDispatch}}>
            {children}
        </LoginContext.Provider>
    )
}

const useLogin = () => {
    return useContext(LoginContext)

}

export {LoginProvider, useLogin}