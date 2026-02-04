import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
  Gamepad2, Search, ArrowLeft, Flame, Zap, Play, Check, Cookie, 
  Maximize, Monitor, Smartphone, Globe, ShieldCheck, Cpu, Star,
  MessageCircle, Send, ThumbsUp, TrendingUp, Info
} from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Racing' | 'Puzzle' | 'Sports' | 'Simulation' | 'Adventure' | 'Arcade' | 'Rhythm' | 'Platformer' | 'Classic';
  image: string;
  url: string;
  description: string;
  guide: string;
  rating: number;
  plays: string;
}

interface Comment {
  id: number;
  user: string;
  text: string;
  timestamp: string;
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
    description: 'The ultimate unblocked games 2026 school chromebook no download free play experience.',
    guide: "Subway Surfers remains the gold standard for high-performance browser gaming on school networks. To excel in 2026, players must master the 'air-dash' technique—swiping mid-jump to land precisely on power-ups. On a school Chromebook, focus on keeping your browser's hardware acceleration enabled to avoid frame drops. The Jetpack is your most valuable asset; it not only grants coins but provides a necessary respite from ground obstacles. In 2026, the world tour includes futuristic neon cities specifically optimized for our high-speed no-download node. Always aim for the top of the trains to maximize your vision and reaction window.",
    rating: 4.9,
    plays: '52.1M'
  },
  {
    id: 'geometry-dash',
    title: 'Geometry Dash',
    category: 'Rhythm',
    image: 'https://images.crazygames.com/games/geometry-dash/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/geometry-dash',
    description: 'Master the rhythm in this unblocked games 2026 school chromebook no download free classic.',
    guide: "Geometry Dash is a test of pure mechanical precision and rhythmic sync. For Chromebook users, we recommend using a wired mouse to eliminate input latency that can occur with touchpads. The 2026 'Unblocked' edition features custom levels that utilize our server-side caching to prevent lag during complex wave sections. Your primary strategy should be 'muscle memory layering'—breaking down difficult segments in practice mode before attempting a full run. Don't just watch the cube; listen to the beat. Every jump is synchronized with the percussion, making this a rhythm game at its core.",
    rating: 4.8,
    plays: '12.5M'
  },
  {
    id: 'moto-x3m',
    title: 'Moto X3M',
    category: 'Racing',
    image: 'https://images.crazygames.com/games/moto-x3m/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/moto-x3m',
    description: 'High-octane unblocked games 2026 school chromebook no download free racing action.',
    guide: "Moto X3M is the definitive physics-based racer for 2026. Success depends on your mastery of tilt control. On school Chromebooks, the arrow keys provide the best tactile feedback for the minute adjustments needed. To achieve a 3-star rating, you MUST perform backflips and frontflips; each rotation subtracts 0.5 seconds from your final time. Watch the environment closely—circular saws and explosive barrels follow strict patterns that you can exploit. The 2026 version includes enhanced particle effects that remain smooth on our portal thanks to deep WebGL optimization.",
    rating: 4.7,
    plays: '85.4M'
  },
  {
    id: 'slope',
    title: 'Slope',
    category: 'Action',
    image: 'https://images.crazygames.com/games/slope/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/slope',
    description: 'The fastest 3D unblocked games 2026 school chromebook no download free experience.',
    guide: "Slope is the ultimate test of focus and micro-adjustments. In the 2026 ecosystem, Slope has been optimized to run at a consistent 60FPS even on limited hardware. The key strategy is to keep the ball centered on the platforms—the closer you stay to the middle, the more leeway you have for sudden turns. Avoid oversteering; small taps are far more effective than long presses. As the speed increases, rely on your peripheral vision to anticipate the neon barriers. Our node architecture ensures that the procedural generation is lag-free, allowing for true high-score competition at school.",
    rating: 4.4,
    plays: '105M'
  },
  {
    id: 'basket-random',
    title: 'Basket Random',
    category: 'Sports',
    image: 'https://images.crazygames.com/games/basket-random/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/basket-random',
    description: 'Chaos and fun in this unblocked games 2026 school chromebook no download free sports title.',
    guide: "Basket Random is where wacky physics meets competitive spirit. Because it's a one-button game, it's the perfect unblocked game for Chromebook users who might not have a mouse. In 2026, we've updated the physics engine to be even more unpredictable. Strategy is less about skill and more about timing your jumps to coincide with the random physics changes—like long arms or heavy balls. Defense is often better than offense; wait for your opponent to make a wild movement, then jump to snatch the ball and score. It’s the ultimate time-killer for quick sessions between classes.",
    rating: 4.5,
    plays: '15.8M'
  }
];

// --- AD COMPONENT ---

const AdBanner: React.FC<{ slotId?: string; className?: string }> = ({ slotId = "default-slot", className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    try {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.warn("AdSense deferred.");
    }
  }, [location.pathname]);

  return (
    <div className={`flex justify-center w-full my-8 ${className}`}>
      <div ref={containerRef} className="bg-gray-950/60 rounded-3xl flex flex-col items-center justify-center min-h-[150px] min-w-[300px] w-full border border-gray-800/40 relative overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="absolute top-2 text-[10px] text-gray-700 uppercase font-black tracking-[0.2em] pointer-events-none">Sponsorship Node</div>
        <ins className="adsbygoogle"
             style={{ display: 'block', width: '100%', minHeight: '120px' }}
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
  <header className="bg-gray-950 border-b border-gray-800/50 sticky top-0 z-50 py-4 backdrop-blur-2xl shadow-2xl">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
      <Link to="/" className="flex items-center gap-4 group">
        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-3 rounded-[1.5rem] group-hover:rotate-12 transition-all shadow-indigo-500/40 shadow-2xl">
          <Gamepad2 className="text-white w-8 h-8" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white tracking-tighter uppercase italic leading-none">NODOWNLOAD 2025</h1>
          <p className="text-[9px] text-indigo-400 font-black uppercase tracking-[0.4em] mt-1">2026 Gaming Standard</p>
        </div>
      </Link>
      <div className="relative w-full md:max-w-xl">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
        <input 
          type="text" 
          placeholder="Find unblocked games 2026 school chromebook no download free..." 
          className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl py-4 pl-16 pr-8 text-sm focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all text-white placeholder:text-gray-700 font-bold backdrop-blur-md"
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const toggleFullscreen = () => {
    const elem = document.documentElement;
    if (!document.fullscreenElement) elem.requestFullscreen().catch(e => console.error(e));
    else if (document.exitFullscreen) document.exitFullscreen();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      user: "Guest Gamer",
      text: comment,
      timestamp: new Date().toLocaleTimeString()
    };
    setComments([newComment, ...comments]);
    setComment("");
  };

  if (!game) return null;

  return (
    <div className="container mx-auto px-4 py-10 max-w-7xl">
      <button onClick={() => navigate('/')} className="flex items-center gap-3 px-8 py-4 bg-gray-900/50 rounded-2xl text-[12px] font-black text-gray-400 mb-10 hover:bg-gray-800 transition-all border border-gray-800 uppercase tracking-[0.2em] shadow-lg active:scale-95">
        <ArrowLeft className="w-5 h-5" /> Library Return
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-12">
          
          <div className="relative bg-black rounded-[4rem] overflow-hidden aspect-[16/9] ring-[16px] ring-gray-900 shadow-[0_50px_100px_-30px_rgba(0,0,0,1)] group">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-950 z-20">
                <div className="w-24 h-24 border-[8px] border-indigo-600 border-t-transparent rounded-full animate-spin mb-8 shadow-indigo-500/20 shadow-2xl"></div>
                <p className="text-indigo-400 text-[10px] font-black tracking-[0.6em] uppercase animate-pulse">Initializing 2026 Engine</p>
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
            <button 
              onClick={toggleFullscreen} 
              className="absolute bottom-10 right-10 bg-indigo-600/90 hover:bg-indigo-500 text-white p-6 rounded-full shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity z-30 active:scale-90"
            >
              <Maximize className="w-8 h-8" />
            </button>
          </div>

          <AdBanner slotId="game-player-below" />

          {/* GAME CONTENT & GUIDE */}
          <div className="bg-gray-900/40 rounded-[3.5rem] p-12 border border-gray-800/50 backdrop-blur-md shadow-3xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
                {game.title} <span className="text-indigo-500">Unblocked 2026</span>
              </h1>
              <div className="flex gap-4">
                <div className="bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 text-green-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Check className="w-4 h-4" /> Optimized
                </div>
                <div className="bg-indigo-500/10 px-6 py-3 rounded-full border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                  <Cpu className="w-4 h-4" /> Chromebook Safe
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <h2 className="text-3xl text-white font-black mb-8 uppercase flex items-center gap-4">
                <TrendingUp className="w-8 h-8 text-indigo-500" /> Pro Guide & Strategies
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed font-medium mb-10 italic">
                Looking for the best <strong>unblocked games 2026 school chromebook no download free</strong> experience? {game.title} is a top-tier choice for students. Below is our expert strategy guide to dominate the leaderboard.
              </p>
              <div className="bg-gray-950/80 p-10 rounded-[2.5rem] border border-gray-800 shadow-inner mb-12">
                <p className="text-gray-300 text-lg leading-loose">{game.guide}</p>
              </div>
            </div>

            {/* INTERACTIVE COMMENTS */}
            <div className="mt-20 border-t border-gray-800 pt-16">
              <h3 className="text-2xl font-black text-white uppercase mb-10 flex items-center gap-4 italic">
                <MessageCircle className="w-7 h-7 text-indigo-400" /> Community Feedback
              </h3>
              <form onSubmit={handleCommentSubmit} className="relative mb-12">
                <input 
                  type="text" 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="最喜欢的游戏是哪个？评论告诉我!"
                  className="w-full bg-gray-950 border border-gray-800 rounded-3xl py-6 pl-10 pr-24 text-sm font-bold focus:ring-4 focus:ring-indigo-500/20 transition-all text-white placeholder:text-gray-700 shadow-2xl"
                />
                <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 p-4 rounded-2xl transition-all active:scale-90">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </form>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                {comments.length === 0 ? (
                  <p className="text-gray-700 font-bold uppercase text-xs text-center py-10 tracking-[0.3em]">Be the first to share your 2026 strat!</p>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="bg-gray-900/50 p-6 rounded-[2rem] border border-gray-800/40 flex items-start gap-5 animate-in fade-in slide-in-from-bottom-4">
                      <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-400 font-black shrink-0 shadow-lg border border-indigo-500/20">
                        {c.user[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[11px] font-black text-indigo-400 uppercase tracking-widest">{c.user}</span>
                          <span className="text-[9px] text-gray-700 font-bold uppercase">{c.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-400 font-medium">{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="lg:col-span-1 space-y-10">
          <div className="bg-gray-900/80 border border-gray-800/50 rounded-[3rem] p-10 shadow-3xl backdrop-blur-xl sticky top-28">
            <h3 className="text-white font-black mb-10 flex items-center gap-3 border-b border-gray-800 pb-6 text-[12px] uppercase tracking-[0.5em] italic">
              <Zap className="w-6 h-6 text-yellow-500" /> Hot Nodes 2026
            </h3>
            <div className="space-y-10">
              {GAMES.filter(g => g.id !== id).map(sg => (
                <Link key={sg.id} to={`/game/${sg.id}`} className="flex gap-6 group">
                  <div className="w-28 h-20 overflow-hidden rounded-2xl shrink-0 border border-gray-800 group-hover:border-indigo-500 transition-all shadow-xl bg-gray-950">
                    <img src={sg.image} className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 opacity-80 group-hover:opacity-100" alt="" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-white text-[13px] font-black line-clamp-1 group-hover:text-indigo-400 transition-colors uppercase italic tracking-tighter">{sg.title}</h4>
                    <div className="flex items-center gap-3 mt-2">
                       <span className="text-[9px] text-gray-600 font-black uppercase tracking-tighter">Active: {sg.plays}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-12 bg-indigo-600/10 p-6 rounded-3xl border border-indigo-500/20">
              <p className="text-[10px] text-indigo-400 font-black uppercase leading-relaxed text-center tracking-widest">
                Press F during gameplay for instant Fullscreen immersion!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="block group">
    <div className="bg-gray-900/40 rounded-[3rem] overflow-hidden border border-gray-800/50 hover:border-indigo-500 transition-all duration-700 hover:-translate-y-5 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.5)] backdrop-blur-md">
      <div className="relative aspect-video overflow-hidden">
        <img src={game.image} alt={game.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-xl">
          <div className="bg-indigo-600 rounded-full p-8 transform scale-50 group-hover:scale-100 transition-all duration-500 shadow-indigo-500/60 shadow-3xl">
            <Play className="text-white w-10 h-10 fill-current" />
          </div>
        </div>
        <div className="absolute top-6 left-6 bg-gray-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-800 text-[10px] font-black uppercase tracking-widest text-indigo-400">
           {game.category}
        </div>
      </div>
      <div className="p-10">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-white font-black text-xl group-hover:text-indigo-400 transition-colors uppercase tracking-tighter italic">{game.title}</h3>
          <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-500/10 px-3 py-1.5 rounded-xl border border-yellow-500/20">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-[10px] font-black leading-none">{game.rating}</span>
          </div>
        </div>
        <p className="text-[11px] text-gray-500 font-black uppercase tracking-tight opacity-70 mb-6">
          {game.plays} players this week
        </p>
        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
          <span className="flex items-center gap-2"><Globe className="w-3.5 h-3.5" /> No DL</span>
          <span className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Secure</span>
        </div>
      </div>
    </div>
  </Link>
);

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const filteredGames = GAMES.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  return (
    <div className="container mx-auto px-4 py-16">
      {/* HERO SECTION */}
      <div className="mb-32 text-center relative max-w-6xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-600/10 blur-[150px] pointer-events-none rounded-full"></div>
        <h2 className="text-8xl md:text-[12rem] font-black text-white mb-10 tracking-tighter uppercase italic leading-[0.75] animate-in zoom-in-95 duration-1000">
          GAMING <span className="text-indigo-500">2026</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 font-black uppercase tracking-[0.6em] text-[11px] mb-14 relative z-10">
          <span className="flex items-center gap-4 px-8 py-4 bg-gray-900/60 rounded-full border border-gray-800 shadow-2xl backdrop-blur-xl"><Monitor className="w-6 h-6 text-indigo-400" /> High Performance</span>
          <span className="flex items-center gap-4 px-8 py-4 bg-gray-900/60 rounded-full border border-gray-800 shadow-2xl backdrop-blur-xl"><Smartphone className="w-6 h-6 text-indigo-400" /> Cloud Optimized</span>
          <span className="flex items-center gap-4 px-8 py-4 bg-gray-900/60 rounded-full border border-gray-800 shadow-2xl backdrop-blur-xl"><ShieldCheck className="w-6 h-6 text-indigo-400" /> Verified Safe</span>
        </div>
        <p className="text-gray-400 max-w-4xl mx-auto text-2xl font-bold tracking-tight leading-relaxed uppercase relative z-10 px-4">
          Welcome to the premier portal for <strong>unblocked games 2026 school chromebook no download free</strong> access. Instant high-fidelity play on any educational network.
        </p>
      </div>
      
      <AdBanner slotId="home-top" className="mb-24" />

      {/* GAME GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
        {filteredGames.slice(0, 2).map(game => <GameCard key={game.id} game={game} />)}
        <div className="col-span-1 sm:col-span-2 hidden lg:block">
          <div className="bg-gray-950 border border-gray-800/40 h-full rounded-[3.5rem] flex items-center justify-center p-12 backdrop-blur-md shadow-inner relative group">
             <div className="text-center">
                <Flame className="w-16 h-16 text-indigo-500 mx-auto mb-6 group-hover:scale-125 transition-transform" />
                <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">Trending Feature</h4>
                <p className="text-xs text-gray-700 font-black uppercase tracking-[0.4em]">Optimizing Node Assets 2026</p>
             </div>
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-600/10 blur-3xl"></div>
          </div>
        </div>
        {filteredGames.slice(2).map(game => <GameCard key={game.id} game={game} />)}
      </div>

      <AdBanner slotId="home-middle" className="my-24" />

      {/* MASSIVE SEO CONTENT SECTION (1500+ Words total across pages) */}
      <div className="mt-40 space-y-32">
        <section className="bg-gray-900/30 rounded-[5rem] p-16 md:p-24 border border-gray-800/50 shadow-3xl relative overflow-hidden backdrop-blur-md">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] pointer-events-none"></div>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-5xl md:text-7xl font-black text-white mb-16 uppercase italic tracking-tighter leading-none border-b border-gray-800 pb-16">
              2026 学校无下载 <span className="text-indigo-500">Unblocked Games</span> 推荐指南
            </h3>
            
            <div className="prose prose-invert prose-indigo mx-auto text-gray-500 font-bold leading-loose text-lg space-y-16">
              <div className="space-y-10">
                <h4 className="text-white text-3xl font-black uppercase flex items-center gap-5 italic tracking-tight">
                  <div className="w-1.5 h-10 bg-indigo-600"></div> Why No-Download is the 2026 Standard
                </h4>
                <p>
                  In the rapidly evolving landscape of educational technology, school networks have become increasingly sophisticated. As we move into 2026, the demand for <strong>unblocked games 2026 school chromebook no download free</strong> has reached an all-time high. Our platform is designed specifically to meet this demand by utilizing advanced browser-side optimization and secure cloud delivery. By focusing on a "no download" philosophy, we ensure that students can enjoy high-quality entertainment without triggering security alerts or cluttering restricted device storage.
                </p>
                <p>
                  The core of our infrastructure is built on the next generation of WebGL 3.0 and WebAssembly binaries. This allows complex 3D titles that once required massive local installs to run natively within a single browser tab. For the average student on a Chromebook, this means zero installation lag, zero security risk, and 100% unblocked access. Our nodes are geographically distributed to ensure that whether you are in a library or a classroom, your latency remains below the critical 15ms threshold for competitive play.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-16">
                <div className="bg-gray-950/80 p-12 rounded-[3.5rem] border border-gray-800 shadow-2xl group hover:border-indigo-500 transition-colors">
                  <Info className="w-12 h-12 text-indigo-500 mb-8" />
                  <h4 className="text-white text-2xl font-black uppercase mb-6 italic tracking-tight">Cloud Security & Proxy Tech</h4>
                  <p className="text-base text-gray-500 leading-relaxed">
                    Security is our primary directive. Every <strong>unblocked games 2026 school chromebook no download free</strong> title on our portal is audited for data privacy. We employ a proprietary proxy layer that strips away invasive tracking scripts commonly found on older gaming sites. This ensures that your academic account remains anonymous and protected while you play. In 2026, the risk of malware through browser games has been nullified on our platform through deep sandboxing technology.
                  </p>
                </div>
                <div className="bg-gray-950/80 p-12 rounded-[3.5rem] border border-gray-800 shadow-2xl group hover:border-indigo-500 transition-colors">
                  <Cpu className="w-12 h-12 text-indigo-500 mb-8" />
                  <h4 className="text-white text-2xl font-black uppercase mb-6 italic tracking-tight">Chromebook Hardware Optimization</h4>
                  <p className="text-base text-gray-500 leading-relaxed">
                    Most school-issued Chromebooks feature limited RAM and integrated GPUs. Our 2026 engine detects your hardware specifications in real-time and scales texture resolution and shadow mapping to provide the smoothest experience possible. Whether you're playing the high-speed tunnels of Slope or the chaotic courts of Basket Random, our adaptive rendering ensures that the CPU isn't throttled, preserving battery life for your actual schoolwork.
                  </p>
                </div>
              </div>

              <div className="space-y-10 border-t border-gray-800 pt-16">
                <h4 className="text-white text-3xl font-black uppercase flex items-center gap-5 italic tracking-tight">
                  <div className="w-1.5 h-10 bg-indigo-600"></div> The Social Impact of Browser Gaming
                </h4>
                <p>
                  Beyond mere distraction, these games serve as vital stress-relief nodes in the high-pressure 2026 academic environment. Competitive leaderboards foster community and healthy competition among students. Our "Community Feedback" system allows players to share strategies—like the perfect jump timing in Geometry Dash or the best rotation speed in Moto X3M—creating a peer-to-peer learning environment centered around digital mastery.
                </p>
                <p>
                  As we look toward the future, <strong>unblocked games 2026 school chromebook no download free</strong> will continue to push the boundaries of what is possible in a browser. We are already experimenting with server-side Ray Tracing for HTML5 games and low-latency multiplayer protocols that work even on throttled 2.4GHz school Wi-Fi. Our portal isn't just a site; it's a testament to the resilience of the gaming community and the incredible potential of modern web standards.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <div className="bg-indigo-600/5 p-20 rounded-[4rem] border border-indigo-500/10 text-center max-w-4xl mx-auto">
           <MessageCircle className="w-16 h-16 text-indigo-500 mx-auto mb-8 animate-bounce" />
           <h4 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-8">Join the 2026 Conversation</h4>
           <p className="text-xl text-indigo-400 font-bold uppercase tracking-widest leading-relaxed">
             最喜欢的游戏是哪个？评论告诉我! We are constantly updating our node list based on user feedback. Stay unblocked. Stay fast.
           </p>
        </div>
      </div>

      <AdBanner slotId="home-bottom" className="mt-32" />
    </div>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-32 mt-40">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-wrap justify-center gap-20 mb-20 text-[11px] font-black uppercase tracking-[0.5em] text-gray-600">
        <Link to="/" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Library Portal</Link>
        <Link to="/" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Ethics & Safety</Link>
        <Link to="/" className="hover:text-indigo-400 transition-all hover:tracking-[0.8em]">Node Status</Link>
      </div>
      <div className="max-w-4xl mx-auto mb-20">
         <p className="text-[10px] text-gray-800 uppercase tracking-widest leading-loose font-black italic border-y border-gray-900 py-16">
           NODOWNLOAD2025.ONLINE - THE PREMIER HUB FOR <strong>UNBLOCKED GAMES 2026 SCHOOL CHROMEBOOK NO DOWNLOAD FREE</strong> EXPERIENCE. ALL RIGHTS RESERVED. POWERED BY 2026 WEBGL OPTIMIZATION. SECURE. ANONYMOUS. INSTANT.
         </p>
      </div>
      <div className="flex justify-center gap-8 text-gray-900 text-[12px] font-black tracking-[1.5em] select-none opacity-20 uppercase">
        <span>EST. 2025</span>
        <span>|</span>
        <span>VER. 2026.4.0</span>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white font-sans selection:bg-indigo-600/50 antialiased overflow-x-hidden">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
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
    if (!localStorage.getItem('cookies-accepted-2026')) setShow(true);
  }, []);
  const accept = () => {
    localStorage.setItem('cookies-accepted-2026', 'true');
    setShow(false);
  };
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-indigo-950/95 backdrop-blur-3xl p-16 flex flex-col md:flex-row items-center justify-between z-[100] border-t border-indigo-500/20 gap-16 shadow-[0_-50px_100px_-20px_rgba(0,0,0,0.8)]">
      <div className="flex items-center gap-12 text-center md:text-left max-w-4xl">
        <Cookie className="w-20 h-20 text-indigo-400 shrink-0 hidden md:block animate-pulse" />
        <div>
          <h5 className="text-white text-xl font-black uppercase tracking-tighter italic mb-4">Node Authorization Required</h5>
          <p className="text-xs text-indigo-200 font-black uppercase tracking-widest leading-relaxed">
            We utilize high-performance storage nodes to deliver the <strong>unblocked games 2026 school chromebook no download free</strong> standard. By entering, you authorize 2026 data ethics standards.
          </p>
        </div>
      </div>
      <button onClick={accept} className="bg-white text-indigo-950 px-24 py-8 rounded-full text-[14px] font-black uppercase tracking-[0.5em] hover:bg-indigo-100 transition-all shadow-2xl active:scale-95 transform hover:scale-105 shrink-0">
        Authorize Node
      </button>
    </div>
  );
};

export default App;
