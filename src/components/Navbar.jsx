import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-50 
        px-5 sm:px-8 lg:px-20 
        py-4 
        flex items-center justify-between 
        backdrop-blur-md bg-black/40">

        {/* LOGO */}
        <div className="font-display text-base sm:text-lg tracking-widest gold-text">
          FIDELIS
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-gray-400">
          <a className="hover:text-[#e7d3a3] transition">Home</a>
          <a className="hover:text-[#e7d3a3] transition">System</a>
          <a className="hover:text-[#e7d3a3] transition">Mission</a>
          <a className="hover:text-[#e7d3a3] transition">Values</a>
          <a className="hover:text-[#e7d3a3] transition">Timeline</a>
        </div>

        {/* DESKTOP CTA */}
        <button className="hidden md:block btn-gold text-xs">
          Join the Mission
        </button>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white z-50"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl 
        flex flex-col items-center justify-center gap-8 text-lg 
        transition-all duration-300
        ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        <a onClick={() => setOpen(false)}>Home</a>
        <a onClick={() => setOpen(false)}>System</a>
        <a onClick={() => setOpen(false)}>Mission</a>
        <a onClick={() => setOpen(false)}>Values</a>
        <a onClick={() => setOpen(false)}>Timeline</a>

        <button className="btn-gold mt-6">
          Join the Mission
        </button>
      </div>
    </>
  );
}