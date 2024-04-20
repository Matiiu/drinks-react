import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useAppStore } from "../stores/useAppStore";

import DrinkForm from "./DrinkForm";
import LinksDisplay from './LinksDisplay';
export default function Header() {
  const { pathname } = useLocation();
  const isHome = useMemo(() => pathname === "/", [pathname]);

  const { fetchCateogries } = useAppStore();

  useEffect(() => {
    fetchCateogries();
  }, []);

  return (
    <header className={isHome ? "bg-header" : "bg-slate-800"}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <figure>
            <img className="w-32" src="/logo.svg" alt="logo" />
          </figure>

          <nav className="flex gap-4">
            <LinksDisplay link="/" name="Inicio" />
            <LinksDisplay link="/favoritos" name="Favoritos" />
          </nav>
        </div>
        {isHome && <DrinkForm />}
      </div>
    </header>
  );
}
