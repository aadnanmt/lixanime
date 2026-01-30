import { Link } from 'react-router-dom';
import { Search, Tv } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-purple-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
                <Tv size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Lixanime
            </span>
        </Link>

        {/* Search Input (Dummy dulu) */}
        <div className="relative hidden md:block">
            <input
                type="text"
                placeholder="Cari anime..."
                className="bg-slate-900/50 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 w-64 transition-all"
            />
            <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;