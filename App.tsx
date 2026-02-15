
import React, { useState, useMemo, useEffect } from 'react';
import { GAMES_DATA } from './data/games';
import { Game, Category } from './types';
import GameCard from './components/GameCard';
import GamePlayer from './components/GamePlayer';
import { SearchIcon, HomeIcon, FlameIcon, StarIcon } from './components/Icon';

const CATEGORIES: Category[] = ['All', 'Action', 'Arcade', 'Puzzle', 'Sports', 'Driving', 'Strategy'];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('pulse_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id) 
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('pulse_favorites', JSON.stringify(newFavorites));
  };

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const favoriteGames = useMemo(() => {
    return GAMES_DATA.filter(game => favorites.includes(game.id));
  }, [favorites]);

  const hotGames = useMemo(() => {
    return GAMES_DATA.filter(game => game.isHot);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-900/20">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                PULSE<span className="text-violet-500">ARCADE</span>
              </h1>
            </div>
          </div>

          <div className="relative w-full md:max-w-md group">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
            <input 
              type="text"
              placeholder="Search unblocked games..."
              className="w-full bg-zinc-900 border border-zinc-800 focus:border-violet-600 focus:ring-1 focus:ring-violet-600 rounded-xl pl-12 pr-4 py-2.5 outline-none transition-all placeholder:text-zinc-600 text-zinc-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-zinc-400">
            <a href="#" className="hover:text-white transition-colors">Discord</a>
            <a href="#" className="hover:text-white transition-colors">Request a Game</a>
            <a href="#" className="hover:text-white transition-colors">Help</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-8 py-8">
        {/* Categories Bar */}
        <div className="flex overflow-x-auto gap-2 mb-8 pb-2 no-scrollbar">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-lg font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-900/20 translate-y-[-1px]' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured/Hot section (Only if no search) */}
        {!searchQuery && activeCategory === 'All' && hotGames.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-orange-500/10 p-2 rounded-lg text-orange-500">
                <FlameIcon className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold font-heading">Hot This Week</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={setSelectedGame}
                />
              ))}
            </div>
          </section>
        )}

        {/* Favorites Section (Only if no search/all and has favs) */}
        {!searchQuery && activeCategory === 'All' && favorites.length > 0 && (
          <section className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-500">
                <StarIcon fill className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold font-heading">Your Favorites</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  isFavorite={true}
                  onToggleFavorite={toggleFavorite}
                  onClick={setSelectedGame}
                />
              ))}
            </div>
          </section>
        )}

        {/* All Games Grid */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="bg-violet-500/10 p-2 rounded-lg text-violet-500">
                <HomeIcon className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold font-heading">
                {searchQuery ? `Search Results for "${searchQuery}"` : (activeCategory === 'All' ? 'All Games' : `${activeCategory} Games`)}
              </h2>
            </div>
            <span className="text-zinc-500 font-medium text-sm">
              {filteredGames.length} games found
            </span>
          </div>

          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredGames.map(game => (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  isFavorite={favorites.includes(game.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={setSelectedGame}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-6">
                <SearchIcon className="w-10 h-10 text-zinc-700" />
              </div>
              <h3 className="text-xl font-bold mb-2">No games found</h3>
              <p className="text-zinc-500 max-w-xs">We couldn't find any games matching your current search or category filter.</p>
              <button 
                onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
                className="mt-6 text-violet-500 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 px-4 sm:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 items-center">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-violet-600 rounded flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-heading font-black tracking-tight text-white">PULSEARCADE</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm text-center md:text-left">
              The premier destination for high-quality, unblocked web games. Experience lightning-fast loading and a clean, ad-free focus.
            </p>
          </div>
          
          <div className="flex gap-8 text-zinc-500 text-sm font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">DMCA</a>
          </div>

          <div className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} PulseArcade. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Game Player Overlay */}
      {selectedGame && (
        <GamePlayer 
          game={selectedGame} 
          onClose={() => setSelectedGame(null)} 
        />
      )}
    </div>
  );
};

export default App;
