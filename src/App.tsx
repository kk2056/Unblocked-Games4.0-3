import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, ArrowLeft, Shield, Flame, Zap, Menu, X, Mail, AlertTriangle, RotateCcw, Play, Check, Cookie, Info, Maximize } from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Racing' | 'Puzzle' | 'Sports' | 'Simulation';
  image: string;
  url: string;
  description: string;
  richContent: {
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
      gameplay: "Subway Surfers is the quintessential endless runner that defines the genre. Players take on the role of Jake, Tricky, or Fresh, graffiti artists who must escape from the grumpy Inspector and his dog.",
      strategies: "To master Subway Surfers in 2025, focus on staying on top of the trains. Always prioritize the Jetpack power-up.",
      whyPopular: "Non-violent visual style and responsive controls make it a school staple for coordination training."
    }
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    category: 'Action',
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

const AdSenseScript: React.FC = () => {
  useEffect(() => {
    if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
      const script = document.createElement("script");
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9774042341049510";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);
    }
  }, []);
  return null;
};

const AdBanner: React.FC<{ slotId?: string; className?: string }> = ({ slotId = "default-slot", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const location = useLocation();

  useEffect(() => {
    pushed.current = false;
    let timer: any;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !pushed.current) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const width = containerRef.current.offsetWidth;
          if (width > 0 && containerRef.current.offsetParent !== null) {
            timer = setTimeout(() => {
              try {
                if (window.adsbygoogle && !pushed.current) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  pushed.current = true;
                  observer.disconnect();
                }
              } catch (e) {
                console.warn("AdSense push skipped");
              }
            }, 300);
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
    <div className={`ad-container w-full ${className}`}>
      <div ref={containerRef} className="overflow-hidden bg-gray-900/50 rounded flex flex-col items-center justify-center min-h-[90px] relative p-2">
         <div className="text-[10px] text-gray-700 uppercase tracking-widest mb-1">Advertisement</div>
        <ins className="adsbygoogle"
             key={`ad-${location.pathname}-${slotId}`}
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

const AdRectangle: React.FC = () => (
  <div className="bg-[#1f2937] border border-gray-700 rounded-xl p-4 shadow-md text-center">
    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Advertisement</div>
    <AdBanner slotId="sidebar-rect-slot" />
  </div>
);

// --- COMPONENTS ---

const Header: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({ searchTerm, setSearchTerm }) => (
  <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 py-3 shadow-lg backdrop-blur-md">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-indigo-600 p-2 rounded-lg group-hover:rotate-12 transition-transform">
          <Gamepad2 className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Unblocked Games</h1>
          <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">No Download 2025</p>
        </div>
      </Link>
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search unblocked games..." 
          className="w-full bg-gray-900 border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Fullscreen error: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  if (!game) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <AdSenseScript />
      
      {/* Back Navigation */}
      <button onClick={() => navigate('/')} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-sm text-gray-300 mb-6 hover:bg-gray-700 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          
          {/* RPM BOOST: AD TOP */}
          <div className="ad-top mt-2 text-center mb-6">
            <AdBanner slotId="game-top-slot" />
          </div>

          {/* TASK 1: Mobile Adaptation Tip */}
          <div className="text-center text-white bg-purple-800 p-3 rounded-lg mb-6 max-w-md mx-auto shadow-md border border-purple-600 font-medium">
            Tip: Rotate to landscape for better experience on mobile/Chromebook!
          </div>

          {/* TASK 3: Enhanced Fullscreen Button */}
          <button 
            onClick={toggleFullscreen} 
            className="block mx-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-xl text-xl mb-6 shadow-lg transition-all active:scale-95 transform hover:scale-105 flex items-center justify-center gap-3"
          >
            <Maximize className="w-6 h-6" />
            Play Full Screen (Press F - Best Experience!)
          </button>
          
          <div className="text-center text-white bg-blue-800/60 p-2 rounded-lg mb-4 max-w-sm mx-auto text-xs font-medium border border-blue-700/50">
            Perfect for long play on Chromebook! No lag, full immersion.
          </div>

          {/* TASK 2: Loading Hint */}
          <div className="text-center text-gray-400 mb-4 animate-pulse text-sm font-semibold">
            Loading game... (Zero lag on 2025 networks)
          </div>

          {/* Game Frame */}
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-[16/9] ring-4 ring-gray-900 shadow-2xl transition-all">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-10">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-indigo-400 text-sm font-bold tracking-widest uppercase">Initializing Portal...</p>
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

          {/* RPM BOOST: AD BOTTOM */}
          <div className="ad-bottom mt-8 text-center mb-10">
            <AdBanner slotId="game-bottom-slot" />
          </div>

          {/* Game Content */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 mt-8 shadow-inner">
            <h1 className="text-3xl font-bold text-white mb-4 border-b border-gray-800 pb-4">{game.title} - Unblocked 2025</h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <h2 className="text-xl text-white font-bold mb-3">Gameplay Overview</h2>
              <p className="mb-6 leading-relaxed">{game.richContent.gameplay}</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-850/50 p-6 rounded-2xl border border-gray-700/50">
                  <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2">
                    <Flame className="w-5 h-5" /> Pro Strategies
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent.strategies}</p>
                </div>
                <div className="bg-gray-850/50 p-6 rounded-2xl border border-gray-700/50">
                  <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5" /> Why It's Popular
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent.whyPopular}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interlinking & SEO Text */}
          <div className="mt-12 p-8 bg-gray-950 rounded-3xl border border-gray-800/50 border-dashed">
            <h3 className="text-white font-bold mb-6 text-center uppercase tracking-widest">Explore Top Unblocked Sites 2025</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-medium">
              <a href="https://snakegame.cfd" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">Snake Unblocked</a>
              <a href="https://slope2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">Slope Game 2025</a>
              <a href="https://retrobowl2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">Retro Bowl Online</a>
              <a href="https://1v1lol2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">1v1.LOL Mobile</a>
              <a href="https://unblocked2025.sbs" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">Unblocked Games SBS</a>
              <a href="https://motox3m2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">Moto X3M Extra</a>
              <a href="https://surfers2025.site" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">Subway Surfers Portal</a>
              <a href="https://paperio2025.online" target="_blank" className="text-indigo-400 hover:text-white transition-all bg-gray-900/50 p-3 rounded-xl text-center border border-gray-800 hover:border-indigo-500">Paper.io Unblocked</a>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <AdRectangle />
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 sticky top-24 shadow-2xl">
            <h3 className="text-white font-bold mb-6 flex items-center gap-2 border-b border-gray-800 pb-3">
              <Zap className="w-5 h-5 text-yellow-400" /> Recommended Games
            </h3>
            <div className="space-y-5">
              {GAMES.filter(g => g.id !== id).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-4 group">
                  <div className="w-20 h-14 overflow-hidden rounded-lg shrink-0 border border-gray-800 group-hover:border-indigo-500 transition-all">
                    <img src={sg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-xs font-bold line-clamp-1 group-hover:text-indigo-400 transition-colors">{sg.title}</h4>
                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tight">{sg.category}</p>
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
    <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(99,102,241,0.5)]">
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="text-white w-10 h-10 fill-current" />
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-white font-bold text-sm truncate group-hover:text-indigo-400 transition-colors">{game.title}</h3>
          <span className="bg-indigo-600/20 text-indigo-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">{game.category}</span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-500">
          <span className="flex items-center gap-1 text-yellow-500 font-bold"><Flame className="w-3 h-3" /> {game.rating}</span>
          <span className="font-bold">{game.plays} Plays</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase italic">
          UNBLOCKED <span className="text-indigo-500">2025</span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium tracking-wide">
          Instant browser gaming for school or work. No downloads, zero lag, optimized for Chromebooks and 2025 networks.
        </p>
      </div>
      <AdBanner slotId="home-top-banner" className="mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
      </div>
      <AdBanner slotId="home-bottom-banner" className="mt-16" />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-800 py-12 mt-24">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm font-bold text-gray-500">
        <Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
        <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link>
        <Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Support</Link>
      </div>
      <div className="max-w-md mx-auto mb-8">
         <p className="text-[10px] text-gray-600 uppercase tracking-widest leading-relaxed">
           nodownload2025.online is a free unblocked games portal. All trademarks and characters belong to their respective owners.
         </p>
      </div>
      <p className="text-gray-700 text-[10px] uppercase font-black tracking-widest">© 2025 UNBLOCKED GAMES ONLINE. NO DOWNLOAD REQUIRED.</p>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans selection:bg-indigo-600/50">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
          <Route path="/about" element={<div className="container mx-auto px-4 py-20 text-center text-gray-400 font-bold">About Us Section - nodownload2025.online Excellence</div>} />
          <Route path="/privacy" element={<div className="container mx-auto px-4 py-20 text-center text-gray-400 font-bold">Privacy Policy - Your Safety is Our Priority</div>} />
          <Route path="/contact" element={<div className="container mx-auto px-4 py-20 text-center text-gray-400 font-bold">Contact Support - Always Here to Help</div>} />
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
    <div className="fixed bottom-0 left-0 w-full bg-indigo-950/95 backdrop-blur-xl p-5 flex flex-col md:flex-row items-center justify-between z-[100] border-t border-indigo-500/30 gap-4 shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3 text-center md:text-left">
        <Cookie className="w-6 h-6 text-indigo-400 shrink-0 hidden md:block" />
        <p className="text-xs text-indigo-100 font-medium leading-relaxed">
          We use performance cookies and AdSense technology to keep the games free and fast. 
          By continuing to play, you agree to our data policy.
        </p>
      </div>
      <button onClick={accept} className="bg-white text-indigo-900 px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors shadow-lg active:scale-95">
        Accept & Play
      </button>
    </div>
  );
};

export default App;