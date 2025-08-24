import { useEffect, useState } from "react"
import { Navbar } from "../../components/Navbar"
import { getProfile, updateProfile } from "../../api/auth"
import { useLogin } from "../../context/login.context"

export const Profile = () => {
  const { loginDispatch, name, email, password, avatar } = useLogin()
  const token = localStorage.getItem("token")

  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: ""
  })

  const [message, setMessage] = useState({ type: "", text: "" })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token)

        if (profileData?.id) {
          loginDispatch({ type: "NAME", payload: { value: profileData.name } })
          loginDispatch({ type: "EMAIL", payload: { value: profileData.email } })
          loginDispatch({ type: "PASSWORD", payload: { value: profileData.password } })
          loginDispatch({ type: "AVATAR", payload: { value: profileData.avatar } })

          setFormData({
            id: profileData.id,
            name: profileData.name,
            email: profileData.email,
            password: profileData.password,
            avatar: profileData.avatar
          })
        }
      } catch (err) {
        setMessage({ type: "error", text: "Failed to fetch profile." })
      }
    }

    fetchProfile()
  }, [token, loginDispatch])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const updated = await updateProfile(formData.id, formData, token)

      if (updated?.id) {
        loginDispatch({ type: "NAME", payload: { value: updated.name } })
        loginDispatch({ type: "EMAIL", payload: { value: updated.email } })
        loginDispatch({ type: "PASSWORD", payload: { value: updated.password } })
        loginDispatch({ type: "AVATAR", payload: { value: updated.avatar } })

        setFormData({
          id: updated.id,
          name: updated.name,
          email: updated.email,
          password: updated.password,
          avatar: updated.avatar
        })

        setIsEditing(false)
        setMessage({ type: "success", text: "✅ Profile updated successfully!" })
        setTimeout(() => setMessage({ type: "", text: "" }), 3000)
      }
    } catch (error) {
      setMessage({ type: "error", text: "❌ Error updating profile. Try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-screen px-4 bg-gray-100">
        <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-2xl w-full text-center relative">
          {/* Gradient header */}
          <div className="absolute top-0 left-0 w-full h-20 rounded-t-2xl bg-gradient-to-r from-pink-400 to-orange-400"></div>
          <h2 className="relative z-10 text-3xl font-bold text-white mb-10">
            My Profile
          </h2>

          {/* ✅ Success/Error Message */}
          {message.text && (
            <div
              className={`flex items-center gap-2 justify-center mb-6 p-3 rounded-lg text-sm font-medium transition-all duration-500 ${
                message.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              <span className="material-symbols-outlined text-lg">
                {message.type === "success" ? "check_circle" : "cancel"}
              </span>
              {message.text}
            </div>
          )}

          {/* Avatar */}
          <img
            src={isEditing ? formData.avatar : avatar}
            alt="profile avatar"
            className="w-28 h-28 rounded-full mx-auto mb-6 border-4 border-white shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          />

          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border p-3 w-full rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-3 w-full rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter email"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border p-3 w-full rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter password"
              />
              <input
                type="text"
                name="avatar"
                value={formData.avatar}
                onChange={handleChange}
                className="border p-3 w-full rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter avatar URL"
              />

              <button
                onClick={handleSave}
                disabled={loading} // ✅ disable while saving
                className={`mt-4 px-6 py-3 rounded-xl shadow-md transition-transform text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 active:scale-95"
                }`}
              >
                {loading ? "Saving changes..." : "Save Changes"}
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              <p className="text-gray-600 text-lg">Email: {email}</p>

              {/* Password with toggle */}
              <div className="flex justify-center items-center gap-2 text-gray-600">
                <p>Password: {showPassword ? password : "********"}</p>
                <button
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-blue-600 transition cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="mt-6 px-6 py-3 bg-green-500 hover:bg-green-600 cursor-pointer active:scale-95 text-white rounded-xl shadow-md transition-transform"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}
