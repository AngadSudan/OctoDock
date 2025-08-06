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
      {/* Cyberpunk background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/95 via-slate-900/90 to-gray-900/95"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500/5 via-orange-500/5 to-transparent"></div>

      {/* Animated circuit lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-red-400/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-orange-400/30 to-transparent"></div>
        <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-400/20 to-transparent"></div>
      </div>

      {/* Main navbar content */}
      <div className="relative backdrop-blur-xl bg-black/60 border-b border-red-500/20 shadow-2xl">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/50 via-orange-400/50 to-transparent"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-4 group relative">
              {/* Glow effect behind logo */}
              <div className="absolute -inset-2 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative">
                <div className="relative">
                  <img
                    src="/octodocklogo.png"
                    alt="OctoDock Logo"
                    className="object-contain w-20 h-20 transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]"
                  />
                  {/* Corner accents for logo */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-l-2 border-t-2 border-red-400/60 rounded-tl"></div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-r-2 border-t-2 border-red-400/60 rounded-tr"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 border-l-2 border-b-2 border-red-400/60 rounded-bl"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 border-r-2 border-b-2 border-red-400/60 rounded-br"></div>
                </div>
              </div>

              <div className="flex flex-col relative">
                <h1 className="text-2xl font-black text-white tracking-widest font-mono relative">
                  OCTODOCK
                  <div className="absolute -top-1 -right-2 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
                </h1>
                <div className="h-px bg-gradient-to-r from-red-400 via-orange-400 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <div className="text-xs text-red-400/70 font-mono tracking-wider mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  SYSTEM_ONLINE
                </div>
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
                      className="relative flex items-center space-x-2 text-gray-300 hover:text-red-400 px-4 py-2 rounded-lg border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 group font-mono"
                    >
                      {/* Background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <IconComponent className="h-4 w-4 group-hover:scale-110 transition-transform duration-300 relative z-10" />
                      <span className="font-medium relative z-10">
                        {link.label}
                      </span>

                      {/* Corner indicators */}
                      <div className="absolute top-0 right-0 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  );
                })}
              </div>

              {/* Authentication Section */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="relative flex items-center space-x-3 bg-gray-900/80 hover:bg-red-900/30 backdrop-blur-md rounded-xl px-4 py-3 border border-red-500/30 hover:border-red-400/60 transition-all duration-300 shadow-xl group"
                  >
                    {/* Background circuit pattern */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-red-400/30 to-transparent"></div>
                      <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-red-400/30 to-transparent"></div>
                    </div>

                    <div className="relative">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg border border-red-400/30">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 shadow-sm animate-pulse"></div>
                    </div>
                    <span className="text-white font-medium text-sm font-mono">
                      {user?.name}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-red-400 transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-red-500/30 py-2 z-50 overflow-hidden">
                      {/* Circuit pattern overlay */}
                      <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-red-400/20 to-transparent"></div>
                        <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-red-400/20 to-transparent"></div>
                      </div>

                      <div className="relative px-4 py-3 border-b border-red-500/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-600 rounded-lg flex items-center justify-center border border-red-400/30">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <p className="text-white font-semibold font-mono">
                              {user?.name}
                            </p>
                            <p className="text-green-400 text-xs font-mono flex items-center">
                              <span className="w-1 h-1 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                              ONLINE
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-2 relative">
                        <button className="relative flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group">
                          <Settings className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                          <span className="font-medium font-mono">
                            SETTINGS
                          </span>
                          <div className="absolute right-2 top-1/2 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="relative flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 group border-t border-red-500/20"
                        >
                          <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="font-medium font-mono">LOGOUT</span>
                          <div className="absolute right-2 top-1/2 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="relative text-gray-300 hover:text-red-400 px-6 py-2 rounded-lg border border-red-500/30 hover:border-red-400/60 hover:bg-red-500/10 transition-all duration-300 font-mono font-medium group"
                  >
                    <span className="relative z-10">LOGIN/REGISTER</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative bg-gray-900/80 backdrop-blur-md text-gray-300 hover:text-red-400 p-3 rounded-xl border border-red-500/30 hover:border-red-400/60 transition-all duration-300 shadow-xl group"
              >
                {/* Circuit pattern */}
                <div className="absolute inset-0 rounded-xl overflow-hidden">
                  <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-red-400/30 to-transparent"></div>
                  <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-red-400/30 to-transparent"></div>
                </div>

                {isMenuOpen ? (
                  <X className="h-5 w-5 relative z-10" />
                ) : (
                  <Menu className="h-5 w-5 relative z-10" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-red-500/20 bg-gray-900/95 backdrop-blur-xl relative">
            {/* Circuit overlay */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-red-400/20 to-transparent"></div>
              <div className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-red-400/20 to-transparent"></div>
            </div>

            <div className="relative px-4 py-6 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="relative flex items-center space-x-3 text-gray-300 hover:text-red-400 px-4 py-3 rounded-xl border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 group font-mono"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span className="font-medium">{link.label}</span>
                      <div className="absolute right-2 top-1/2 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Authentication Section */}
              <div className="pt-4 border-t border-red-500/20">
                {isAuthenticated ? (
                  <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl p-5 border border-red-500/30 shadow-xl overflow-hidden">
                    {/* Circuit pattern */}
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                      <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-red-400/20 to-transparent"></div>
                      <div className="absolute left-0 top-1/3 w-full h-px bg-gradient-to-r from-red-400/20 to-transparent"></div>
                    </div>

                    <div className="relative flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg border border-red-400/30">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-bold text-lg font-mono">
                          {user?.name}
                        </p>
                        <p className="text-green-400 text-sm font-mono flex items-center">
                          <span className="w-1 h-1 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                          ONLINE
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 relative">
                      <button className="flex items-center space-x-3 w-full px-4 py-3 text-gray-300 hover:text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all duration-200 border border-red-500/20 font-mono">
                        <Settings className="h-4 w-4" />
                        <span className="font-medium">SETTINGS</span>
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-4 py-3 text-red-400 hover:text-red-300 bg-red-500/20 hover:bg-red-500/30 rounded-xl transition-all duration-200 border border-red-500/30 font-mono"
                      >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">LOGOUT</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      className="relative block text-center text-gray-300 hover:text-red-400 px-6 py-3 rounded-xl border border-red-500/30 hover:border-red-400/60 hover:bg-red-500/10 transition-all duration-300 font-mono font-medium group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="relative z-10">LOGIN/REGISTER</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom accent with animated glow */}
      <div className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-red-400/60 via-orange-400/60 to-transparent"></div>
        <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-red-400/30 via-orange-400/30 to-transparent blur-sm animate-pulse"></div>
      </div>
    </nav>
  );
}

export default Header;
