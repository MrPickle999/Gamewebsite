
import React from 'react';
import { Game } from '../types';
import { FullscreenIcon } from './Icon';

interface GamePlayerProps {
  game: Game;
  onClose: () => void;
}

const GamePlayer: React.FC<GamePlayerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const toggleFullscreen = () => {
    if (!iframeRef.current) return;
    
    if (!isFullscreen) {
      if (iframeRef.current.requestFullscreen) {
        iframeRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  React.useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center">
      {/* Navbar in player */}
      <div className="w-full h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-zinc-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </div>
            <span className="font-semibold hidden sm:inline">Back to Hub</span>
          </button>
          <div className="h-6 w-px bg-zinc-800 hidden sm:block" />
          <h2 className="font-heading font-bold text-xl text-zinc-100 hidden md:block">{game.title}</h2>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleFullscreen}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 p-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <FullscreenIcon className="w-5 h-5" />
            <span className="text-sm font-medium hidden sm:inline">Fullscreen</span>
          </button>
          <button 
            onClick={onClose}
            className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg font-bold transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Main Iframe Area */}
      <div className="relative w-full flex-grow bg-zinc-950 flex items-center justify-center p-4">
        <div className="w-full h-full max-w-6xl mx-auto shadow-2xl shadow-violet-500/10 rounded-lg overflow-hidden border border-zinc-800">
          <iframe 
            ref={iframeRef}
            src={game.iframeUrl} 
            className="w-full h-full"
            frameBorder="0"
            allow="fullscreen; autoplay; encrypted-media"
            sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-scripts allow-same-origin"
          />
        </div>
      </div>
      
      {/* Floating Info (optional/desktop) */}
      <div className="hidden lg:block fixed bottom-8 left-8 w-64 bg-zinc-900/90 backdrop-blur-lg p-4 rounded-xl border border-zinc-800 shadow-xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1">Now Playing</p>
        <h4 className="font-bold text-lg mb-2">{game.title}</h4>
        <p className="text-sm text-zinc-500">{game.description}</p>
      </div>
    </div>
  );
};

export default GamePlayer;
