// /src/pages/Home.jsx

import { useHome } from '../hooks/useHome';
import Navbar from '../components/Navbar';
import AnimeCard from '../components/AnimeCard';
import Loading from '../components/Loading';
import { Flame, Star, Calendar } from 'lucide-react';

// Sub-komponen
const SectionHeader = ({ title, icon: Icon }) => (
    <div className="flex items-center gap-2 mb-6 px-4 md:px-0">
        <div className="bg-cyan-500/10 p-2 rounded-lg">
            <Icon className="text-cyan-500" size={20} />
        </div>
        <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
    </div>
);

const Home = () => {
 
  const { trending, top, upcoming, isLoading, error } = useHome();
 
  if (isLoading) return <div className="bg-slate-950 min-h-screen"><Navbar /><Loading /></div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;

  return (
    <div className="bg-slate-950 min-h-screen pb-20">
      <Navbar />
      
      {/* Hero Banner */}
      {trending.length > 0 && (
          <div className="relative h-[50vh] md:h-[60vh] overflow-hidden mb-12">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
              <img 
                src={trending[0].images.jpg.large_image_url} 
                className="w-full h-full object-cover opacity-60"
                alt="Hero"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute bottom-0 left-0 p-6 md:p-12 z-20 max-w-2xl">
                  <span className="bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">
                    #1 TRENDING NOW
                  </span>
                  <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">
                    {trending[0].title}
                  </h1>
                  <p className="text-slate-300 line-clamp-2 md:text-lg mb-6">
                    {trending[0].synopsis}
                  </p>
              </div>
          </div>
      )}

      {/* Konten Grid */}
      <main className="max-w-7xl mx-auto space-y-16">
          
          <section>
              <SectionHeader title="Sedang Trending" icon={Flame} />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-0">
                  {trending.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
              </div>
          </section>

          <section>
              <SectionHeader title="Paling Top Rated" icon={Star} />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-0">
                  {top.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
              </div>
          </section>

          <section>
              <SectionHeader title="Akan Segera Tayang" icon={Calendar} />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4 md:px-0">
                  {upcoming.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
              </div>
          </section>

      </main>
    </div>
  );
};
export default Home;