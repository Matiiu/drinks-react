import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layouts/Layout";

const IndexPage = lazy(() => import("../pages/IndexPage"));
const Favorites = lazy(() => import("../pages/Favorites"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback="Cargando...">
                <IndexPage />
              </Suspense>
            }
            index
          />
          <Route
            path="/favoritos"
            element={
              <Suspense fallback="Cargando...">
                <Favorites />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
