import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="group relative block bg-slate-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-purple-500 transition-all duration-300">
      <div className="aspect-[2/3] overflow-hidden">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        
        {/* Score Badge */}
        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
            <Star size={12} className="text-yellow-400" fill="currentColor" />
            <span className="text-xs font-bold text-white">{anime.score || 'N/A'}</span>
        </div>
      </div>
      
      {/* Type Anime */}
      <div className="p-3">
        <h3 className="font-bold text-sm text-slate-200 truncate group-hover:text-purple-400 transition-colors">
            {anime.title}
        </h3>
        <p className="text-xs text-slate-500 mt-1">
            {anime.year || '?'} • {anime.type}
        </p>
      </div>
    </Link>
  );
};
export default AnimeCard;