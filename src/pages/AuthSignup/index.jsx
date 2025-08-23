import { Navbar } from "../../components/Navbar";
import { Signup } from "../../components/Signup";

export const AuthSignup = () => {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          <Signup />
        </div>
      </main>
    </>
  );
};
