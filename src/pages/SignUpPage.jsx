import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { MessageCircleIcon, LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";


function SignUpPage() {
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 px-4 sm:px-6 py-6">
      <div className="relative w-full max-w-6xl flex flex-col md:flex-row rounded-3xl overflow-hidden border border-slate-700/40 shadow-2xl bg-slate-900/80 backdrop-blur-md">
        
        {/* LEFT FORM SECTION */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-10 bg-slate-950/60 border-b md:border-b-0 md:border-r border-slate-800/40">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md"
          >
            {/* HEADER */}
            <div className="text-center mb-8">
              <MessageCircleIcon className="w-10 sm:w-12 h-10 sm:h-12 mx-auto text-cyan-400 mb-4" />
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                Create Account ✨
              </h2>
              <p className="text-slate-400 text-sm sm:text-base">
                Sign up for a new account
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* FULL NAME */}
              <div>
                <label className="block text-slate-300 text-sm mb-1 sm:mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full bg-slate-800/60 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 placeholder-slate-500 outline-none transition-all text-sm sm:text-base"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              {/* EMAIL INPUT */}
              <div>
                <label className="block text-slate-300 text-sm mb-1 sm:mb-2">Email</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-slate-800/60 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 placeholder-slate-500 outline-none transition-all text-sm sm:text-base"
                    placeholder="johndoe@gmail.com"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD INPUT */}
              <div>
                <label className="block text-slate-300 text-sm mb-1 sm:mb-2">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-2.5 w-5 h-5 text-slate-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full bg-slate-800/60 border border-slate-700 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-200 rounded-xl py-2.5 sm:py-3 pl-10 pr-4 placeholder-slate-500 outline-none transition-all text-sm sm:text-base"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2.5 sm:py-3 rounded-xl transition-all shadow-md hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                type="submit"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <LoaderIcon className="animate-spin w-5 h-5" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* LOGIN LINK */}
            <div className="mt-6 text-center text-sm sm:text-base">
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition">
                Already have an account? Login
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT IMAGE + INFO SECTION */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 items-center justify-center p-6 sm:p-10 relative overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <img
              src="/signup.png"
              alt="People chatting illustration"
              className="w-3/4 max-w-md mx-auto object-contain drop-shadow-2xl"
            />
            <div className="mt-6 text-center px-4">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                Start Your Journey Today 🚀
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-xs mx-auto">
                Build connections and chat instantly with others.
              </p>

              <div className="mt-5 flex justify-center gap-2 sm:gap-3 flex-wrap">
                <span className="px-3 py-1 text-xs sm:text-sm font-medium text-cyan-300 bg-slate-800/50 rounded-full border border-slate-700">
                  Free
                </span>
                <span className="px-3 py-1 text-xs sm:text-sm font-medium text-purple-300 bg-slate-800/50 rounded-full border border-slate-700">
                  Easy Setup
                </span>
                <span className="px-3 py-1 text-xs sm:text-sm font-medium text-pink-300 bg-slate-800/50 rounded-full border border-slate-700">
                  Private
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
