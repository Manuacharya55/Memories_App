import React from "react";
import RegisterForm from "../../Form/RegisterForm";
import { useAuthentication } from "../../Hooks/useAuthentication";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register, user, Processing, error } = useAuthentication();
  const { saveToken } = useAuthContext();
  const navigate = useNavigate();

  const registerAccount = async (user) => {
    const response = await register(user)

    if (response) {

      saveToken(response)
      navigate("/home")
    }
  }
  return (
    <div className="w-full h-screen flex bg-white overflow-hidden flex-row-reverse">
      {/* Image Section - Hidden on mobile, 50% on desktop */}
      <div className="hidden lg:flex w-1/2 relative bg-black">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=1974&auto=format&fit=crop"
          alt="Register Background"
          className="w-full h-full object-cover grayscale opacity-80"
        />
        <div className="absolute bottom-0 left-0 p-16 z-20 text-white">
          <h2 className="text-5xl font-bold mb-6 tracking-tight">Join Memories</h2>
          <p className="text-xl text-zinc-300 max-w-md leading-relaxed">Start capturing and sharing your favorite moments today.</p>
        </div>
      </div>

      {/* Form Section - Full width on mobile, 50% on desktop */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white h-full overflow-y-auto">
        <div className="w-full max-w-md space-y-8 bg-white p-4 sm:p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="mt-2 text-gray-600">Get started with your free account</p>
          </div>

          {error && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <RegisterForm Processing={Processing} submitHandler={registerAccount} />
        </div>
      </div>
    </div>
  );
};

export default Register;
