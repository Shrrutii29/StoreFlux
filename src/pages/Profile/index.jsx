import { useEffect } from "react"
import { Navbar } from "../../components/Navbar"
import { getProfile } from "../../api/auth"
import { useLogin } from "../../context/login.context"

export const Profile = () => {
  const { loginDispatch, name, email, password, avatar } = useLogin()
  const token = localStorage.getItem("token")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile(token)

        if (profileData?.id) {
          loginDispatch({
            type: "NAME",
            payload: { value: profileData.name }
          })
          loginDispatch({
            type: "EMAIL",
            payload: { value: profileData.email }
          })
          loginDispatch({
            type: "PASSWORD",
            payload: { value: profileData.password }
          })
          loginDispatch({
            type: "AVATAR",
            payload: { value: profileData.avatar }
          })
        } else if (profileData?.message) {
          console.log("⚠️ " + profileData.message)
        } else {
          console.log("⚠️ Fetching profile data failed.")
        }
      } catch (err) {
        console.log("⚠️ " + err.message)
      } finally {
        console.log("Profile fetch complete")
      }
    }

    fetchProfile()
  }, [token, loginDispatch])

  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-screen px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl w-full text-center">
          <img
            src={avatar}
            alt="profile avatar"
            className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{name}</h1>
          <p className="text-gray-600 text-lg">Email: {email}</p>
          <p className="text-gray-500 ">Password: {password}</p>

          <button className="mt-6 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition">
            Edit Profile
          </button>
        </div>
      </main>
    </>
  )
}
