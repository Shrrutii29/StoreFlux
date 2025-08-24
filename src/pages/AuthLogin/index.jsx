import { useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Login } from "../../components/Login";

export const AuthLogin = () => {
  const location = useLocation();
  const message = location.state?.message; 
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md">
          {message && (
            <div className="mb-4 p-3 text-red-700 bg-red-100 border border-red-300 rounded">
              {message}
            </div>
          )}
          <Login />
        </div>
      </main>
    </>
  );
};
