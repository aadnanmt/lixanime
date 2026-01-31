// /src/pages/Detail.jsx

import { useParams, Link } from 'react-router-dom';
import { useDetail } from '../hooks/useDetail';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';
import { ArrowLeft, Star, Calendar, Users } from 'lucide-react';

const Detail = () => {
  const { id } = useParams();
  const { anime, characters, isLoading, error } = useDetail(id);

  if (isLoading) return <div className="bg-slate-950 min-h-screen"><Navbar /><Loading /></div>;
  if (error || !anime) return <div className="text-center text-red-500 py-20">Anime tidak ditemukan</div>;

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
        <Navbar />
        
        {/* Tombol kembali */}
        <div className="max-w-7xl mx-auto px-4 py-6">
            <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors border-none">
                <ArrowLeft size={20} /> Kembali ke Home
            </Link>
        </div>

        {/* Konten */}
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-[300px_1fr] gap-8">
                
                {/* Kiri | Poster */}
                <div className="space-y-4">
                    <img 
                        src={anime.images.jpg.large_image_url} 
                        className="w-full rounded-xl shadow-2xl shadow-cyan-500/10"
                        alt={anime.title}
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-900 p-3 rounded-lg text-center">
                            <div className="text-yellow-400 font-bold text-xl flex items-center justify-center gap-1">
                                <Star size={16} fill="currentColor"/> {anime.score}
                            </div>
                            <div className="text-xs text-slate-500">Score</div>
                        </div>
                        <div className="bg-slate-900 p-3 rounded-lg text-center">
                            <div className="text-cyan-400 font-bold text-xl">#{anime.rank}</div>
                            <div className="text-xs text-slate-500">Ranking</div>
                        </div>
                    </div>
                </div>

                {/* Kanan | Info */}
                <div>
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{anime.title}</h1>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                        {anime.genres.map(g => (
                            <span key={g.mal_id} className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium border border-cyan-500/20">
                                {g.name}
                            </span>
                        ))}
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 mb-8">
                        <h3 className="text-lg font-bold mb-3">Sinopsis</h3>
                        <p className="text-slate-300 leading-relaxed text-lg">
                            {anime.synopsis}
                        </p>
                    </div>

                    {/* Karakter */}
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Users className="text-cyan-500" /> Karakter
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
                        {characters.slice(0, 10).map((char, i) => (
                            <div key={i} className="bg-slate-900 rounded-lg overflow-hidden flex items-center gap-3 pr-2">
                                <img 
                                    src={char.character.images.jpg.image_url} 
                                    className="w-12 h-16 object-cover"
                                    alt={char.character.name}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-bold truncate">{char.character.name}</p>
                                    <p className="text-xs text-slate-500 truncate">{char.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
export default Detail;