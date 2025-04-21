'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

export default function ArtGallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentTheme, setCurrentTheme] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Artwork collection with fixed image URLs
  const [artworks] = useState<Artwork[]>([
    // Nature
    {
      id: 1,
      title: 'Mountain Serenity',
      description: 'A breathtaking view of snow-capped mountains reflecting in a crystal-clear lake at sunrise.',
      artist: 'Elena Rivers',
      year: '2023',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop',
      theme: 'nature',
      license: 'Free to use under Unsplash License',
      tags: ['mountains', 'lake', 'sunrise']
    },
    {
      id: 2,
      title: 'Enchanted Forest',
      description: 'Sunlight filtering through ancient trees in a mystical forest.',
      artist: 'Wilderness Visuals',
      year: '2022',
      medium: 'Photography',
      src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop',
      theme: 'nature',
      license: 'Free to use under Unsplash License',
      tags: ['forest', 'trees', 'sunlight']
    },
    {
      id: 3,
      title: 'Ocean Majesty',
      description: 'Powerful ocean waves crashing against coastal cliffs at golden hour.',
      artist: 'Marine Visions',
      year: '2021',
      medium: 'Photography',
      src: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&auto=format&fit=crop',
      theme: 'nature',
      license: 'Free to use under Unsplash License',
      tags: ['ocean', 'waves', 'sunset']
    },
    {
      id: 4,
      title: 'Desert Mirage',
      description: 'Endless sand dunes under a vast sky in the golden desert.',
      artist: 'Nomad Arts',
      year: '2023',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop',
      theme: 'nature',
      license: 'Free to use under Unsplash License',
      tags: ['desert', 'dunes', 'landscape']
    },
    // AI-Generated
    {
      id: 5,
      title: 'Neural Dreams',
      description: 'An exploration of consciousness through AI-generated patterns inspired by neural networks.',
      artist: 'TechnoArtist',
      year: '2024',
      medium: 'AI Generation',
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
      theme: 'ai-generated',
      license: 'Free to use under Unsplash License',
      tags: ['neural', 'abstract', 'digital']
    },
    {
      id: 6,
      title: 'Digital Consciousness',
      description: 'A representation of artificial intelligence perceiving the world through digital senses.',
      artist: 'AI Visionary Collective',
      year: '2023',
      medium: 'AI Generation',
      src: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
      theme: 'ai-generated',
      license: 'Free to use under Unsplash License',
      tags: ['ai', 'digital', 'consciousness']
    },
    {
      id: 7,
      title: 'Algorithmic Harmony',
      description: 'Generative art created through machine learning algorithms interpreting musical patterns.',
      artist: 'SynthAI',
      year: '2023',
      medium: 'AI Generation',
      src: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop',
      theme: 'ai-generated',
      license: 'Free to use under Unsplash License',
      tags: ['algorithm', 'music', 'generative']
    },
    {
      id: 8,
      title: 'Cybernetic Dreams',
      description: 'Futuristic cityscape imagined by AI with glowing neon structures.',
      artist: 'Neon Future',
      year: '2024',
      medium: 'AI Generation',
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
      theme: 'ai-generated',
      license: 'Free to use under Unsplash License',
      tags: ['cyberpunk', 'futuristic', 'city']
    },
    // Abstract
    {
      id: 9,
      title: 'Emotional Geometry',
      description: 'Abstract shapes and colors representing the geometry of human emotions.',
      artist: 'Marcus Abstract',
      year: '2022',
      medium: 'Digital Art',
      src: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop',
      theme: 'abstract',
      license: 'Free to use under Unsplash License',
      tags: ['geometry', 'emotion', 'colorful']
    },
    {
      id: 10,
      title: 'Chromatic Flow',
      description: 'Fluid forms and vibrant colors blend together in this exploration of movement and form.',
      artist: 'Color Theory Studio',
      year: '2023',
      medium: 'Digital Art',
      src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop',
      theme: 'abstract',
      license: 'Free to use under Unsplash License',
      tags: ['fluid', 'color', 'movement']
    },
    {
      id: 11,
      title: 'Cosmic Vibrations',
      description: 'Energetic brush strokes representing the vibrations of the universe.',
      artist: 'Universal Arts',
      year: '2023',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop',
      theme: 'abstract',
      license: 'Free to use under Unsplash License',
      tags: ['cosmic', 'energy', 'brush']
    },
    {
      id: 12,
      title: 'Urban Fragments',
      description: 'Deconstructed cityscape blending geometric shapes with organic textures.',
      artist: 'Marcus Chen',
      year: '2022',
      medium: 'Digital Collage',
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop',
      theme: 'abstract',
      license: 'Free to use under Unsplash License',
      tags: ['urban', 'geometric', 'collage']
    },
    // Fantasy
    {
      id: 13,
      title: 'Dragon\'s Keep',
      description: 'Mythical castle floating among clouds guarded by ancient dragons.',
      artist: 'Fantasy Creations',
      year: '2023',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&auto=format&fit=crop',
      theme: 'fantasy',
      license: 'Free to use under Unsplash License',
      tags: ['fantasy', 'dragon', 'castle']
    },
    {
      id: 14,
      title: 'Elven Sanctuary',
      description: 'Ancient elven city hidden in the heart of an enchanted forest.',
      artist: 'Mythic Arts',
      year: '2024',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&auto=format&fit=crop',
      theme: 'fantasy',
      license: 'Free to use under Unsplash License',
      tags: ['fantasy', 'elf', 'forest']
    },
    // Surreal
    {
      id: 15,
      title: 'Dream Paradox',
      description: 'Surreal landscape where reality bends and folds upon itself.',
      artist: 'Dreamscape Studio',
      year: '2023',
      medium: 'Digital Art',
      src: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&auto=format&fit=crop',
      theme: 'surreal',
      license: 'Free to use under Unsplash License',
      tags: ['surreal', 'dream', 'paradox']
    },
    {
      id: 16,
      title: 'Floating Worlds',
      description: 'Islands suspended in the sky with waterfalls cascading into the void.',
      artist: 'Surreal Visions',
      year: '2024',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop',
      theme: 'surreal',
      license: 'Free to use under Unsplash License',
      tags: ['surreal', 'floating', 'islands']
    },
  ]);

  // All available themes
  const themes = [
    { id: 'all', name: 'All Artworks' },
    { id: 'nature', name: 'Nature' },
    { id: 'ai-generated', name: 'AI Art' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'surreal', name: 'Surreal' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Reduced loading time

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentTheme !== 'landing' && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentTheme]);

  interface Artwork {
    id: number;
    title: string;
    description: string;
    artist: string;
    year: string;
    medium: string;
    src: string;
    theme: string;
    license: string;
    tags: string[];
  }

  const handleArtworkClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    document.body.classList.add('overflow-hidden');
  };

  const handleCloseModal = () => {
    setSelectedArtwork(null);
    document.body.classList.remove('overflow-hidden');
  };

  const navigateToTheme = (theme: string) => {
    setCurrentTheme(theme);
    setSearchQuery('');
    setMobileMenuOpen(false);

    // Scroll to gallery section after a small delay to allow state update
    setTimeout(() => {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && selectedArtwork) {
      handleCloseModal();
    }
  };

  const filteredArtworks = artworks.filter(artwork => {
    const matchesTheme = currentTheme === 'all' || artwork.theme === currentTheme;
    const matchesSearch = searchQuery === '' ||
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTheme && matchesSearch;
  });

  const getBackgroundPattern = (theme: string) => {
    switch (theme) {
      case 'nature': return 'bg-gradient-to-br from-green-50 to-blue-50';
      case 'ai-generated': return 'bg-gradient-to-br from-purple-50 to-pink-50';
      case 'abstract': return 'bg-gradient-to-br from-yellow-50 to-orange-50';
      case 'fantasy': return 'bg-gradient-to-br from-indigo-50 to-blue-50';
      case 'surreal': return 'bg-gradient-to-br from-violet-50 to-purple-50';
      default: return 'bg-white';
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'nature': return 'from-emerald-500 to-teal-600';
      case 'ai-generated': return 'from-purple-500 to-fuchsia-600';
      case 'abstract': return 'from-amber-500 to-orange-600';
      case 'fantasy': return 'from-indigo-500 to-blue-600';
      case 'surreal': return 'from-violet-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 overflow-x-hidden" onKeyDown={handleKeyDown}>
      <Head>
        <title>Artistry Gallery | Digital Art Exhibition</title>
        <meta name="description" content="Explore stunning collections of digital artworks in our virtual gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Loading screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 bg-black flex justify-center items-center z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }} // Faster transition
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }} // Faster animation
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-light tracking-widest mb-4">
                ARTISTRY
              </div>
              <motion.div
                className="h-1 bg-gradient-to-r from-purple-400 to-pink-600"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.3 }} // Faster loading bar
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <motion.nav
        className="sticky top-0 bg-black/90 text-white p-4 z-50 backdrop-blur-md border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: isLoading ? -100 : 0 }}
        transition={{ delay: 1.8, duration: 0.5 }} // Adjusted delay
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div
            className="text-xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setCurrentTheme('landing');
            }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Artistry Gallery
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-full hover:bg-gray-800 transition cursor-pointer"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex space-x-2">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => navigateToTheme(theme.id)}
                    className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${currentTheme === theme.id ?
                        `bg-gradient-to-r ${getThemeColor(theme.id)} text-white shadow-md` :
                        'hover:bg-gray-800 text-gray-300'
                      }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden absolute left-4 right-4 mt-2 bg-gray-900 rounded-lg p-4 z-50 border border-gray-700 shadow-xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-2 gap-2">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => navigateToTheme(theme.id)}
                    className={`px-3 py-2 rounded-full text-sm transition-all text-left cursor-pointer ${currentTheme === theme.id ?
                        `bg-gradient-to-r ${getThemeColor(theme.id)} text-white shadow-md` :
                        'hover:bg-gray-800 text-gray-300'
                      }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Landing page */}
      <motion.div
        className="h-screen relative overflow-hidden flex flex-col justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Floating artwork previews */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-64 rounded-lg overflow-hidden shadow-xl"
          animate={isHovering ? { y: -10, rotate: -10 } : { y: 0, rotate: -5 }} // Tilted to the left
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        >
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop"
            alt="Nature preview"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-52 h-56 rounded-lg overflow-hidden shadow-xl"
          animate={isHovering ? { y: 10, rotate: 10 } : { y: 0, rotate: 5 }} // Tilted to the right
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
        >
          <img
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop"
            alt="AI art preview"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        <motion.div
          className="absolute top-1/3 left-1/3 w-48 h-64 rounded-lg overflow-hidden shadow-xl"
          animate={isHovering ? { y: -8, rotate: -8 } : { y: 0, rotate: -3 }} // Slightly tilted to the left
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <img
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop"
            alt="Abstract preview"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            <span className="text-white">DIGITAL</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"> GALLERY</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2, duration: 0.6 }}
          >
            Immerse yourself in curated collections of contemporary digital art
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <button
              onClick={() => navigateToTheme('nature')}
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium rounded-full hover:opacity-90 transition duration-200 shadow-lg cursor-pointer"
            >
              Explore Nature
            </button>
            <button
              onClick={() => navigateToTheme('ai-generated')}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-medium rounded-full hover:opacity-90 transition duration-200 shadow-lg cursor-pointer"
            >
              Discover AI Art
            </button>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-17 left-0 right-0 flex justify-center cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          onClick={() => navigateToTheme('nature')}
        >
          <motion.div
            className="flex flex-col items-center"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-sm text-gray-400 mb-2">Begin Exploration</span>
            <svg className="w-6 h-6 text-gray-400" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Gallery sections */}
      <div className="flex-1 flex flex-col" ref={scrollRef}>
        {/* Theme filter bar (below landing page) */}
        {currentTheme !== 'landing' && (

          <motion.div
            className="sticky top-16 z-30 bg-black shadow-sm border-b border-gray-800"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex items-center gap-3">
                {/* Theme filters container with scroll */}
                <div className="relative flex-1 min-w-0">
                  <div className="flex space-x-2 overflow-x-auto pb-3 -mb-3 scrollbar-hide">
                    {themes.map(theme => (
                      <button
                        key={theme.id}
                        onClick={() => navigateToTheme(theme.id)}
                        className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium flex-shrink-0 cursor-pointer ${currentTheme === theme.id ?
                            `bg-gradient-to-r ${getThemeColor(theme.id)} text-white shadow-md` :
                            'bg-gray-900 hover:bg-gray-800 text-gray-300'
                          }`}
                      >
                        {theme.name}
                      </button>
                    ))}
                  </div>
                  {/* Gradient fade for scrolling indication */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
                </div>

                {/* Search bar - always visible */}
                <div className="flex-shrink-0 w-40 sm:w-48 md:w-56">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="bg-gray-800 text-white rounded-full px-4 py-2 text-sm outline-none w-full focus:ring-2 focus:ring-purple-500"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Current theme section */}
        <AnimatePresence>
          {currentTheme !== 'landing' && (
            <motion.section
              className={`py-16 px-6 ${getBackgroundPattern(currentTheme)} min-h-screen`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }} // Faster transition
            >
              <div className="max-w-7xl mx-auto">
                {searchQuery && (
                  <div className="mb-6 text-gray-700">
                    Showing results for "{searchQuery}" in {currentTheme === 'all' ? 'all categories' : currentTheme}
                  </div>
                )}

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }} // Faster animation
                  className="mb-12 text-center"
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                    {currentTheme === 'all' ? 'All Artworks' :
                      currentTheme === 'nature' ? 'Nature\'s Masterpieces' :
                        currentTheme === 'ai-generated' ? 'AI Creations' :
                          currentTheme === 'abstract' ? 'Abstract Expressions' :
                            currentTheme === 'fantasy' ? 'Fantasy Worlds' : 'Surreal Visions'}
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    {currentTheme === 'all' ? 'Explore our complete collection of digital artworks' :
                      currentTheme === 'nature' ? 'Discover the breathtaking beauty of the natural world' :
                        currentTheme === 'ai-generated' ? 'Experience the frontier of artificial intelligence in art' :
                          currentTheme === 'abstract' ? 'Journey through forms, colors, and emotions' :
                            currentTheme === 'fantasy' ? 'Step into realms of imagination and myth' : 'Where reality bends and dreams take form'}
                  </p>
                </motion.div>

                {filteredArtworks.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredArtworks.map((artwork, index) => (
                      <motion.div
                        key={artwork.id}
                        className="group cursor-pointer"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }} // Faster staggered animation
                        onClick={() => handleArtworkClick(artwork)}
                        whileHover={{ y: -5 }}
                      >
                        <div className="relative overflow-hidden rounded-xl shadow-lg bg-white h-80">
                          <img
                            src={artwork.src}
                            alt={artwork.title}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105" // Smoother hover
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 text-white">
                            <h3 className="text-xl font-semibold">{artwork.title}</h3>
                            <p className="text-sm opacity-90">by {artwork.artist}</p>
                            <div className="mt-2 flex gap-2">
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{artwork.year}</span>
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{artwork.medium}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <h3 className="text-2xl text-gray-600 mb-4">No artworks found</h3>
                    <p className="text-gray-500">Try a different search term or browse another category</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Digital Art Gallery</h3>
            <p className="text-sm">Showcasing the finest digital artworks from emerging and established artists worldwide.</p>
          </div>
          <div>
            <h4 className="text-white mb-4">Collections</h4>
            <ul className="space-y-2">
              {themes.filter(t => t.id !== 'all').map(theme => (
                <li key={theme.id}>
                  <button
                    onClick={() => navigateToTheme(theme.id)}
                    className="hover:text-white transition cursor-pointer text-sm"
                  >
                    {theme.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">About</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition cursor-pointer text-sm">Our Mission</a></li>
              <li><a href="#" className="hover:text-white transition cursor-pointer text-sm">Artists</a></li>
              <li><a href="#" className="hover:text-white transition cursor-pointer text-sm">Exhibitions</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition cursor-pointer text-sm">Instagram</a>
              <a href="#" className="hover:text-white transition cursor-pointer text-sm">Twitter</a>
              <a href="#" className="hover:text-white transition cursor-pointer text-sm">Contact</a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-gray-800 text-center text-sm">
          <p>© {new Date().getFullYear()} Digital Art Gallery. All artworks displayed are under their respective licenses.</p>
        </div>
      </footer>

      {/* Lightbox modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 p-4 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl cursor-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }} // Snappier animation
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition duration-200 cursor-pointer"
                onClick={handleCloseModal}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-96 md:h-auto">
                  <img
                    src={selectedArtwork.src}
                    alt={selectedArtwork.title}
                    className="w-full h-full object-contain md:object-cover"
                    loading="eager"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{selectedArtwork.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">{selectedArtwork.artist}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{selectedArtwork.year} • {selectedArtwork.medium}</p>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                      <p className="text-gray-700 dark:text-gray-300">{selectedArtwork.description}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedArtwork.theme === 'nature' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          selectedArtwork.theme === 'ai-generated' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                            selectedArtwork.theme === 'abstract' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                              selectedArtwork.theme === 'fantasy' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' :
                                'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-400'
                        }`}>
                        {selectedArtwork.theme}
                      </span>
                      {selectedArtwork.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                          #{tag}
                        </span>
                      ))}
                      <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                        {selectedArtwork.license}
                      </span>
                    </div>

                    <div className="flex gap-4">
                      <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200 flex-1 text-center cursor-pointer">
                        Purchase Print
                      </button>
                      <button className="px-6 py-3 border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200 cursor-pointer">
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}