import { BrowserRouter, Routes, Route } from "react-router-dom";

import IndexPage from "../pages/IndexPage";
import Favorites from "../pages/Favorites";
import Layout from "../layouts/Layout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<IndexPage />} index />
          <Route path="/favoritos" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
