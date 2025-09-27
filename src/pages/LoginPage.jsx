import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/autth/authSlice"; 

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

   useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
       await new Promise((resolve) => setTimeout(resolve, 800));
      if (email === "admin@example.com" && password === "password") {
        const userData = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        };
        dispatch(login(userData));
        navigate("/dashboard");
      } else {
        setError("Invalid credentials. Try admin@example.com / password");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center  px-4 py-12 sm:px-6 lg:px-8 relative z-1000">
        <div className="w-full max-w-md space-y-5 rounded-lg bg-[#34313132] p-10 shadow-lg hover:bg-gray-950 transition duration-800 ease-in-out ">
          <div className="text-center w-auto ">
            <h1 className="text-[min(7vw,50px)] font-extrabold  text-white sm:text-4xl">
              <span className="text-gray-500"> Dash-</span>Board Login
            </h1>
            <p className="mt-2 text-sm text-[min(2vw,15px)]  text-gray-300">
              Sign in to your account to access the dashboard
            </p>
          </div>
          <div className="mt-6 bg-white p-6 shadow rounded-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 text-red-700">
                  <p>{error}</p>
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1  block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-800 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </div>
              <div className="text-sm text-[min(2vw,10px)] text-center  ">
                <p className="text-gray-500 flex items-center justify-center">
                  To try logging In ,Use{"  "}
                  <span className="font-medium text-indigo-600 disabled:opacity-100">
                    : admin@example.com | password
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
