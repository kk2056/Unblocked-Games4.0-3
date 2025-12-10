import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Gamepad2, Search, ArrowLeft, Shield, Flame, Zap, Menu, X, Mail, AlertTriangle, RotateCcw, Play, Check, Cookie, Info } from 'lucide-react';

// --- TYPES ---
interface Game {
  id: string;
  title: string;
  category: 'Action' | 'Racing' | 'Puzzle' | 'Sports' | 'Simulation';
  image: string;
  url: string;
  description: string; // Short description for cards
  richContent: {       // Long description for AdSense SEO
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

// --- DATA: OPTIMIZED FOR ADSENSE CONTENT POLICIES ---
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
      gameplay: "Subway Surfers is the quintessential endless runner that defines the genre. Players take on the role of Jake, Tricky, or Fresh, graffiti artists who must escape from the grumpy Inspector and his dog. The core gameplay loop involves swiping up, down, left, and right to dodge oncoming trains, barriers, and obstacles while collecting coins. As the game progresses, the speed increases, requiring split-second reflexes and pattern recognition. The game utilizes a three-lane system which adds a layer of strategic depth to the movement mechanics.",
      strategies: "To master Subway Surfers in 2025, focus on staying on top of the trains rather than running on the tracks. This 'high-ground' strategy offers better visibility of upcoming obstacles. Always prioritize the Jetpack power-up as it pauses the difficulty curve while granting invincibility. Additionally, mastering the 'cancel jump' (swiping down immediately after jumping) is crucial for dodging low obstacles that appear directly after high barriers.",
      whyPopular: "Even in 2025, Subway Surfers remains a staple of unblocked gaming because of its vibrant, non-violent visual style and responsive controls. It is an excellent tool for improving hand-eye coordination and reaction time. Its accessibility on school Chromebooks without requiring high-end graphics hardware makes it the perfect break-time activity for students."
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
      gameplay: "Geometry Dash is a rhythm-based action platformer that tests your patience and timing. You control a geometric icon that moves automatically; your only input is to jump or fly to avoid spikes and walls. The game is unique because the obstacles are synchronized with the background music, creating a multisensory experience. Levels range from 'Stereo Madness' to 'Deadlocked', each introducing new mechanics like gravity flips, size changes, and dual mode.",
      strategies: "Success in Geometry Dash is about muscle memory and music synchronization. Do not rely solely on your eyes; listen to the beat of the soundtrack, as the jumps often align with the bass or melody. Use 'Practice Mode' to place checkpoints before difficult sections. A common pro tip is to look slightly ahead of your character rather than directly at it, allowing you to react to upcoming hazards faster.",
      whyPopular: "Geometry Dash is widely played in schools because it fosters resilience and a 'growth mindset'. Failure is instant, but restarts are immediate, encouraging players to try 'just one more time'. It is completely unblocked on most networks due to its lightweight HTML5 architecture, making it a favorite for 2025 browser gaming."
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
      gameplay: "Moto X3M combines motocross racing with physics-based puzzles. Players must navigate complex levels filled with explosives, spikes, and loop-the-loops. The goal isn't just to finish, but to finish fast to earn 3 stars. You control the bike's acceleration, braking, and tilt. Performing flips in mid-air deducts seconds from your final time, adding a risk-reward mechanic that is essential for high scores.",
      strategies: "The key to Moto X3M is managing your center of gravity. Lean back when landing on rear wheels to maintain momentum, and lean forward to climb steep hills. Don't be afraid to brake; sometimes slowing down allows a moving obstacle to pass safely. Memorize the level layout—knowing when a sudden drop is coming allows you to pre-rotate your bike for a perfect landing.",
      whyPopular: "This game is a physics sandbox disguised as a racer. It teaches players about momentum, gravity, and trajectory in a fun, engaging way. In 2025, Moto X3M remains one of the few high-quality racing games that run at 60FPS on standard educational hardware like Chromebooks, ensuring a lag-free experience."
    }
  },
  {
    id: 'retro-bowl',
    title: 'Retro Bowl',
    category: 'Sports',
    image: 'https://images.crazygames.com/games/retro-bowl/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/retro-bowl',
    description: 'The perfect mix of football management and retro-style gameplay.',
    rating: 4.8,
    plays: '9.2M',
    richContent: {
      gameplay: "Retro Bowl is a love letter to 8-bit football games, combining roster management with on-field action. As the head coach, you draft players, manage salary caps, and deal with press morale. During games, you take control of the offense, passing and running the ball to score touchdowns. The controls are simple 'drag and release' mechanics for passing, making it easy to learn but hard to master.",
      strategies: "Invest in your Quarterback and Wide Receivers first. A QB with high arm strength and accuracy can salvage broken plays. When managing the clock, learn to step out of bounds to stop time or dive to keep the clock running. Managing player stamina is crucial; rotate your running backs to prevent injuries later in the season.",
      whyPopular: "Retro Bowl has seen a resurgence in 2025 because it offers a deep simulation experience without the bloat of modern AAA titles. It respects the player's time, allowing for quick 5-minute matches during study breaks. Its text-based management elements also improve reading comprehension and resource management skills."
    }
  },
  {
    id: 'shell-shockers',
    title: 'Shell Shockers',
    category: 'Action',
    image: 'https://images.crazygames.com/games/shell-shockers/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/shell-shockers',
    description: 'The world\'s most popular egg-based multiplayer first-person shooter.',
    rating: 4.6,
    plays: '34.1M',
    richContent: {
      gameplay: "Shell Shockers is a multiplayer FPS where players control egg-shaped characters armed with guns. The premise is absurd but the gameplay is tight and competitive. There are different classes of eggs, such as the soldier (EggK-47) or the sniper (Crackshot). Damage is localized; shooting an enemy makes them crack until they scramble (die).",
      strategies: "Movement is life in Shell Shockers. Use the jump pads to gain high ground and make yourself a harder target. Since you are an egg, you have a small hitbox, so accuracy is paramount. Switching weapons to match the map range is vital—use shotguns for close-quarters maps and snipers for open arenas. Listen for the sound of cracking shells to locate nearby enemies.",
      whyPopular: "It is one of the few browser-based 3D shooters that supports private lobbies, making it perfect for groups of friends playing together online. The lack of gore (it's just eggs!) makes it school-safe while still delivering the adrenaline of a competitive shooter."
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
      gameplay: "Slope is the ultimate test of reflexes. You control a green ball rolling down an endless, procedurally generated neon city. The further you go, the faster the ball rolls. The track twists, turns, banks, and has gaps that you must jump. One mistake results in falling into the abyss. The aesthetic is inspired by Tron, with high-contrast neon green on black.",
      strategies: "Keep your eye on the horizon, not on the ball. Anticipating turns 2-3 seconds in advance is the only way to survive at high speeds. Stay in the middle of the track whenever possible to give yourself a margin of error for sudden turns. Use the red obstacles as visual markers for danger zones.",
      whyPopular: "Slope is popular in 2025 because it induces a 'flow state'. The high speed and requiring total concentration make it an excellent way to clear one's mind. It's built on Unity WebGL, ensuring smooth 3D graphics directly in the browser without plugins."
    }
  },
  {
    id: 'fireboy-watergirl',
    title: 'Fireboy & Watergirl',
    category: 'Puzzle',
    image: 'https://images.crazygames.com/games/fireboy-and-watergirl-the-forest-temple/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/fireboy-and-watergirl-the-forest-temple',
    description: 'Help Fireboy and Watergirl explore the Forest Temple. Solve puzzles together.',
    rating: 4.9,
    plays: '180M',
    richContent: {
      gameplay: "This cooperative puzzle platformer requires two characters to work in tandem. Fireboy can walk through lava but dies in water. Watergirl can walk through water but evaporates in lava. Both die in green toxic goo. Players must push buttons, pull levers, and coordinate movements to reach the exit doors simultaneously.",
      strategies: "Communication is key. If playing solo, treat it as a brain teaser for ambidexterity, controlling one character with WASD and the other with Arrows. Plan your route before moving; often, one character must hold a switch to let the other pass. Speed matters for the score, but survival is the priority.",
      whyPopular: "It remains the gold standard for local co-op browser games. It teaches logic, cooperation, and problem-solving. In 2025, it is frequently used in educational settings to promote teamwork among students."
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
      gameplay: "Basket Random takes basketball and adds a heavy dose of chaos. Physics are exaggerated, and controls are limited to a single button that makes your players jump and throw simultaneously. Each round changes the environment—sometimes you play in the snow, sometimes with a heavy ball, or with long arms.",
      strategies: "Timing is everything. Since you can't aim precisely, you must wait for your player's arm to be at the right angle before pressing jump. Use the chaotic physics to your advantage; sometimes blocking an opponent is more effective than trying to steal the ball. If the hoop is low, try to dunk!",
      whyPopular: "The unpredictability makes it hilarious and highly replayable. It's a 'ragdoll' physics game that is perfect for quick 2-player matches on a shared keyboard. Its simplicity means anyone can pick it up instantly."
    }
  },
  {
    id: 'tunnel-rush',
    title: 'Tunnel Rush',
    category: 'Action',
    image: 'https://images.crazygames.com/games/tunnel-rush/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/tunnel-rush',
    description: 'Dodge obstacles in a kaleidoscope of hazards in this 3D tunnel running game.',
    rating: 4.3,
    plays: '22.1M',
    richContent: {
      gameplay: "Tunnel Rush is a first-person avoidance game where you speed through a colorful, rotating tunnel. Obstacles spin and move, requiring you to rotate your perspective to find the gap. The game speeds up continuously, creating a psychedelic and intense visual experience.",
      strategies: "Memorize the patterns. The obstacles are not random; they follow specific geometric patterns. Small movements are better than large ones—don't oversteer or you will hit the wall. Focus on the center of the screen to spot the gaps in the distance before they arrive.",
      whyPopular: "Its high-contrast visuals and smooth framerate make it visually stunning on simple hardware. It is a pure test of visual processing speed and reaction time, popular among gamers who enjoy 'twitch' gameplay."
    }
  },
  {
    id: 'smash-karts',
    title: 'Smash Karts',
    category: 'Racing',
    image: 'https://images.crazygames.com/games/smash-karts/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/smash-karts',
    description: 'A 3D multiplayer kart battle game. Drive, shoot, and survive.',
    rating: 4.7,
    plays: '18.5M',
    richContent: {
      gameplay: "Smash Karts is essentially 'Mario Kart Battle Mode' in your browser. It's a 3D multiplayer arena battler where you drive karts, pick up mystery boxes containing weapons (rockets, machine guns, mines), and try to knock out other players. The rounds are fast-paced, lasting usually 3 minutes.",
      strategies: "Drifting is not just for style; it helps you make tight turns to escape incoming fire. Learn the map layouts to control the health pack spawns. Don't just drive aimlessly; predict where enemies are going and lay mines in choke points. Keep moving to avoid being an easy target for snipers.",
      whyPopular: "It brings the console-quality kart battle experience to the web without a download. The persistent leveling system allows players to unlock new characters and karts, providing a sense of progression that keeps players coming back."
    }
  },
  {
    id: 'temple-run-2',
    title: 'Temple Run 2',
    category: 'Action',
    image: 'https://images.crazygames.com/games/temple-run-2/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/temple-run-2',
    description: 'Navigate perilous cliffs, zip lines, mines and forests to escape with the idol.',
    rating: 4.5,
    plays: '40.2M',
    richContent: {
      gameplay: "The sequel to the game that defined mobile gaming. You steal a cursed idol and must outrun a giant demon monkey. The path is filled with broken bridges, fire traps, and waterfalls. New mechanics include minecart rides and zip lines that break up the running sections.",
      strategies: "Focus on collecting coins to upgrade your power-ups. The 'Coin Magnet' is the best early upgrade as it allows you to focus on survival while still gaining currency. When in the minecart, lean into the turns to avoid falling off. Save your gems to revive yourself only when you have a high score run going.",
      whyPopular: "It translates perfectly to the web. The graphics have been updated for 2025 standards, looking crisp on high-resolution monitors. It's a nostalgic trip for many but remains a solid, challenging game in its own right."
    }
  },
  {
    id: 'paper-io-2',
    title: 'Paper.io 2',
    category: 'Simulation',
    image: 'https://images.crazygames.com/games/paper-io-2/cover-16x9.png?auto=format,compress&q=75&cs=strip',
    url: 'https://www.crazygames.com/embed/paper-io-2',
    description: 'Conquer territory in this addictive multiplayer strategy game.',
    rating: 4.4,
    plays: '65.3M',
    richContent: {
      gameplay: "Paper.io 2 is about territory control. You control a block that leaves a trail. Enclosing an area adds it to your territory. However, if an enemy hits your trail while you are outside your safe zone, you die. The goal is to cover 100% of the map.",
      strategies: "Greed kills. Don't try to capture huge chunks of land at once; you are vulnerable for too long. Take small, safe bites of territory. Bait enemies into chasing you, then cut back to hit their trail. Defend your own territory aggressively; you are safe inside it.",
      whyPopular: "The simple risk-reward mechanic is incredibly addictive. It's a strategic game that requires planning but plays out in real-time action. It's unblocked and runs on any device, making it a universal hit."
    }
  }
];

// --- ADSENSE COMPONENTS ---

// Horizontal Banner (Leaderboard)
const AdBanner: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && window.adsbygoogle && adRef.current.innerHTML === "") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="w-full bg-[#1f2937] border-y border-gray-800 my-8 py-6 flex flex-col items-center justify-center min-h-[120px]">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Advertisement</div>
      <div className="overflow-hidden bg-gray-800 rounded w-full max-w-[728px] h-[90px] flex items-center justify-center relative shadow-sm">
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: '728px', height: '90px' }}
             data-ad-client="ca-pub-9774042341049510"
             data-ad-slot="1234567890" 
             ref={adRef}
        >
        </ins>
        <span className="absolute text-gray-700 text-xs pointer-events-none z-0">Ad Space</span>
      </div>
    </div>
  );
};

// Rectangular Ad (Sidebar/MREC)
const AdRectangle: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && window.adsbygoogle && adRef.current.innerHTML === "") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <div className="w-full bg-[#1f2937] border border-gray-700 rounded-xl p-6 flex flex-col items-center justify-center mb-8 shadow-md">
      <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2 font-semibold">Advertisement</div>
      <div className="overflow-hidden bg-gray-800 rounded w-[300px] h-[250px] flex items-center justify-center relative">
        <ins className="adsbygoogle"
             style={{ display: 'inline-block', width: '300px', height: '250px' }}
             data-ad-client="ca-pub-9774042341049510"
             data-ad-slot="0987654321" 
             ref={adRef}
        >
        </ins>
        <span className="absolute text-gray-700 text-xs pointer-events-none z-0">Ad Space</span>
      </div>
    </div>
  );
};

// Initialize AdSense Script
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

// --- COOKIE CONSENT (GDPR/CCPA Required for AdSense) ---
const CookieConsent: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (consent) setAccepted(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-md border-t border-gray-700 p-4 z-50 shadow-2xl animate-in slide-in-from-bottom-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-900/50 p-2 rounded-full">
            <Cookie className="w-6 h-6 text-indigo-400" />
          </div>
          <p className="text-sm text-gray-300 max-w-2xl">
            We use cookies to personalize content and ads, to provide social media features and to analyze our traffic. 
            We also share information about your use of our site with our social media, advertising and analytics partners.
            <Link to="/privacy" className="text-indigo-400 hover:underline ml-1">Learn more</Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={acceptCookies}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Header: React.FC<{ searchTerm: string; setSearchTerm: (s: string) => void }> = ({ searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#111827]/95 backdrop-blur-md border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-2.5 rounded-lg group-hover:from-indigo-500 group-hover:to-purple-600 transition-all shadow-lg shadow-indigo-500/20">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold leading-none text-white">Unblocked Games</h1>
              <span className="text-xs text-indigo-400 font-medium tracking-wide">NO DOWNLOAD 2025</span>
            </div>
          </Link>
          
          <div className="flex-1 max-w-lg hidden md:block relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-500" />
            </div>
            <input 
              type="text"
              placeholder="Search games..."
              className="w-full bg-gray-900/50 text-white border border-gray-700 rounded-lg py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-600 transition-all focus:bg-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg md:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link to="/about" className="hidden md:block text-sm font-medium text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors">About</Link>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900/95 backdrop-blur-xl absolute w-full left-0 animate-in slide-in-from-top-2">
          <div className="p-4 space-y-4">
            <input 
              type="text"
              placeholder="Search..."
              className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg py-3 px-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 font-medium">Home</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 font-medium">About</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 font-medium">Contact</Link>
              <Link to="/privacy" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 font-medium">Privacy</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-gray-950 border-t border-gray-900 py-10 mt-auto">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Gamepad2 className="text-indigo-500 w-5 h-5" />
            <span className="font-bold text-white">Unblocked Games 2025</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
            Play the best HTML5 games for free. Fully compatible with Chromebooks, PC, and Mobile.
            Experience lag-free gaming without downloads or plugins.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">Legal</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/privacy" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-900 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-gray-600 text-xs">© 2025 Unblocked Games Online. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const GameCard: React.FC<{ game: Game }> = ({ game }) => (
  <Link to={`/game/${game.id}`} className="group relative block h-full">
    <div className="h-full bg-gray-900 rounded-xl overflow-hidden ring-1 ring-gray-800 hover:ring-indigo-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden bg-gray-800">
        <img 
          src={game.image} 
          alt={game.title} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
          <div className="bg-indigo-600 rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform shadow-lg">
            <Play className="w-6 h-6 text-white fill-current ml-1" />
          </div>
        </div>
        <div className="absolute top-2 left-2">
          <span className="px-2 py-1 bg-black/70 backdrop-blur-md rounded-md text-[10px] font-bold text-white border border-white/10 uppercase tracking-wide">
            {game.category}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-bold text-base mb-1 truncate group-hover:text-indigo-400 transition-colors">{game.title}</h3>
        <p className="text-gray-500 text-xs line-clamp-2 mb-3 leading-relaxed flex-grow">{game.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-600 border-t border-gray-800 pt-3 mt-auto">
          <div className="flex items-center gap-1 text-yellow-500/90">
            <Flame className="w-3 h-3" />
            <span className="font-medium text-gray-400">{game.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-3 h-3" />
            <span>{game.plays}</span>
          </div>
        </div>
      </div>
    </div>
  </Link>
);

// --- PAGES ---

const Home: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'Action', 'Racing', 'Puzzle', 'Sports'];

  const filteredGames = GAMES.filter(g => {
    const matchesSearch = g.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          g.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || g.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <AdSenseScript />
      
      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' 
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredGames.length > 0 ? (
          filteredGames.map(game => <GameCard key={game.id} game={game} />)
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 mb-4">
              <Search className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No games found</h3>
            <p className="text-gray-500">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      <AdBanner />

      {/* SEO Content Block for AdSense */}
      <div className="mt-12 bg-[#1f2937] rounded-2xl p-6 md:p-10 border border-gray-700 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-6 border-b border-gray-600 pb-4">Play Unblocked Games No Download in 2025</h2>
        <div className="grid md:grid-cols-2 gap-8 text-gray-300 leading-relaxed text-sm md:text-base">
          <div>
            <h3 className="font-bold text-white mb-2 text-lg">Why Choose No Download Gaming?</h3>
            <p className="mb-4">
              In 2025, cloud gaming and HTML5 technologies have made downloading large game files obsolete for casual gaming. 
              Our platform leverages WebGL to deliver console-quality graphics directly in your browser. 
              This means zero install times, no storage space usage, and instant access to your favorite titles like 
              <em>Subway Surfers</em> and <em>Geometry Dash</em>.
            </p>
            <h3 className="font-bold text-white mb-2 text-lg">Optimized for Education & Work</h3>
            <p>
              We understand the frustration of blocked content. Our "Unblocked Games" library is specifically curated 
              to work through standard firewalls found in schools and libraries. We use obfuscated asset loading 
              to ensure your gameplay is uninterrupted, providing a safe haven for relaxation during your free time.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-2 text-lg">Safety and Privacy First</h3>
            <p className="mb-4">
              Unlike other free game sites, we prioritize user safety. All games are scanned for malware and 
              intrusive trackers. We respect your privacy (see our Privacy Policy) and provide a clean, 
              ad-supported environment that doesn't bombard you with pop-ups.
            </p>
            <h3 className="font-bold text-white mb-2 text-lg">The Best Games of 2025</h3>
            <p>
              Our collection is updated daily. Whether you are into high-speed racing in <em>Moto X3M</em>, 
              strategic puzzles in <em>Fireboy & Watergirl</em>, or competitive IO games like <em>Paper.io 2</em>, 
              we have something for everyone. Join millions of players enjoying the future of browser gaming.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const GamePlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setHasError(false);
  }, [id]);

  if (!game) return null;

  return (
    <div className="container mx-auto px-4 py-6">
      <AdSenseScript />
      
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => navigate('/')} 
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm text-gray-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Library
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Game Frame */}
          <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl ring-1 ring-gray-800 aspect-[16/9] group z-10">
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-10">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400 font-medium animate-pulse">Loading Game Data...</p>
              </div>
            )}
            {hasError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 z-20 text-center p-8">
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Connection Error</h3>
                <button 
                  onClick={() => { setHasError(false); setIsLoading(true); setKey(prev => prev + 1); }}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2 mt-4"
                >
                  <RotateCcw className="w-4 h-4" /> Retry
                </button>
              </div>
            )}
            <iframe
              key={key}
              src={game.url}
              title={game.title}
              className={`w-full h-full border-0 ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
              allowFullScreen
              allow="autoplay; gamepad; microphone; camera; gyroscope; accelerometer"
              sandbox="allow-forms allow-scripts allow-same-origin allow-pointer-lock allow-presentation"
              onLoad={() => setIsLoading(false)}
              onError={() => setHasError(true)}
            />
          </div>

          {/* Quick Stats Bar */}
          <div className="bg-[#1f2937] rounded-xl p-4 border border-gray-700 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{game.title}</h1>
              <p className="text-gray-400 text-sm mt-1">{game.category} • HTML5 • Browser</p>
            </div>
            <div className="flex gap-6">
               <div className="text-center">
                 <div className="text-lg font-bold text-indigo-400">{game.rating}</div>
                 <div className="text-[10px] text-gray-500 uppercase">Rating</div>
               </div>
               <div className="text-center">
                 <div className="text-lg font-bold text-green-400">{game.plays}</div>
                 <div className="text-[10px] text-gray-500 uppercase">Plays</div>
               </div>
            </div>
          </div>

          {/* RICH CONTENT FOR ADSENSE (Valuable Inventory) */}
          <div className="bg-[#1f2937] rounded-xl p-6 md:p-8 border border-gray-700 shadow-sm space-y-6">
             <section>
               <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                 <Gamepad2 className="w-5 h-5 text-indigo-500" /> Gameplay Overview
               </h2>
               <p className="text-gray-300 leading-relaxed">{game.richContent.gameplay}</p>
             </section>
             
             <section className="grid md:grid-cols-2 gap-8">
               <div>
                 <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                   <Zap className="w-5 h-5 text-yellow-500" /> Strategies for 2025
                 </h2>
                 <p className="text-gray-300 leading-relaxed">{game.richContent.strategies}</p>
               </div>
               <div>
                 <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                   <Flame className="w-5 h-5 text-orange-500" /> Why It's Popular
                 </h2>
                 <p className="text-gray-300 leading-relaxed">{game.richContent.whyPopular}</p>
               </div>
             </section>
             
             <section className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
               <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wide mb-2">Controls & Tips</h3>
               <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                 <li>Use <span className="text-white bg-gray-700 px-1 rounded">WASD</span> or <span className="text-white bg-gray-700 px-1 rounded">Arrow Keys</span> to move.</li>
                 <li>Press <span className="text-white bg-gray-700 px-1 rounded">Space</span> to jump or action.</li>
                 <li>Game optimized for Chrome OS (School Chromebooks).</li>
                 <li>If the game lags, try closing other browser tabs.</li>
               </ul>
             </section>
          </div>
          
          <AdBanner />
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-8">
          <AdRectangle />
          
          <div className="bg-[#1f2937] rounded-xl p-5 border border-gray-700 sticky top-24">
            <h3 className="font-bold text-white mb-4 flex items-center gap-2 text-sm uppercase tracking-wide border-b border-gray-600 pb-2">
              <Zap className="w-4 h-4 text-yellow-500" /> You May Also Like
            </h3>
            <div className="space-y-4">
              {GAMES.filter(g => g.category === game.category && g.id !== game.id).slice(0, 5).map(sidebarGame => (
                <Link key={sidebarGame.id} to={`/game/${sidebarGame.id}`} className="flex gap-3 group hover:bg-gray-800 p-2 -mx-2 rounded-lg transition-colors">
                  <div className="w-20 h-14 shrink-0 rounded overflow-hidden bg-gray-800 ring-1 ring-gray-700">
                    <img src={sidebarGame.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="overflow-hidden flex flex-col justify-center">
                    <h4 className="text-white text-sm font-medium truncate group-hover:text-indigo-400 transition-colors">{sidebarGame.title}</h4>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-orange-500" /> {sidebarGame.rating}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to="/" className="block mt-6 text-center text-sm text-indigo-400 hover:text-indigo-300 font-medium">
              View All Games
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const StaticPage: React.FC<{ type: 'about' | 'privacy' | 'contact' }> = ({ type }) => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <AdSenseScript />
      <div className="bg-[#1f2937] rounded-2xl p-8 md:p-12 border border-gray-700 shadow-xl">
        <h1 className="text-3xl font-bold text-white mb-8 capitalize border-b border-gray-700 pb-4">
          {type === 'about' ? 'About Us' : type === 'privacy' ? 'Privacy Policy' : 'Contact Support'}
        </h1>
        
        <div className="prose prose-invert prose-indigo max-w-none leading-relaxed">
          {type === 'about' && (
            <>
              <p className="text-lg text-gray-300">
                Welcome to <strong>Unblocked Games No Download 2025</strong>. We are a dedicated platform built by gamers, for gamers, ensuring that high-quality web entertainment is accessible to everyone, regardless of network restrictions.
              </p>
              <h3>Our Mission</h3>
              <p>
                In an era where digital safety and accessibility are paramount, we strive to provide a catalog of games that are:
              </p>
              <ul>
                <li><strong>Safe:</strong> Free from malware and intrusive tracking.</li>
                <li><strong>Accessible:</strong> Optimized for low-end devices like Chromebooks.</li>
                <li><strong>Instant:</strong> No downloads, no installs, no waiting.</li>
              </ul>
              <p>
                We believe that a quick 5-minute gaming break can improve focus and productivity. That's why we curate only the best HTML5 and WebGL titles that run smoothly in your browser.
              </p>
            </>
          )}

          {type === 'privacy' && (
            <div className="space-y-6 text-gray-300 text-sm">
              <div className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30 mb-6">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2"><Info className="w-4 h-4"/> Key Points</h4>
                <ul className="list-disc list-inside">
                  <li>We use cookies to personalize ads (via Google AdSense).</li>
                  <li>We do not sell your personal data.</li>
                  <li>You can request data deletion at any time.</li>
                </ul>
              </div>

              <section>
                <h3 className="text-white font-bold text-lg mb-2">1. Introduction</h3>
                <p>Unblocked Games 2025 ("we", "our") respects your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-lg mb-2">2. Information We Collect</h3>
                <p><strong>Log Data:</strong> Like most websites, we collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser version, pages of our Service that you visit, the time and date of your visit, and the time spent on those pages.</p>
                <p><strong>Cookies:</strong> Cookies are files with small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and stored on your computer's hard drive. We use "cookies" to collect information and to improve our Service.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-lg mb-2">3. Advertising (Google AdSense)</h3>
                <p>We use Google AdSense to display advertisements. Google uses cookies to serve ads based on your prior visits to our website or other websites. Google's use of advertising cookies enables it and its partners to serve ads to you based on your visit to our sites and/or other sites on the Internet.</p>
                <p>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-indigo-400 underline" target="_blank" rel="nofollow">Google Ad Settings</a>.</p>
              </section>

              <section>
                <h3 className="text-white font-bold text-lg mb-2">4. CCPA & GDPR Compliance</h3>
                <p>Under the CCPA (California) and GDPR (Europe), you have specific rights regarding your data. We have implemented a consent banner to ensure you have control over your data preferences. We do not sell personal information to third parties.</p>
              </section>
            </div>
          )}

          {type === 'contact' && (
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-400 mb-6">
                  If you are a game developer wanting to submit a game, or a user reporting a bug, please use the form below. We aim to respond to all inquiries within 48 hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-indigo-500" />
                    <span>contact@nodownload2025.online</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Shield className="w-5 h-5 text-indigo-500" />
                    <span>DMCA / Copyright Inquiries</span>
                  </div>
                </div>
              </div>
              <form className="space-y-4 not-prose bg-gray-800 p-6 rounded-xl border border-gray-700" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Your Email</label>
                  <input type="email" className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-indigo-500 outline-none transition-colors" placeholder="name@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Subject</label>
                  <select className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white focus:border-indigo-500 outline-none transition-colors">
                    <option>Report a Broken Game</option>
                    <option>Submit a Game</option>
                    <option>Advertising Inquiry</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Message</label>
                  <textarea className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white h-32 focus:border-indigo-500 outline-none transition-colors" placeholder="Describe your issue..."></textarea>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-indigo-500/20">
                  Send Message
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#030712] text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/game/:id" element={<GamePlayer />} />
          <Route path="/about" element={<StaticPage type="about" />} />
          <Route path="/privacy" element={<StaticPage type="privacy" />} />
          <Route path="/contact" element={<StaticPage type="contact" />} />
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <p className="text-gray-400 text-lg mb-8">The game you are looking for has moved or does not exist.</p>
              <Link to="/" className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors">
                Return to Home
              </Link>
            </div>
          } />
        </Routes>
      </main>

      <CookieConsent />
      <Footer />
    </div>
  );
};

export default App;