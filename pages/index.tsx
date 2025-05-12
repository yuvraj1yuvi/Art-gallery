'use client'
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Image from 'next/image';

export default function ArtGallery() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [currentTheme, setCurrentTheme] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<Artwork[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });
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
      tags: ['mountains', 'lake', 'sunrise'],
      price: 25000
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
      tags: ['forest', 'trees', 'sunlight'],
      price: 18000
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
      tags: ['ocean', 'waves', 'sunset'],
      price: 22000
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
      tags: ['desert', 'dunes', 'landscape'],
      price: 28000
    },
    // Replace AI-Generated artworks with Exhibition artworks
    {
      id: 5,
      title: 'Modern Masters',
      description: 'A curated collection of contemporary masterpieces from leading artists of our time.',
      artist: 'Contemporary Arts Museum',
      year: '2024',
      medium: 'Mixed Media',
      src: 'https://plus.unsplash.com/premium_photo-1675378165346-5f6c3959f0d2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'exhibitions',
      license: 'Free to use under Unsplash License',
      tags: ['contemporary', 'museum', 'curated'],
      price: 35000
    },
    {
      id: 6,
      title: 'Renaissance Revival',
      description: 'A special exhibition showcasing the influence of Renaissance art on modern digital creations.',
      artist: 'Heritage Arts Foundation',
      year: '2023',
      medium: 'Digital Exhibition',
      src: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1526&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'exhibitions',
      license: 'Free to use under Unsplash License',
      tags: ['renaissance', 'heritage', 'classical'],
      price: 42000
    },
    {
      id: 7,
      title: 'Avant-Garde Collection',
      description: 'An innovative exhibition featuring cutting-edge digital art installations and interactive pieces.',
      artist: 'Future Arts Institute',
      year: '2023',
      medium: 'Interactive Installation',
      src: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'exhibitions',
      license: 'Free to use under Unsplash License',
      tags: ['avant-garde', 'interactive', 'installation'],
      price: 38000
    },
    {
      id: 8,
      title: 'Cultural Fusion',
      description: 'A groundbreaking exhibition exploring the intersection of traditional and digital art forms.',
      artist: 'Global Arts Initiative',
      year: '2024',
      medium: 'Digital Exhibition',
      src: 'https://images.unsplash.com/photo-1581337204873-ef36aa186caa?q=80&w=1456&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'exhibitions',
      license: 'Free to use under Unsplash License',
      tags: ['cultural', 'fusion', 'global'],
      price: 45000
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
      tags: ['geometry', 'emotion', 'colorful'],
      price: 32000
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
      tags: ['fluid', 'color', 'movement'],
      price: 28000
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
      tags: ['cosmic', 'energy', 'brush'],
      price: 35000
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
      tags: ['urban', 'geometric', 'collage'],
      price: 30000
    },
    // Painting
    {
      id: 13,
      title: 'Watercolor Dreams',
      description: 'A delicate interplay of colors and textures in this contemporary watercolor masterpiece.',
      artist: 'Color Flow Studio',
      year: '2023',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1516&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'painting',
      license: 'Free to use under Unsplash License',
      tags: ['watercolor', 'contemporary', 'colorful'],
      price: 40000
    },
    {
      id: 14,
      title: 'Oil Impressions',
      description: 'Rich textures and bold strokes characterize this digital oil painting, capturing the essence of traditional techniques.',
      artist: 'Classic Arts Collective',
      year: '2024',
      medium: 'Digital Painting',
      src: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?q=80&w=1496&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'painting',
      license: 'Free to use under Unsplash License',
      tags: ['oil', 'traditional', 'texture'],
      price: 38000
    },
    // Sculpture
    {
      id: 15,
      title: 'Marble Harmony',
      description: 'A contemporary interpretation of classical sculpture, blending traditional techniques with modern aesthetics.',
      artist: 'Stone Works Studio',
      year: '2023',
      medium: 'Digital Sculpture',
      src: 'https://images.unsplash.com/photo-1637666505754-7416ebd70cbf?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'sculpture',
      license: 'Free to use under Unsplash License',
      tags: ['marble', 'classical', 'modern'],
      price: 42000
    },
    {
      id: 16,
      title: 'Bronze Evolution',
      description: 'Dynamic bronze sculpture capturing the essence of movement and transformation.',
      artist: 'Metal Arts Collective',
      year: '2024',
      medium: 'Digital Sculpture',
      src: 'https://images.unsplash.com/photo-1604854574894-1be73ca43cb8?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      theme: 'sculpture',
      license: 'Free to use under Unsplash License',
      tags: ['bronze', 'movement', 'dynamic'],
      price: 45000
    }
  ]);

  // All available themes
  const themes = [
    { id: 'all', name: 'All Artworks' },
    { id: 'nature', name: 'Nature' },
    { id: 'abstract', name: 'Abstract' },
    { id: 'painting', name: 'Painting' },
    { id: 'sculpture', name: 'Sculpture' },
    { id: 'exhibitions', name: 'Exhibitions' }
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
    price: number;
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
      case 'abstract': return 'bg-gradient-to-br from-yellow-50 to-orange-50';
      case 'painting': return 'bg-gradient-to-br from-rose-50 to-red-50';
      case 'sculpture': return 'bg-gradient-to-br from-stone-50 to-gray-50';
      case 'exhibitions': return 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50';
      default: return 'bg-white';
    }
  };

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'nature': return 'from-emerald-500 to-teal-600';
      case 'abstract': return 'from-amber-500 to-orange-600';
      case 'painting': return 'from-rose-500 to-red-600';
      case 'sculpture': return 'from-stone-500 to-gray-600';
      case 'exhibitions': return 'from-purple-500 via-pink-500 to-rose-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const addToCart = (artwork: Artwork) => {
    setCart(prevCart => [...prevCart, artwork]);
    // Show a small notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    notification.textContent = `${artwork.title} added to cart`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  };

  const removeFromCart = (artworkId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== artworkId));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setCheckoutStep(1);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setPaymentMethod(method);
    setCheckoutStep(3);
  };

  const handleOrderSubmit = () => {
    // Here you would typically send the order to your backend
    const orderData = {
      items: cart,
      total: getTotalPrice(),
      customer: orderDetails,
      paymentMethod,
      orderDate: new Date().toISOString()
    };
    
    console.log('Order submitted:', orderData);
    
    // Show success message and reset
    alert('Order placed successfully! Thank you for your purchase.');
    setCart([]);
    setIsCheckoutOpen(false);
    setCheckoutStep(1);
    setPaymentMethod('');
    setOrderDetails({
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({
      ...prev,
      [name]: value
    }));
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
        transition={{ delay: 1.8, duration: 0.5 }}
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
                    className={`px-3 py-1 rounded-full text-sm transition-all cursor-pointer ${
                      currentTheme === theme.id
                        ? theme.id === 'exhibitions'
                          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white shadow-lg transform hover:scale-105'
                          : `bg-gradient-to-r ${getThemeColor(theme.id)} text-white shadow-md`
                        : theme.id === 'exhibitions'
                          ? 'bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100 text-purple-700 hover:from-purple-200 hover:via-pink-200 hover:to-rose-200'
                          : 'hover:bg-gray-800 text-gray-300'
                      }`}
                  >
                    {theme.name}
                  </button>
                ))}
              </div>
              {/* Cart button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 rounded-full hover:bg-gray-800 transition cursor-pointer ml-2"
                aria-label="View cart"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>

              {/* Profile button */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="p-2 rounded-full hover:bg-gray-800 transition cursor-pointer ml-2"
                  aria-label="Profile menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>

                {/* Profile dropdown menu */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
                    >
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Welcome</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Sign in to your account</p>
                      </div>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        onClick={() => {
                          setIsProfileOpen(false);
                          // Add sign in logic here
                        }}
                      >
                        Sign In
                      </button>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        onClick={() => {
                          setIsProfileOpen(false);
                          // Add sign up logic here
                        }}
                      >
                        Create Account
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                        onClick={() => {
                          setIsProfileOpen(false);
                          // Add help center logic here
                        }}
                      >
                        Help Center
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          animate={isHovering ? { y: -10, rotate: -10 } : { y: 0, rotate: -5 }}
          transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop"
            alt="Nature preview"
            width={192}
            height={256}
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute top-1/4 right-1/4 w-52 h-56 rounded-lg overflow-hidden shadow-xl"
          animate={isHovering ? { y: 10, rotate: 10 } : { y: 0, rotate: 5 }}
          transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 100 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop"
            alt="AI art preview"
            width={208}
            height={224}
            className="w-full h-full object-cover"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute top-1/3 left-1/3 w-48 h-64 rounded-lg overflow-hidden shadow-xl"
          animate={isHovering ? { y: -8, rotate: -8 } : { y: 0, rotate: -3 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          <Image
            src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop"
            alt="Abstract preview"
            width={192}
            height={256}
            className="w-full h-full object-cover"
            priority
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
              onClick={() => navigateToTheme('exhibitions')}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-medium rounded-full hover:opacity-90 transition duration-200 shadow-lg cursor-pointer"
            >
              Discover Exhibitions
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
              className={`py-16 px-6 ${
                currentTheme === 'exhibitions'
                  ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50'
                  : getBackgroundPattern(currentTheme)
              } min-h-screen`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-7xl mx-auto">
                {searchQuery && (
                  <div className="mb-6 text-gray-700">
                    Showing results for &ldquo;{searchQuery}&rdquo; in {currentTheme === 'all' ? 'all categories' : currentTheme}
                  </div>
                )}

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-12 text-center ${
                    currentTheme === 'exhibitions' 
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent'
                      : currentTheme === 'nature'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent'
                      : currentTheme === 'abstract'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent'
                      : currentTheme === 'painting'
                      ? 'bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-transparent'
                      : currentTheme === 'sculpture'
                      ? 'bg-gradient-to-r from-stone-500 to-gray-600 bg-clip-text text-transparent'
                      : 'bg-gradient-to-r from-gray-500 to-gray-600 bg-clip-text text-transparent'
                  }`}
                >
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {currentTheme === 'all' ? 'All Artworks' :
                      currentTheme === 'nature' ? 'Nature\'s Masterpieces' :
                        currentTheme === 'exhibitions' ? 'Featured Exhibitions' :
                          currentTheme === 'abstract' ? 'Abstract Expressions' :
                            currentTheme === 'painting' ? 'Masterful Paintings' : 'Sculptural Forms'}
                  </h2>
                  <p className={`text-lg max-w-3xl mx-auto ${
                    currentTheme === 'exhibitions' 
                      ? 'text-purple-900'
                      : currentTheme === 'nature'
                      ? 'text-emerald-900'
                      : currentTheme === 'abstract'
                      ? 'text-amber-900'
                      : currentTheme === 'painting'
                      ? 'text-rose-900'
                      : currentTheme === 'sculpture'
                      ? 'text-stone-900'
                      : 'text-gray-900'
                  }`}>
                    {currentTheme === 'all' ? 'Explore our complete collection of digital artworks' :
                      currentTheme === 'nature' ? 'Discover the breathtaking beauty of the natural world' :
                        currentTheme === 'exhibitions' ? 'Experience our curated collection of special exhibitions showcasing the finest digital art from around the world' :
                          currentTheme === 'abstract' ? 'Journey through forms, colors, and emotions' :
                            currentTheme === 'painting' ? 'Discover the timeless art of painting in digital form' : 'Experience the timeless beauty of sculptural art'}
                  </p>
                </motion.div>

                {currentTheme === 'exhibitions' ? (
                  <div className="space-y-12">
                    {/* <div className="text-center mb-12">
                      <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-6">
                        Featured Exhibitions
                      </h2>
                      <p className="text-xl text-purple-900 max-w-3xl mx-auto">
                        Experience our curated collection of special exhibitions showcasing the finest digital art from around the world
                      </p>
                    </div> */}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {filteredArtworks.map((artwork, index) => (
                        <motion.div
                          key={artwork.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300"
                          onClick={() => handleArtworkClick(artwork)}
                        >
                          <div className="relative h-[400px] overflow-hidden">
                            <img
                              src={artwork.src}
                              alt={artwork.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>

                          <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                {artwork.medium}
                              </span>
                              <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm font-medium">
                                {artwork.year}
                              </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{artwork.title}</h3>
                            <p className="text-white/90 mb-4">{artwork.artist}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                {artwork.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-white/20 text-white rounded-full text-xs">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                              <span className="text-xl font-bold text-white">₹{artwork.price.toLocaleString()}</span>
                            </div>
                          </div>

                          <div className="absolute top-4 right-4">
                            <span className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-lg">
                              Featured Exhibition
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Exhibition Hours</h3>
                        <p className="text-gray-600">Open daily from 10 AM to 8 PM</p>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Guided Tours</h3>
                        <p className="text-gray-600">Expert-led tours available daily at 2 PM</p>
                      </div>

                      <div className="bg-white p-6 rounded-xl shadow-lg">
                        <div className="w-12 h-12 bg-rose-100 rounded-lg flex items-center justify-center mb-4">
                          <svg className="w-6 h-6 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Special Events</h3>
                        <p className="text-gray-600">Artist talks and workshops every weekend</p>
                      </div>
                    </div>
                  </div>
                ) : (
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
                          <Image
                            src={artwork.src}
                            alt={artwork.title}
                            width={400}
                            height={320}
                            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition duration-300 text-white">
                            <h3 className="text-xl font-semibold">{artwork.title}</h3>
                            <p className="text-sm opacity-90">by {artwork.artist}</p>
                            <div className="mt-2 flex gap-2">
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{artwork.year}</span>
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{artwork.medium}</span>
                              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">₹{artwork.price.toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover what art enthusiasts and collectors have to say about their experience with our gallery
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
                  alt="Sarah Johnson"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Art Collector</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "The digital art collection here is simply breathtaking. I've found pieces that perfectly complement my home's aesthetic. The quality and attention to detail are exceptional."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                  alt="Michael Chen"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Michael Chen</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Gallery Curator</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "As a curator, I'm impressed by the diverse range of digital artworks. The platform makes it easy to discover emerging artists and their unique perspectives."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-6">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                  alt="Emma Rodriguez"
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Emma Rodriguez</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Digital Artist</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                "The platform has given me incredible exposure. The quality of the artwork presentation and the professional service make it a pleasure to showcase my work here."
              </p>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Testimonial Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-300">Artworks Sold</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-300">Featured Artists</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.9/5</div>
              <div className="text-gray-600 dark:text-gray-300">Client Rating</div>
            </div>
          </div>
        </div>
      </section>

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
          <p>© {new Date().getFullYear()} Tridev Technologies. All artworks displayed are under their respective licenses.</p>
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
                  <Image
                    src={selectedArtwork.src}
                    alt={selectedArtwork.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-contain md:object-cover"
                    priority
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col h-full">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{selectedArtwork.title}</h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">{selectedArtwork.artist}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{selectedArtwork.year} • {selectedArtwork.medium}</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white mb-6">₹{selectedArtwork.price.toLocaleString()}</p>

                    <div className="prose dark:prose-invert max-w-none mb-8">
                      <p className="text-gray-700 dark:text-gray-300">{selectedArtwork.description}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex flex-wrap gap-2 mb-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${selectedArtwork.theme === 'nature' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' :
                          selectedArtwork.theme === 'exhibitions' ? 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400' :
                            selectedArtwork.theme === 'abstract' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                              selectedArtwork.theme === 'painting' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400' :
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
                      <button 
                        onClick={() => {
                          addToCart(selectedArtwork);
                          handleCloseModal();
                        }}
                        className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200 flex-1 text-center cursor-pointer"
                      >
                        Add to Cart
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

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h2>
                  <button
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-between mb-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        checkoutStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 3 && (
                        <div className={`w-16 h-1 ${
                          checkoutStep > step ? 'bg-purple-600' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Step 1: Order Summary */}
                {checkoutStep === 1 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <Image
                            src={item.src}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-500">by {item.artist}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">₹{item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Subtotal</span>
                        <span>₹{getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Shipping</span>
                        <span>Free</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{getTotalPrice().toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                      Continue to Shipping
                    </button>
                  </div>
                )}

                {/* Step 2: Shipping Information */}
                {checkoutStep === 2 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Full Name</label>
                          <input
                            type="text"
                            name="name"
                            value={orderDetails.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            name="email"
                            value={orderDetails.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={orderDetails.address}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={orderDetails.city}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">State</label>
                          <input
                            type="text"
                            name="state"
                            value={orderDetails.state}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">ZIP Code</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={orderDetails.zipCode}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={orderDetails.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                          required
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setCheckoutStep(1)}
                        className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={() => setCheckoutStep(3)}
                        className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                      >
                        Continue to Payment
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Payment */}
                {checkoutStep === 3 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => handlePaymentMethodSelect('card')}
                        className={`w-full p-4 border rounded-lg flex items-center gap-4 ${
                          paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <div className="text-left">
                          <h4 className="font-medium">Credit/Debit Card</h4>
                          <p className="text-sm text-gray-500">Pay securely with your card</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handlePaymentMethodSelect('upi')}
                        className={`w-full p-4 border rounded-lg flex items-center gap-4 ${
                          paymentMethod === 'upi' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <div className="text-left">
                          <h4 className="font-medium">UPI</h4>
                          <p className="text-sm text-gray-500">Pay using any UPI app</p>
                        </div>
                      </button>

                      <button
                        onClick={() => handlePaymentMethodSelect('netbanking')}
                        className={`w-full p-4 border rounded-lg flex items-center gap-4 ${
                          paymentMethod === 'netbanking' ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                        }`}
                      >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <div className="text-left">
                          <h4 className="font-medium">Net Banking</h4>
                          <p className="text-sm text-gray-500">Pay using your bank account</p>
                        </div>
                      </button>
                    </div>

                    <div className="flex gap-4 mt-6">
                      <button
                        onClick={() => setCheckoutStep(2)}
                        className="flex-1 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleOrderSubmit}
                        className="flex-1 bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
          >
            <motion.div
              className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="h-full flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Shopping Cart</h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      Your cart is empty
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <Image
                            src={item.src}
                            alt={item.title}
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium text-gray-900 dark:text-white">{item.title}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.artist}</p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">₹{item.price.toLocaleString()}</p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-gray-500 hover:text-red-500 transition"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">Total:</span>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">₹{getTotalPrice().toLocaleString()}</span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className={`w-full py-3 rounded-lg text-white font-medium transition ${
                      cart.length === 0
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-black hover:bg-gray-800'
                    }`}
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}