import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Source from "./pages/Source.jsx";
import LatestNews from "./pages/LatestNews.jsx";
import Login from './pages/Login';
import Register from './pages/Register';
import Landing from "./pages/Landing.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route path="" element={<Landing />} />
      <Route path="source" element={<Source />} />
      <Route path="latest-news" element={<LatestNews />} />
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
