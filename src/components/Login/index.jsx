import { useLogin } from "../../context/login.context.jsx"
import { userLogin } from "../../api/auth.js"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const { loginDispatch, email, password } = useLogin()
  const navigate = useNavigate()

  const onFormSubmit = async(e) => {
    e.preventDefault()
    const data = await userLogin(email, password)
    loginDispatch({
        type: 'TOKEN',
        payload: {
            token:data
        }
    })
    if (data.access_token){
        navigate('/')
    }
  }

  const onEmailChange = (e) => {
    loginDispatch({
      type: "EMAIL",
      payload: { value: e.target.value },
    })
  }

  const onPasswordChange = (e) => {
    loginDispatch({
      type: "PASSWORD",
      payload: { value: e.target.value },
    })
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={onFormSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login
        </h2>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-gray-700 font-medium">Email *</label>
          <input
            onChange={onEmailChange}
            type="email"
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-gray-700 font-medium">Password *</label>
          <input
            onChange={onPasswordChange}
            type="password"
            placeholder="Enter your password"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  )
}
