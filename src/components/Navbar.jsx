export default function Navbar() {
  return (
    <div className="fixed top-0 w-full z-50 px-24 py-6 flex justify-between items-center text-sm backdrop-blur-md bg-black/30">

      {/* LOGO */}
      <div className="font-display text-lg tracking-widest gold-text">
        FIDELIS
      </div>

      {/* LINKS */}
      <div className="hidden md:flex gap-10 text-gray-400">
        <a className="hover:text-[#e7d3a3] transition">Home</a>
        <a className="hover:text-[#e7d3a3] transition">System</a>
        <a className="hover:text-[#e7d3a3] transition">Mission</a>
        <a className="hover:text-[#e7d3a3] transition">Values</a>
        <a className="hover:text-[#e7d3a3] transition">Timeline</a>
      </div>

      {/* CTA */}
      <button className="btn-gold text-xs">
        Join the Mission
      </button>
    </div>
  );
}