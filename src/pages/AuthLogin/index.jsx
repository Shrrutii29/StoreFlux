import { Login } from "../../components/Login"
import { Navbar } from "../../components/Navbar"

export const AuthLogin = () => {
    return (
        <>
            <Navbar />
            <main>
                <Login />
            </main>
        </>
    )
}