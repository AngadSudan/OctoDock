import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserPlan {
  name: string;
  space: number;
  collaborators: number;
  private_repos: number;
}

export interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: UserPlan;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setAuthState: (state, action: PayloadAction<AuthState>) => {
      console.log("SET AUTH STATE", action.payload);
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      console.log(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setAuthState, logout } = authSlice.actions;
export default authSlice.reducer;
