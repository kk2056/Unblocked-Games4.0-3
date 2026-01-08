import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, ArrowLeft, Flame, Zap, Play, Check, Cookie, Maximize, Monitor, Smartphone, Globe, ShieldCheck, Cpu, Star } from 'lucide-react';

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
      gameplay: "Subway Surfers is the definitive choice for anyone searching for unblocked games 2026 school chromebook no download options. You play as a graffiti artist dodging the inspector across urban landscapes. The game is fully optimized for HTML5, ensuring smooth performance on standard school laptops.",
      strategies: "Always prioritize the Jetpack power-up to bypass ground-level obstacles. Collecting coins allows for character upgrades that make high-score runs much easier to sustain.",
      whyPopular: "It requires zero local storage and bypasses common network restrictions via our secure cloud proxy."
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
      gameplay: "A rhythm-based platformer that is widely considered the best unblocked games 2026 school chromebook no download experience for reflex training. The game demands perfect synchronization with its high-energy soundtrack.",
      strategies: "Use 'Practice Mode' to learn the layout of complex levels. The visual cues often precede the beat, so keep your eyes focused on the right side of the screen.",
      whyPopular: "Instant resets and zero loading screens keep the momentum going during short gaming breaks."
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
      gameplay: "Moto X3M is an incredible physics-based racer. It's a staple for students looking for unblocked games 2026 school chromebook no download content that offers genuine mechanical depth. Navigate through 22 levels of increasing complexity.",
      strategies: "Perform front and backflips while in mid-air to shave seconds off your time. Precision landing is vital—always tilt your bike to match the angle of the terrain.",
      whyPopular: "Its lightweight engine means it doesn't throttle CPU performance on older Chromebook models."
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
      gameplay: "Slope is the high-speed 3D runner that defined the unblocked games 2026 school chromebook no download category. Control a neon ball as it accelerates down a treacherous geometric path.",
      strategies: "Keep your movements as minimal as possible. Large steering maneuvers often result in flying off the edge. Anticipate the tunnel sections early.",
      whyPopular: "The competitive nature of its high-score system makes it a great social game for school groups."
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
      gameplay: "Basket Random offers hilarious physics-based fun. It's one of the most accessible unblocked games 2026 school chromebook no download titles because it only uses a single button for all actions.",
      strategies: "Wait for the physics to change to your advantage. If the ball becomes heavy, focus on short hops. If the arms grow long, focus on defensive blocks.",
      whyPopular: "Randomized elements ensure that every round feels unique and unpredictable."
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
                console.warn("AdSense push safely deferred.");
              }
            }, 600);
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
      <div ref={containerRef} className="bg-gray-950/50 rounded-2xl flex flex-col items-center justify-center min-h-[120px] min-w-[300px] w-full border border-gray-800/50 relative overflow-hidden backdrop-blur-md shadow-inner">
        <div className="absolute top-2 text-[8px] text-gray-700 uppercase font-black tracking-[0.3em] pointer-events-none">Sponsored Content Area</div>
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
  <header className="bg-gray-950 border-b border-gray-800 sticky top-0 z-50 py-4 backdrop-blur-xl shadow-2xl">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-5">
      <Link to="/" className="flex items-center gap-3 group">
        <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-12 transition-all shadow-indigo-500/30 shadow-xl group-hover:shadow-indigo-500/50">
          <Gamepad2 className="text-white w-7 h-7" />
        </div>
        <div className="leading-none">
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic">NO DOWNLOAD 2025</h1>
          <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] mt-1">Unblocked Gaming Hub</p>
        </div>
      </Link>
      <div className="relative w-full md:max-w-xl">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
        <input 
          type="text" 
          placeholder="Search unblocked games 2026 school chromebook no download..." 
          className="w-full bg-gray-900 border border-gray-800 rounded-2xl py-3.5 pl-14 pr-6 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white placeholder:text-gray-700 font-bold"
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
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="flex items-center gap-3 px-6 py-3 bg-gray-900 rounded-2xl text-[11px] font-black text-gray-400 mb-8 hover:bg-gray-800 transition-all border border-gray-800 uppercase tracking-widest shadow-lg active:scale-95">
        <ArrowLeft className="w-4 h-4" /> Return to Library
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          
          <AdBanner slotId="game-player-top" className="mb-8" />

          {/* MOBILE ADAPTATION TIP */}
          <div className="text-center text-white bg-purple-900/90 p-5 rounded-[2rem] mb-8 max-w-2xl mx-auto shadow-2xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-center gap-4">
            <Smartphone className="w-8 h-8 text-purple-300 animate-pulse" />
            <p className="text-sm font-black tracking-tight uppercase">
              Pro Tip: Rotate to Landscape! The best way to play <span className="text-yellow-400 italic">unblocked games 2026 school chromebook no download</span> apps.
            </p>
          </div>

          {/* FULLSCREEN BUTTON */}
          <button 
            onClick={toggleFullscreen} 
            className="block mx-auto bg-green-600 hover:bg-green-700 text-white font-black py-5 px-14 rounded-3xl text-2xl mb-8 shadow-[0_15px_30px_-5px_rgba(22,163,74,0.5)] transition-all active:scale-95 transform hover:scale-105 flex items-center justify-center gap-5 uppercase tracking-tighter"
          >
            <Maximize className="w-8 h-8" />
            Play Full Screen (Press F)
          </button>
          
          <div className="text-center text-white bg-indigo-950/50 p-5 rounded-3xl mb-10 max-w-2xl mx-auto shadow-xl border border-indigo-500/20 text-xs font-black uppercase tracking-[0.3em]">
             No lag, full immersion - optimized for all browser nodes.
          </div>

          <div className="text-center text-gray-700 mb-5 animate-pulse text-[10px] font-black uppercase tracking-[0.5em]">
            Syncing Browser Instance...
          </div>

          {/* GAME IFRAME */}
          <div className="relative bg-black rounded-[3rem] overflow-hidden aspect-[16/9] ring-[12px] ring-gray-900 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] transition-transform hover:scale-[1.01] duration-500">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-10">
                <div className="w-20 h-20 border-[6px] border-indigo-600 border-t-transparent rounded-full animate-spin mb-8"></div>
                <p className="text-indigo-400 text-xs font-black tracking-[0.4em] uppercase">Booting Engine...</p>
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

          <div className="ad-bottom mt-10 text-center mb-10">
            <AdBanner slotId="game-player-bottom-main" />
          </div>

          {/* RICH GAME GUIDE */}
          <div className="bg-gray-900/40 rounded-[3rem] p-12 border border-gray-800 shadow-3xl mt-16 backdrop-blur-sm relative overflow-hidden">
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full"></div>
            <h1 className="text-5xl font-black text-white mb-8 border-b border-gray-800 pb-8 tracking-tighter uppercase italic">
              {game.title} <span className="text-indigo-500">Guide 2026</span>
            </h1>
            <div className="prose prose-invert max-w-none text-gray-400">
              <h2 className="text-2xl text-white font-black mb-6 uppercase flex items-center gap-3">
                <Globe className="w-7 h-7 text-indigo-400" /> Advanced Gameplay Analysis
              </h2>
              <p className="mb-10 leading-relaxed text-xl font-bold italic opacity-80 border-l-4 border-indigo-600 pl-6">
                Are you tired of filters blocking your fun? {game.title} is recognized globally as one of the premier <strong>unblocked games 2026 school chromebook no download</strong> choices. This title offers high-fidelity visual feedback and complex physics that remain perfectly smooth even on limited hardware.
              </p>
              
              <div className="grid md:grid-cols-2 gap-10 mb-12">
                <div className="bg-gray-950/60 p-10 rounded-[2.5rem] border border-gray-800/50 hover:border-indigo-500/30 transition-all shadow-inner">
                  <h3 className="text-indigo-400 font-black mb-5 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Flame className="w-6 h-6" /> Mechanic Masterclass
                  </h3>
                  <p className="text-sm leading-loose font-medium">{game.richContent?.gameplay}</p>
                </div>
                <div className="bg-gray-950/60 p-10 rounded-[2.5rem] border border-gray-800/50 hover:border-indigo-500/30 transition-all shadow-inner">
                  <h3 className="text-indigo-400 font-black mb-5 flex items-center gap-3 uppercase tracking-widest text-xs">
                    <Check className="w-6 h-6" /> Strategy & Tips
                  </h3>
                  <p className="text-sm leading-loose font-medium">{game.richContent?.strategies}</p>
                </div>
              </div>

              <div className="bg-indigo-950/20 p-10 rounded-[2.5rem] border border-indigo-900/30 mb-10 group hover:border-indigo-500 transition-colors duration-500">
                <h3 className="text-white font-black mb-5 uppercase text-base italic flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-indigo-500 group-hover:scale-110 transition-transform" /> Why it works on Chromebooks
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed font-bold">
                  The efficiency of our <strong>unblocked games 2026 school chromebook no download</strong> system is rooted in advanced browser-side rendering. By bypassing the need for heavy local installs, we allow your browser to allocate all its processing power to the game loop, ensuring zero lag and maximum responsiveness during intense play.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-16 p-12 bg-gray-950 rounded-[4rem] border border-gray-800 border-dashed">
            <h3 className="text-white font-black mb-10 text-center uppercase tracking-[0.5em] text-[10px] opacity-40">Network Global Connectivity</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-[10px] font-black uppercase tracking-tighter">
              <a href="https://snakegame.cfd" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">Snake 2026</a>
              <a href="https://slope2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">Slope 2025</a>
              <a href="https://retrobowl2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">Retro Bowl Pro</a>
              <a href="https://1v1lol2025.online" target="_blank" className="text-gray-500 hover:text-indigo-400 transition-all bg-gray-900/20 p-5 rounded-3xl text-center border border-gray-800 hover:scale-105">1v1.LOL Hub</a>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-gray-900/80 border border-gray-800 rounded-[2.5rem] p-8 shadow-3xl backdrop-blur-md">
            <h3 className="text-white font-black mb-8 flex items-center gap-3 border-b border-gray-800 pb-5 text-[11px] uppercase tracking-[0.4em]">
              <Zap className="w-5 h-5 text-yellow-500" /> Trending Now
            </h3>
            <div className="space-y-8">
              {GAMES.filter(g => g.id !== id).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-5 group">
                  <div className="w-24 h-16 overflow-hidden rounded-2xl shrink-0 border border-gray-800 group-hover:border-indigo-500 transition-all shadow-xl">
                    <img src={sg.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-[12px] font-black line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase italic tracking-tighter">{sg.title}</h4>
                    <p className="text-[9px] text-gray-500 uppercase font-black tracking-tighter mt-1.5 opacity-60">{sg.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <AdBanner slotId="sidebar-extra-slot" className="sticky top-28" />
        </div>
      </div>
    </div>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="block group">
    <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-800 hover:border-indigo-500 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_30px_60px_-20px_rgba(79,70,229,0.6)]">
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-md">
          <div className="bg-indigo-600 rounded-full p-8 transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-indigo-500/60 shadow-3xl">
            <Play className="text-white w-10 h-10 fill-current" />
          </div>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-white font-black text-base group-hover:text-indigo-400 transition-colors uppercase tracking-tighter italic">{game.title}</h3>
          <span className="bg-indigo-600/20 text-indigo-400 text-[9px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest leading-none">FREE</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-gray-600 font-black uppercase">
          <span className="flex items-center gap-1.5 text-yellow-600"><Star className="w-4 h-4 fill-current" /> {game.rating}</span>
          <span className="opacity-40">{game.plays} Active</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-24 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/5 blur-[120px] pointer-events-none rounded-full"></div>
        <h2 className="text-7xl md:text-[10rem] font-black text-white mb-8 tracking-tighter uppercase italic leading-[0.8]">
          ARCADE <span className="text-indigo-500">2026</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600 font-black uppercase tracking-[0.5em] text-[10px] mb-12 relative z-10">
          <span className="flex items-center gap-3 px-6 py-3 bg-gray-900/60 rounded-full border border-gray-800 shadow-lg backdrop-blur-sm"><Monitor className="w-5 h-5" /> Ultra PC</span>
          <span className="flex items-center gap-3 px-6 py-3 bg-gray-900/60 rounded-full border border-gray-800 shadow-lg backdrop-blur-sm"><Smartphone className="w-5 h-5" /> Cloud Hub</span>
          <span className="flex items-center gap-3 px-6 py-3 bg-gray-900/60 rounded-full border border-gray-800 shadow-lg backdrop-blur-sm"><ShieldCheck className="w-5 h-5" /> Safe School</span>
        </div>
        <p className="text-gray-500 max-w-4xl mx-auto text-xl font-bold tracking-tight opacity-80 leading-relaxed uppercase relative z-10">
          Access the best <span className="text-indigo-400 italic">unblocked games 2026 school chromebook no download</span> standard. Instant Play. Zero Latency. High Speed Global Arcade.
        </p>
      </div>
      
      <AdBanner slotId="home-top-main" className="mb-20" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredGames.map(game => <GameCard key={game.id} game={game} />)}
      </div>

      {/* DETAILED SEO CONTENT SECTION */}
      <div className="mt-40 p-16 bg-gray-900/30 rounded-[4rem] border border-gray-800 shadow-3xl text-center max-w-6xl mx-auto backdrop-blur-sm relative overflow-hidden">
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-600/10 blur-[150px] pointer-events-none rounded-full"></div>
        <h3 className="text-4xl font-black text-white mb-12 uppercase italic tracking-tighter">The Future of Unblocked Games 2026 School Chromebook No Download Access</h3>
        <div className="prose prose-invert prose-indigo mx-auto text-gray-500 font-bold leading-loose text-base text-justify md:text-center space-y-10 opacity-70 relative z-10">
          <p>
            Welcome to the definitive source for <strong>unblocked games 2026 school chromebook no download</strong> entertainment. We recognize that in a modern school environment, accessibility and performance are the two most critical factors for any gaming platform. Our site is architected specifically to overcome common network limitations while delivering high-fidelity visuals that typically require dedicated software installs.
          </p>
          <p>
            Why is the <strong>unblocked games 2026 school chromebook no download</strong> movement gaining so much momentum? The answer lies in the shift toward cloud-based infrastructure. Modern browsers like Chrome and Safari are now capable of running complex WebGL and WebAssembly binaries with near-native efficiency. This technological leap allows us to host massive titles like Moto X3M and Subway Surfers directly in your tab, bypasses the need for local data storage, and ensuring your device stays fast and secure.
          </p>
          <p>
            Our dedicated team of engineers works around the clock to ensure every game on our portal meets the strict <strong>unblocked games 2026 school chromebook no download</strong> quality standards. We filter out any content that includes heavy tracking scripts or intrusive pop-ups, creating a safe sandbox for students to unwind during lunch breaks or between lectures. By focusing on a "no download" philosophy, we also ensure that our users never have to worry about administrative restrictions on file systems.
          </p>
          <p>
            As we move into 2026, we are expanding our global CDN (Content Delivery Network) to reduce ping times to under 10ms for most users. This makes our portal the ultimate destination for rhythm games like Geometry Dash, where every millisecond of latency can be the difference between a high score and a reset. Bookmark <strong>nodownload2025.online</strong> today and stay ahead of the curve with the world's most responsive unblocked game library.
          </p>
        </div>
      </div>

      <AdBanner slotId="home-bottom-main" className="mt-32" />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-32 mt-40">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-20 mb-20 text-[11px] font-black uppercase tracking-[0.5em] text-gray-600">
        <Link to="/about" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Origins</Link>
        <Link to="/privacy" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Ethics</Link>
        <Link to="/contact" className="hover:text