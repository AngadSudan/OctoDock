import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/redux";
import { logout, setAuthState } from "@/redux/authSlice";
import axios from "axios";
import configuration from "@/conf/configuration";
import { useCallback, useEffect, useState } from "react";
import {
  User,
  LogOut,
  Settings,
  ChevronDown,
  Menu,
  X,
  Home,
  Info,
} from "lucide-react";
import { Link } from "react-router";

function Header() {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const user = useSelector((state: RootState) => state.auth.user);

  const authenticateUser = async () => {
    try {
      const response = await axios.get(
        configuration.backend_url + "/is-authenticated",
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.user._json);
      if (response.data.authenticated) {
        console.log("entered dispatch");
        dispatch(
          setAuthState({
            isAuthenticated: true,
            user: response.data.user._json,
          })
        );
        console.log("finished dispatch");
      } else {
        console.log("error in dispatch");
        dispatch(setAuthState({ isAuthenticated: false, user: null }));
      }
    } catch (error) {
      console.error("Authentication check failed", error);
      dispatch(setAuthState({ isAuthenticated: false, user: null }));
    }
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setIsProfileOpen(false);
  }, [dispatch]);

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
  ];

  return (
    <nav className="relative">
      {/* Premium dark background */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/3 via-red-500/3 to-transparent"></div>

      {/* Main navbar content */}
      <div className="relative backdrop-blur-xl bg-black/80 border-b border-gray-800/50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div>
                  <img
                    src="/octodocklogo.png"
                    alt="OctoDock Logo"
                    className="object-contain w-20 h-20 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-white tracking-tight">
                  OCTODOCK
                </h1>
                <div className="h-0.5 bg-gradient-to-r from-orange-400 via-red-500 to-purple-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Links */}
              <div className="flex items-center space-x-6">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-2 text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-gray-800/30 transition-all duration-300 group"
                    >
                      <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 bg-gray-900/60 hover:bg-gray-800/60 backdrop-blur-md rounded-2xl px-4 py-3 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-xl group"
                  >
                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-black shadow-sm"></div>
                    </div>
                    <span className="text-white font-medium text-sm">
                      {user?.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-700/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold">
                              {user?.name}
                            </p>
                            <p className="text-gray-400 text-sm">Online</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/30 transition-all duration-200 group">
                          <Settings className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                          <span className="font-medium">Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group"
                        >
                          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white px-6 py-2 rounded-xl hover:bg-gray-800/30 transition-all duration-300 font-medium"
                  >
                    Login/Register
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-gray-900/50 backdrop-blur-md text-gray-300 hover:text-white p-3 rounded-2xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 shadow-xl"
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800/50 bg-gray-900/80 backdrop-blur-xl">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center space-x-3 text-gray-300 hover:text-white px-4 py-3 rounded-xl hover:bg-gray-800/30 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Authentication Section */}
              <div className="pt-4 border-t border-gray-700/50">
                {isAuthenticated ? (
                  <div className="bg-gray-900/60 backdrop-blur-md rounded-2xl p-5 border border-gray-700/50 shadow-xl">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg">
                          {user?.name}
                        </p>
                        <p className="text-gray-400 text-sm">Online</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-white bg-gray-800/30 rounded-xl transition-all duration-200">
                        <Settings className="h-4 w-4" />
                        <span className="font-medium">Settings</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all duration-200 border border-red-500/20"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className="block text-center text-gray-300 hover:text-white px-6 py-3 rounded-xl hover:bg-gray-800/30 transition-all duration-300 font-medium border border-gray-700/50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Premium bottom accent */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/50 via-red-500/50 via-purple-500/50 to-transparent"></div>
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 via-red-500/20 via-purple-500/20 to-transparent blur-sm"></div>
      </div>
    </nav>
  );
}

export default Header;
