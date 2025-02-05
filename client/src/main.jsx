import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home.jsx";
import Cards from "./components/Cards.jsx";
// import LatestNews from "./pages/LatestNews.jsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     // <Route path="/" element={<Layout />}>
//       <Route path="/" element={<Home />} />
//       <Route path="/source" element={<Cards />} />
//       <Route path="/latest-news" element={<LatestNews />} />
//     // </Route>
//   )
// );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// );

import LatestNews from "./pages/LatestNews.jsx";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/source" element={<Cards />} />
        <Route path="/latest-news" element={<LatestNews />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
