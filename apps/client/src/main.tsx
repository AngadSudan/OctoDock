import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./sw-registration";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import Login from "./pages/Login.tsx";
import Profile from "./pages/Profile.tsx";
import Project from "./pages/Project.tsx";
import Projects from "./pages/Projects.tsx";
import client from "./lib/graphqlClient.ts";
import { ApolloProvider } from "@apollo/client";
import Logs from "./pages/Logs.tsx";
import About from "./pages/About.tsx";

import { Provider } from "react-redux";
import store from "./redux";
import Home from "./pages/Home.tsx";
import PromptBar from "./pages/PromptBar.tsx";
import Deployment from "./pages/Deployment.tsx";
import PrivacyPolicy from "./pages/PrivacyPolicy.tsx";
import CheckOut from "./pages/CheckOut.tsx";
import Loader from "./components/Loader.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<Profile />} />
      <Route path="project/dashboard" element={<Projects />} />
      <Route path="project" element={<PromptBar />} />
      <Route path="project/:id" element={<Project />} />
      <Route path="deployment/:id" element={<Deployment />} />
      <Route path="error/logs" element={<Logs />} />
      <Route path="privacy-policy" element={<PrivacyPolicy />} />
      <Route path="payment-checkout" element={<CheckOut />} />
    </Route>,
  ),
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Loader text={"Welcome"} />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </StrictMode>,
);
