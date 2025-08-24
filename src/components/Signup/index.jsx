import { useLogin } from "../../context/login.context.jsx"
import { userSignup, checkEmailAvailability } from "../../api/auth.js"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export const Signup = () => {
  const { loginDispatch, name, email, password } = useLogin()
  const navigate = useNavigate()

  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  // check if email is available
  const onEmailBlur = async () => {
    if (!email) return
    setStatus("Checking email...")
    try {
      const res = await checkEmailAvailability(email)
      if (!res.isAvailable) {
        setStatus("Email already registered")
      } else {
        setStatus("Email available")
      }
    } catch {
      setStatus("⚠️ Could not verify email")
    }
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus("")
    try {
      const data = await userSignup(name, email, password);
      if (data?.id) {
        setStatus("🎉 Registration successful! Redirecting...");
        setTimeout(() => navigate("/auth/login"), 1500);
      } else if (data?.error) {
        setStatus("⚠️ Registration failed: " + data.error);
      } else {
        setStatus("⚠️ Registration failed. (Fake Store API limitation)");
      }
    } catch (err) {
      setStatus("⚠️ " + err.message)
    } finally {
      setLoading(false)
    }
  }

  const onNameChange = (e) =>
    loginDispatch({
      type: "NAME",
      payload: { value: e.target.value }
    })

  const onEmailChange = (e) =>
    loginDispatch({
      type: "EMAIL",
      payload: { value: e.target.value }
    })

  const onPasswordChange = (e) =>
    loginDispatch({
      type: "PASSWORD",
      payload: { value: e.target.value }
    })

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6">
      <form
        onSubmit={onFormSubmit}
        className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>

        {/* Name */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-gray-700 font-medium text-sm sm:text-base">Name *</label>
          <input
            onChange={onNameChange}
            type="text"
            placeholder="Enter your full name"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-gray-700 font-medium text-sm sm:text-base">Email *</label>
          <input
            onChange={onEmailChange}
            onBlur={onEmailBlur}
            type="email"
            placeholder="Enter your email"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          {status && (
            <small className="text-sm text-gray-600">{status}</small>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 mb-4">
          <label className="text-gray-700 font-medium text-sm sm:text-base">Password *</label>
          <input
            onChange={onPasswordChange}
            type="password"
            placeholder="Enter your password"
            required
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 cursor-pointer"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </span>
        </p>
      </form>
    </div>

  )
}
