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
import About from "./pages/About.tsx";

import { Provider } from "react-redux";
import store from "./redux";
import Home from "./pages/Home.tsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="" element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="about" element={<About />} />
      <Route path="profile" element={<Profile />} loader={() => {}} />
      <Route
        path="project/dashboard"
        element={<Projects />}
        loader={() => {}}
      />
      <Route path="project/:id" element={<Project />} loader={() => {}} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  </StrictMode>
);
