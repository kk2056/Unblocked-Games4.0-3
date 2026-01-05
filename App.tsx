import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, ArrowLeft, Flame, Zap, Play, Check, Cookie, Maximize, Monitor, Smartphone, Globe } from 'lucide-react';

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
      gameplay: "Subway Surfers remains the gold standard for endless runners. You play as a graffiti artist running along subway tracks to escape a grumpy inspector and his dog. The game requires sharp reflexes to dodge trains and hurdles while collecting coins for power-ups.",
      strategies: "Focus on staying on the roof of the trains as much as possible to avoid ground-level obstacles. Prioritize the Jetpack and the 2x Multiplier to skyrocket your high score.",
      whyPopular: "Its vibrant graphics and smooth controls make it perfectly compatible with school Chromebooks and mobile devices."
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
      gameplay: "A rhythm-based platformer that challenges your timing and patience. Every jump is synced to a high-energy soundtrack, making the difficulty feel rewarding rather than frustrating.",
      strategies: "Turn on the music! The audio cues are essential for timing your jumps in later levels. Use 'Practice Mode' to master tricky segments before attempting a full run.",
      whyPopular: "The challenge level creates a 'just one more try' loop that is perfect for short breaks."
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
      gameplay: "Moto X3M is a physics-based bike racing game featuring 22 challenging levels. Each level is packed with massive obstacles like giant saw blades and explosive TNT crates.",
      strategies: "Balance is key. Leaning back while in the air helps you land safely on uneven surfaces, while front flips and backflips reduce your overall time.",
      whyPopular: "Fast loading times and high replayability make it a favorite for 'no download' gaming sessions."
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
      gameplay: "Control a neon ball as it speeds down a steep, obstacle-filled 3D track. The further you go, the faster the ball travels, testing your reaction time to the limit.",
      strategies: "Try to stay centered on the track, as the physics can become unpredictable at high speeds. Watch for the red obstacles that end your run immediately.",
      whyPopular: "Its simple 3D aesthetic and high-speed gameplay make it one of the most played unblocked games globally."
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
      gameplay: "A wacky one-button basketball game where the physics change every time you score. You might find yourself playing with long arms, on an icy court, or with a heavy ball.",
      strategies: "Timing your jump is more important than spamming the button. Wait for the opponent to jump first so you can block or steal the ball while they are descending.",
      whyPopular: "The unpredictability makes it a hilarious local multiplayer or solo experience."
    }
  }
];

// --- AD COMPONENT ---

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
          if (width > 0) {
            timer = setTimeout(() => {
              try {
                if (window.adsbygoogle && !pushed.current) {
                  (window.adsbygoogle = window.adsbygoogle || []).push({});
                  pushed.current = true;
                  observer.disconnect();
                }
              } catch (e) {
                console.warn("AdSense push deferred.");
              }
            }, 500);
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
    <div className={`flex justify-center w-full ${className}`}>
      <div ref={containerRef} className="bg-gray-900/40 rounded-lg flex flex-col items-center justify-center min-h-[100px] min-w-[300px] w-full border border-gray-800/50 relative overflow-hidden">
        <div className="absolute top-1 text-[8px] text-gray-700 uppercase tracking-widest pointer-events-none">Advertisement</div>
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

// --- COMPONENTS ---

const Header: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({ searchTerm, setSearchTerm }) => (
  <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 py-3 backdrop-blur-md shadow-xl">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
      <Link to="/" className="flex items-center gap-2 group">
        <div className="bg-indigo-600 p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-indigo-500/20 shadow-lg">
          <Gamepad2 className="text-white w-6 h-6" />
        </div>
        <div className="leading-tight">
          <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">Unblocked 2025</h1>
          <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.2em]">No Download Portal</p>
        </div>
      </Link>
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search 1,000+ unblocked games..." 
          className="w-full bg-gray-900 border border-gray-700 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white placeholder:text-gray-600"
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
      elem.requestFullscreen().catch(err => console.warn(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  if (!game) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <button onClick={() => navigate('/')} className="flex items-center gap-2 px-5 py-2.5 bg-gray-800 rounded-xl text-xs font-black text-gray-300 mb-6 hover:bg-gray-700 transition-all border border-gray-700 uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          
          {/* AD ABOVE GAME */}
          <AdBanner slotId="game-player-top" className="mb-6" />

          {/* MOBILE TIP */}
          <div className="text-center text-white bg-indigo-900/80 p-4 rounded-2xl mb-6 max-w-lg mx-auto shadow-2xl border border-indigo-500/30 flex items-center justify-center gap-3">
            <Smartphone className="w-5 h-5 text-indigo-400" />
            <p className="text-sm font-bold tracking-tight">
              Landscape Mode is highly recommended for mobile & Chromebook play!
            </p>
          </div>

          {/* FULLSCREEN BUTTON */}
          <button 
            onClick={toggleFullscreen} 
            className="block mx-auto bg-green-600 hover:bg-green-700 text-white font-black py-4 px-10 rounded-2xl text-xl mb-6 shadow-2xl transition-all active:scale-95 transform hover:scale-105 flex items-center justify-center gap-4 uppercase tracking-tighter"
          >
            <Maximize className="w-6 h-6" />
            Full Screen (F Key)
          </button>
          
          <div className="text-center text-white bg-blue-900/50 p-4 rounded-2xl mb-8 max-w-xl mx-auto shadow-lg border border-blue-500/20 text-sm font-bold italic">
            "Zero Lag" Experience - Press F for total immersion!
          </div>

          {/* LOADING HINT */}
          <div className="text-center text-gray-600 mb-4 animate-pulse text-[10px] font-black uppercase tracking-[0.4em]">
            Syncing Assets...
          </div>

          {/* IFRAME CONTAINER */}
          <div className="relative bg-black rounded-[2rem] overflow-hidden aspect-[16/9] ring-8 ring-gray-950 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-10">
                <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-indigo-400 text-xs font-black tracking-[0.3em] uppercase">Booting Engine...</p>
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

          {/* AD BELOW GAME */}
          <AdBanner slotId="game-player-bottom" className="mt-10" />

          {/* RICH CONTENT SECTION (Solving Low Value Content) */}
          <div className="bg-gray-900 rounded-[2.5rem] p-10 border border-gray-800 shadow-2xl mt-12">
            <h1 className="text-4xl font-black text-white mb-6 border-b border-gray-800 pb-6 tracking-tighter uppercase italic">
              {game.title} <span className="text-indigo-500">Unblocked 2025/2026</span>
            </h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <h2 className="text-xl text-white font-black mb-4 uppercase flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" /> Why Play {game.title}?
              </h2>
              <p className="mb-8 leading-relaxed text-lg font-medium italic opacity-90">
                As we look towards the next generation of browser gaming, including the highly anticipated <strong>unblocked games 2026 school</strong> trends, {game.title} stands out as a timeless classic. It offers a perfect blend of high-speed performance and low-latency input, ensuring it works perfectly on restricted school networks and older hardware.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="bg-gray-850/40 p-8 rounded-3xl border border-gray-700/30">
                  <h3 className="text-indigo-400 font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Flame className="w-5 h-5" /> Master the Mechanics
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent?.gameplay}</p>
                </div>
                <div className="bg-gray-850/40 p-8 rounded-3xl border border-gray-700/30">
                  <h3 className="text-indigo-400 font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <Check className="w-5 h-5" /> Professional Tips
                  </h3>
                  <p className="text-sm leading-relaxed">{game.richContent?.strategies}</p>
                </div>
              </div>

              <div className="bg-gray-950/50 p-8 rounded-3xl border border-gray-800 mb-8">
                <h3 className="text-white font-black mb-4 uppercase text-sm italic">The 2026 Perspective</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  The evolution of web technologies like WebGL and WebAssembly means that playing <strong>unblocked games in 2026 at school</strong> will be more immersive than ever. We are committed to maintaining a high-quality library that bypasses filters while providing educational and hand-eye coordination benefits. Whether you are on a Chromebook or a tablet, our games are optimized for instant execution without any downloads.
                </p>
              </div>
            </div>
          </div>
          
          {/* SEO LINKS GRID */}
          <div className="mt-12 p-10 bg-gray-950 rounded-[3rem] border border-gray-800 border-dashed">
            <h3 className="text-white font-black mb-8 text-center uppercase tracking-[0.4em] text-[10px] opacity-40">Network Global Links</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[9px] font-black uppercase tracking-tighter">
              <a href="https://snakegame.cfd" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/30 p-4 rounded-2xl text-center border border-gray-800">Snake Unblocked</a>
              <a href="https://slope2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/30 p-4 rounded-2xl text-center border border-gray-800">Slope Game 2025</a>
              <a href="https://retrobowl2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/30 p-4 rounded-2xl text-center border border-gray-800">Retro Bowl Online</a>
              <a href="https://1v1lol2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/30 p-4 rounded-2xl text-center border border-gray-800">1v1.LOL Mobile</a>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-white font-black mb-6 flex items-center gap-2 border-b border-gray-800 pb-4 text-[11px] uppercase tracking-[0.3em]">
              <Zap className="w-4 h-4 text-yellow-500" /> Suggested
            </h3>
            <div className="space-y-6">
              {GAMES.filter(g => g.id !== id).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-4 group">
                  <div className="w-20 h-14 overflow-hidden rounded-2xl shrink-0 border border-gray-800 group-hover:border-indigo-500 transition-all shadow-md">
                    <img src={sg.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-[11px] font-black line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase italic">{sg.title}</h4>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-tighter mt-1">{sg.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <AdBanner slotId="sidebar-ad-1" />
        </div>
      </div>
    </div>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="block group">
    <div className="bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_-15px_rgba(79,70,229,0.5)]">
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-indigo-600 rounded-full p-6 transform scale-50 group-hover:scale-100 transition-all duration-300 shadow-indigo-500/50 shadow-2xl">
            <Play className="text-white w-8 h-8 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-white font-black text-sm group-hover:text-indigo-400 transition-colors uppercase tracking-tighter italic">{game.title}</h3>
          <span className="bg-indigo-600/20 text-indigo-400 text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest">{game.category}</span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-gray-600 font-black uppercase">
          <span className="flex items-center gap-1 text-yellow-600"><Flame className="w-3 h-3" /> {game.rating}</span>
          <span className="opacity-50">{game.plays} Plays</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-20 text-center">
        <h2 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
          UNBLOCKED <span className="text-indigo-500">2025</span>
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-500 font-bold uppercase tracking-widest text-[11px] mb-8">
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800"><Monitor className="w-4 h-4" /> PC Optimized</span>
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800"><Smartphone className="w-4 h-4" /> No Installation</span>
          <span className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-full border border-gray-800"><Globe className="w-4 h-4" /> Global Access</span>
        </div>
        <p className="text-gray-500 max-w-3xl mx-auto text-base font-bold tracking-tight opacity-70 leading-relaxed">
          The ultimate destination for instant-access browser gaming. Experience zero-lag performance on Chromebooks, tablets, and desktops. No downloads required.
        </p>
      </div>
      
      <AdBanner slotId="home-top" className="mb-12" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
      </div>

      <div className="mt-32 p-12 bg-gray-900/50 rounded-[3.5rem] border border-gray-800 shadow-3xl text-center max-w-5xl mx-auto">
        <h3 className="text-3xl font-black text-white mb-8 uppercase italic">Trending: Unblocked Games 2026 School Access</h3>
        <div className="prose prose-invert prose-indigo mx-auto text-gray-500 font-medium leading-loose text-sm text-justify md:text-center space-y-6">
          <p>
            Welcome to the future of browser entertainment. Our platform is meticulously designed to provide high-quality <strong>unblocked games for 2026 school</strong> environments. We understand the need for quick, accessible, and safe gaming during school breaks or downtime. By leveraging advanced HTML5 frameworks, our library of <strong>unblocked games 2026 school</strong> edition ensures that you get a console-like experience without the need for high-end hardware.
          </p>
          <p>
            Why choose our portal? Unlike other legacy sites, we focus on the "No Download" philosophy. This means zero risk of malware and instant playability. Our recommendations for <strong>unblocked games 2026 school</strong> students include fast-paced titles like Subway Surfers and Slope, alongside strategic masterpieces like Basketball Physics and Geometry Dash. These games are not just fun—they help improve cognitive functions, hand-eye coordination, and strategic thinking.
          </p>
          <p>
            As we move closer to 2026, we are updating our servers to provide even lower latency for global users. Our mission is to keep gaming alive in restricted networks while ensuring all content is safe and educational. Bookmark <strong>nodownload2025.online</strong> to stay ahead of the curve and access the premier collection of unblocked content anytime, anywhere.
          </p>
        </div>
      </div>

      <AdBanner slotId="home-bottom" className="mt-24" />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-24 mt-40">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-16 mb-16 text-[11px] font-black uppercase tracking-[0.4em] text-gray-600">
        <Link to="/about" className="hover:text-indigo-400 transition-colors">Origins</Link>
        <Link to="/privacy" className="hover:text-indigo-400 transition-colors">Ethics</Link>
        <Link to="/contact" className="hover:text-indigo-400 transition-colors">Connect</Link>
      </div>
      <div className="max-w-xl mx-auto mb-16">
         <p className="text-[10px] text-gray-800 uppercase tracking-widest leading-loose font-black italic border-y border-gray-900 py-10">
           NODOWNLOAD2025.ONLINE - THE DEFINITIVE UNBLOCKED STANDARD. ALL TRADEMARKS BELONG TO THEIR RESPECTIVE VISIONARIES. ZERO LATENCY. HIGH FIDELITY. GLOBAL ACCESS.
         </p>
      </div>
      <p className="text-gray-900 text-[11px] uppercase font-black tracking-[1em] select-none opacity-20">© 2025 UNBLOCKED GAMES ONLINE. NO DOWNLOAD REQUIRED.</p>
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
          <Route path="/about" element={<div className="container mx-auto px-4 py-40 text-center text-gray-800 font-black uppercase tracking-[1em] opacity-20">The Vision Behind nodownload2025.online</div>} />
          <Route path="/privacy" element={<div className="container mx-auto px-4 py-40 text-center text-gray-800 font-black uppercase tracking-[1em] opacity-20">Data Security Standards 2025</div>} />
          <Route path="/contact" element={<div className="container mx-auto px-4 py-40 text-center text-gray-800 font-black uppercase tracking-[1em] opacity-20">Direct Support Infrastructure</div>} />
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
    <div className="fixed bottom-0 left-0 w-full bg-indigo-950/95 backdrop-blur-3xl p-10 flex flex-col md:flex-row items-center justify-between z-[100] border-t border-indigo-500/20 gap-10 shadow-3xl">
      <div className="flex items-center gap-8 text-center md:text-left">
        <Cookie className="w-12 h-12 text-indigo-400 shrink-0 hidden md:block" />
        <p className="text-xs text-indigo-100 font-black uppercase tracking-widest leading-loose max-w-2xl">
          WE UTILIZE PERFORMANCE-FOCUSED COOKIES TO MAINTAIN OUR ZERO-LAG CLOUD INFRASTRUCTURE. BY PLAYING, YOU ACKNOWLEDGE OUR 2025 DATA ARCHITECTURE.
        </p>
      </div>
      <button onClick={accept} className="bg-white text-indigo-950 px-16 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.3em] hover:bg-indigo-100 transition-all shadow-2xl active:scale-95 transform hover:scale-105">
        Accept & Sync
      </button>
    </div>
  );
};

export default App;