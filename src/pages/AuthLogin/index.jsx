import { Login } from "../../components/Login";
import { Navbar } from "../../components/Navbar";

export const AuthLogin = () => {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md">
          <Login />
        </div>
      </main>
    </>
  );
};
