
import React from 'react';
import { Game } from '../types';
import { StarIcon, FlameIcon, PlayIcon } from './Icon';

interface GameCardProps {
  game: Game;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite, onClick }) => {
  return (
    <div 
      className="group relative bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-violet-500/50 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
      onClick={() => onClick(game)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {game.isHot && (
            <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 uppercase tracking-wider shadow-lg">
              <FlameIcon className="w-3 h-3" /> Hot
            </span>
          )}
          <span className="bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
            {game.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(game.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors ${
            isFavorite ? 'bg-yellow-500/20 text-yellow-500' : 'bg-black/20 text-white/70 hover:text-white hover:bg-black/40'
          }`}
        >
          <StarIcon fill={isFavorite} className="w-4 h-4" />
        </button>

        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-violet-600 p-4 rounded-full shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <PlayIcon className="w-8 h-8 text-white ml-1" />
          </div>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-heading font-bold text-lg text-zinc-100 leading-tight line-clamp-1">{game.title}</h3>
          {game.rating && (
            <div className="flex items-center text-yellow-500 text-xs font-medium ml-2 shrink-0">
              <StarIcon fill className="w-3 h-3 mr-1" />
              {game.rating}
            </div>
          )}
        </div>
        <p className="text-zinc-500 text-sm line-clamp-2 mt-auto">{game.description}</p>
      </div>
    </div>
  );
};

export default GameCard;
