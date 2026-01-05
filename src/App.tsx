import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, ArrowLeft, Flame, Zap, Play, Check, Cookie, Maximize } from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Racing' | 'Puzzle' | 'Sports' | 'Simulation' | 'Adventure' | 'Arcade' | 'Rhythm' | 'Platformer' | 'Classic';
  image: string;
  url: string;
  description: string;
  richContent?: {
    gameplay: string;
    strategies: string;
    whyPopular: string;
  };
  rating: number;
  plays: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// --- DATA ---
const GAMES: Game[] = [
  {
    id: 'subway-surfers',
    title: 'Subway Surfers',
    category: 'Action',
    image: 'https://images.crazygames.com/games/subway-surfers-new-york/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/subway-surfers-new-york',
    description: 'Dash as fast as you can through the subway and dodge the oncoming trains.',
    rating: 4.9,
    plays: '52.1M',
    richContent: {
      gameplay: "Subway Surfers is the quintessential endless runner. Players take on the role of Jake, Tricky, or Fresh, graffiti artists who must escape from the grumpy Inspector and his dog.",
      strategies: "To master Subway Surfers in 2025, focus on staying on top of the trains. Always prioritize the Jetpack power-up.",
      whyPopular: "Non-violent visual style and responsive controls make it a school staple for coordination training."
    }
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    category: 'Rhythm',
    image: 'https://images.crazygames.com/games/geometry-dash/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/geometry-dash',
    description: 'Jump and fly your way through danger in this rhythm-based action platformer.',
    rating: 4.8,
    plays: '12.5M',
    richContent: {
      gameplay: "Rhythm-based action platformer testing patience and timing.",
      strategies: "Use 'Practice Mode' to place checkpoints before difficult sections.",
      whyPopular: "Fosters resilience and a 'growth mindset' through rapid restarts."
    }
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Racing',
    image: 'https://images.crazygames.com/games/moto-x3m/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/moto-x3m',
    description: 'A time-trial bike racing game with challenging obstacles and stunts.',
    rating: 4.7,
    plays: '85.4M',
    richContent: {
      gameplay: "Navigate complex levels with physics-based motocross puzzles.",
      strategies: "Lean back when landing to maintain momentum.",
      whyPopular: "Teaches gravity and trajectory in an engaging way."
    }
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    image: 'https://images.crazygames.com/games/slope/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/slope',
    description: 'Drive a ball in the 3D running game in slope city. Easy to start, hard to master.',
    rating: 4.4,
    plays: '105M',
    richContent: {
      gameplay: "Control a ball down an endless neon cityscape at high speed.",
      strategies: "Keep eyes on the horizon, not the ball.",
      whyPopular: "Induces a flow state, perfect for clearing the mind."
    }
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    image: 'https://images.crazygames.com/games/basket-random/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/basket-random',
    description: 'Score a basket using only one key with variations from different fields and players.',
    rating: 4.5,
    plays: '15.8M',
    richContent: {
      gameplay: "Wacky basketball with ragdoll physics and one-button controls.",
      strategies: "Wait for the player's arm to reach the peak height before jumping.",
      whyPopular: "Hilarious unpredictability makes for high replayability."
    }
  }
];

// --- AD COMPONENTS ---

const AdBanner: React.FC<{ slotId?: string; className?: string }> = ({ slotId = "default-slot", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const location = useLocation();

  useEffect(() => {
    pushed.current = false;
    let timer: any;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !pushed.current) {
        // Use requestAnimationFrame to ensure the browser has performed layout
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          
          // CRITICAL FIX: Only push if the container has actual width to avoid "availableWidth=0" error
          const width = containerRef.current.offsetWidth;
          if (width > 0) {
            timer = setTimeout(() => {
              try {
                if (window.adsbygoogle && !pushed.current) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  pushed.current = true;
                  observer.disconnect();
                }
              } catch (e) {
                console.warn("AdSense push safely deferred");
              }
            }, 500); // 500ms delay to ensure container is fully stable
          }
        });
      }
    }, { threshold: 0.1 });

    if (containerRef.current) observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [location.pathname, slotId]);

  return (
    <div className={`ad-wrapper w-full flex justify-center ${className}`}>
      {/* min-width and min-height added to prevent availableWidth=0 issues */}
      <div 
        ref={containerRef} 
        className="bg-gray-900/50 rounded-lg flex flex-col items-center justify-center min-h-[100px] min-w-[300px] w-full relative border border-gray-800/50"
      >
        <div className="text-[9px] text-gray-600 uppercase tracking-widest mb-1 pointer-events-none select-none">Advertisement</div>
        <ins className="adsbygoogle"
             key={`ad-unit-${location.pathname}-${slotId}`}
             style={{ display: 'block', width: '100%', minHeight: '90px' }}
             data-ad-client="ca-pub-9774042341049510"
             data-ad-slot={slotId}
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
      </div>
    </div>
  );
};

// --- COMPONENTS ---

const Header: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({ searchTerm, setSearchTerm }) => (
  <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 py-3 shadow-lg backdrop-blur-md">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform shadow-indigo-500/20 shadow-lg">
          <Gamepad2 className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Unblocked Games</h1>
          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.2em] leading-none">No Download 2025</p>
        </div>
      </Link>
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search unblocked games..." 
          className="w-full bg-gray-900 border border-gray-700 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  </header>
);

const GamePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'f') toggleFullscreen();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [id]);

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  if (!game) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 rounded-lg text-sm font-bold text-gray-300 mb-6 hover:bg-gray-700 transition-all border border-gray-700">
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          
          {/* Ad Slot Above Game Area */}
          <div className="ad-top text-center mb-6">
            <AdBanner slotId="game-top-slot" />
          </div>

          {/* Mobile Adaptation Tip (Purple) */}
          <div className="text-center text-white bg-purple-800 p-4 rounded-lg mb-6 max-w-md mx-auto shadow-lg border border-purple-600 font-bold">
            Tip: Rotate to landscape for better mobile experience! Perfect on phone or Chromebook.
          </div>

          {/* Optimized Centered Fullscreen Button (Green) */}
          <button 
            onClick={toggleFullscreen} 
            className="block mx-auto bg-green-600 hover:bg-green-700 text-white font-black py-4 px-8 rounded-xl text-xl mb-6 shadow-[0_10px_20px_-5px_rgba(22,163,74,0.4)] transition-all active:scale-95 transform hover:scale-105 flex items-center justify-center gap-3 uppercase tracking-tight"
          >
            <Maximize className="w-6 h-6" />
            Play Full Screen (Press F - Ultimate Experience!)
          </button>
          
          {/* Fullscreen Tip Text (Blue) */}
          <div className="text-center text-white bg-blue-800 p-4 rounded-lg mb-6 max-w-lg mx-auto shadow-md border border-blue-600 font-bold">
            Press F for fullscreen - No lag, full immersion on any device!
          </div>

          {/* Loading Hint */}
          <div className="text-center text-gray-500 mb-4 animate-pulse text-xs font-black uppercase tracking-[0.3em]">
            Loading game... (Zero lag on 2025 networks)
          </div>

          {/* Game Frame Container */}
          <div className="relative bg-black rounded-3xl overflow-hidden aspect-[16/9] ring-8 ring-gray-900 shadow-2xl transition-all">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-10">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-indigo-400 text-[10px] font-black tracking-widest uppercase">Initializing cloud sync...</p>
              </div>
            )}
            <iframe
              src={game.url}
              title={game.title}
              className="w-full h-full border-0"
              allowFullScreen
              allow="autoplay; gamepad; gyroscope; accelerometer"
              onLoad={() => setIsLoading(false)}
            />
          </div>

          {/* Task: AD BOTTOM (Requested with specific class) */}
          <div className="ad-bottom mt-8 text-center mb-10">
            <AdBanner slotId="game-bottom-custom-slot" />
          </div>

          {/* Rich Content & Strategy Section */}
          <div className="bg-gray-900 rounded-[2rem] p-8 border border-gray-800 shadow-xl mt-8">
            <h1 className="text-3xl font-black text-white mb-6 border-b border-gray-800 pb-4 tracking-tighter uppercase italic">
              {game.title} <span className="text-indigo-500 italic">Unblocked 2025</span>
            </h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <h2 className="text-xl text-white font-black mb-3 uppercase tracking-tight">Gameplay Overview</h2>
              <p className="mb-8 leading-relaxed text-lg font-medium">{game.richContent?.gameplay}</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-850/50 p-6 rounded-2xl border border-gray-700/50 hover:border-indigo-500/30 transition-colors shadow-inner">
                  <h3 className="text-indigo-400 font-black mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Flame className="w-5 h-5" /> Pro Strategies
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent?.strategies}</p>
                </div>
                <div className="bg-gray-850/50 p-6 rounded-2xl border border-gray-700/50 hover:border-indigo-500/30 transition-colors shadow-inner">
                  <h3 className="text-indigo-400 font-black mb-3 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Check className="w-5 h-5" /> Why It's Popular
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent?.whyPopular}</p>
                </div>
              </div>
            </div>
          </div>

          {/* SEO & Interlinking Grid */}
          <div className="mt-12 p-10 bg-gray-950 rounded-[3rem] border border-gray-800 border-dashed">
            <h3 className="text-white font-black mb-8 text-center uppercase tracking-[0.4em] text-[10px] opacity-60">Global Unblocked Links 2025</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px] font-black uppercase tracking-tighter">
              <a href="https://snakegame.cfd" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">Snake Unblocked</a>
              <a href="https://slope2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">Slope Game 2025</a>
              <a href="https://retrobowl2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">Retro Bowl Online</a>
              <a href="https://1v1lol2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">1v1.LOL Mobile</a>
              <a href="https://unblocked2025.sbs" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">Unblocked Games SBS</a>
              <a href="https://motox3m2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">Moto X3M Extra</a>
              <a href="https://surfers2025.site" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">Subway Surfers Portal</a>
              <a href="https://paperio2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500 shadow-sm">Paper.io Unblocked</a>
            </div>
          </div>
        </div>

        {/* Sidebar Recommended Section */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#1f2937]/50 border border-gray-700/50 rounded-2xl p-4 shadow-xl text-center">
            <AdBanner slotId="sidebar-custom-slot" />
          </div>
          <div className="bg-gray-900 rounded-[2rem] p-6 border border-gray-800 sticky top-24 shadow-2xl">
            <h3 className="text-white font-black mb-6 flex items-center gap-2 border-b border-gray-800 pb-4 text-[10px] uppercase tracking-[0.3em]">
              <Zap className="w-4 h-4 text-yellow-400" /> TOP GAMES
            </h3>
            <div className="space-y-6">
              {GAMES.filter(g => g.id !== id).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-4 group">
                  <div className="w-20 h-14 overflow-hidden rounded-xl shrink-0 border border-gray-800 group-hover:border-indigo-500 transition-all shadow-md">
                    <img src={sg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-xs font-black line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase tracking-tight">{sg.title}</h4>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-tighter mt-1 opacity-60">{sg.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="block group">
    <div className="bg-gray-900 rounded-[1.5rem] overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.5)]">
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-indigo-600 rounded-full p-5 transform scale-50 group-hover:scale-100 transition-transform duration-300 shadow-indigo-500/50 shadow-2xl">
            <Play className="text-white w-8 h-8 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-black text-sm truncate group-hover:text-indigo-400 transition-colors uppercase tracking-tighter">{game.title}</h3>
          <span className="bg-indigo-600/20 text-indigo-400 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest leading-none">{game.category}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500 font-black uppercase">
          <span className="flex items-center gap-1 text-yellow-500"><Flame className="w-3 h-3" /> {game.rating}</span>
          <span>{game.plays} Plays</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-16 text-center">
        <h2 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
          UNBLOCKED <span className="text-indigo-500">2025</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg font-bold tracking-tight opacity-80 uppercase leading-tight">
          High-performance browser arcade. No downloads, zero lag, fully optimized for Chromebooks and global networks.
        </p>
      </div>
      <AdBanner slotId="home-top-banner" className="mb-12" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
      </div>
      <AdBanner slotId="home-bottom-banner" className="mt-24" />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-20 mt-32">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-12 mb-12 text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">
        <Link to="/about" className="hover:text-indigo-400 transition-colors">Team</Link>
        <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
        <Link to="/contact" className="hover:text-indigo-400 transition-colors">Support</Link>
      </div>
      <div className="max-w-md mx-auto mb-12">
         <p className="text-[10px] text-gray-700 uppercase tracking-widest leading-relaxed font-bold italic">
           nodownload2025.online is the definitive unblocked games portal. No Installation. No Latency. High Speed Gaming.
         </p>
      </div>
      <p className="text-gray-800 text-[10px] uppercase font-black tracking-[0.5em] border-t border-gray-900 pt-12 select-none">© 2025 UNBLOCKED GAMES ONLINE. NO DOWNLOAD REQUIRED.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans selection:bg-indigo-600/50 antialiased">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
          <Route path="/about" element={<div className="container mx-auto px-4 py-32 text-center text-gray-500 font-black uppercase tracking-[0.4em] opacity-30">About nodownload2025.online</div>} />
          <Route path="/privacy" element={<div className="container mx-auto px-4 py-32 text-center text-gray-500 font-black uppercase tracking-[0.4em] opacity-30">Privacy Policy - High Performance</div>} />
          <Route path="/contact" element={<div className="container mx-auto px-4 py-32 text-center text-gray-500 font-black uppercase tracking-[0.4em] opacity-30">Contact Support - Always Active</div>} />
        </Routes>
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
};

const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem('cookies-accepted')) setShow(true);
  }, []);
  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-indigo-950/95 backdrop-blur-3xl p-8 flex flex-col md:flex-row items-center justify-between z-[100] border-t border-indigo-500/30 gap-8 shadow-2xl">
      <div className="flex items-center gap-6 text-center md:text-left">
        <Cookie className="w-10 h-10 text-indigo-400 shrink-0 hidden md:block" />
        <p className="text-xs text-indigo-100 font-black uppercase tracking-widest leading-relaxed max-w-xl">
          We use performance-tuned cookies to maintain zero-lag infrastructure. 
          By playing, you agree to our 2025 data standards.
        </p>
      </div>
      <button onClick={accept} className="bg-white text-indigo-950 px-12 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-100 transition-all shadow-xl active:scale-95 transform hover:scale-105">
        Accept & Play
      </button>
    </div>
  );
};

export default App;