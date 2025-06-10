
import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  description: string;
  type: 'image' | 'quote' | 'feature';
}

const EngagementCarousel = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  const slides: CarouselSlide[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=400&fit=crop",
      title: "Brain Training Games",
      description: "Challenge your mind with engaging cognitive exercises designed for seniors",
      type: 'image'
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=400&fit=crop",
      title: "Memory Enhancement Activities",
      description: "Strengthen your memory and cognitive abilities through fun interactive games",
      type: 'image'
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      title: "Wellness Webinars",
      description: "Join expert-led sessions on yoga, fitness, and healthy aging practices",
      type: 'image'
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=400&fit=crop",
      title: "Cognitive Health Tracking",
      description: "Monitor your mental wellness progress with our comprehensive scoring system",
      type: 'feature'
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop",
      title: "\"A sharp mind is the best tool for aging gracefully\"",
      description: "Keep your brain active and engaged for a fulfilling golden age",
      type: 'quote'
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        prevSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        nextSlide();
        break;
      case ' ':
        event.preventDefault();
        togglePlayPause();
        break;
    }
  };

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [isPlaying, isPaused, nextSlide]);

  const currentSlideData = slides[currentSlide];

  return (
    <div 
      className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg mb-6"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="Engagement activities carousel"
      aria-live="polite"
    >
      {/* Main carousel container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
                <div className="max-w-4xl">
                  {slide.type === 'quote' ? (
                    <blockquote className="text-lg md:text-xl lg:text-2xl font-semibold mb-2 italic">
                      {slide.title}
                    </blockquote>
                  ) : (
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold mb-2">
                      {slide.title}
                    </h3>
                  )}
                  <p className="text-sm md:text-base opacity-90 max-w-2xl">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Previous slide"
        tabIndex={0}
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Next slide"
        tabIndex={0}
      >
        <ChevronRight size={20} />
      </button>

      {/* Play/Pause button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-2 md:top-4 right-2 md:right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
        tabIndex={0}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            tabIndex={0}
          />
        ))}
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {currentSlide + 1} of {slides.length}: {currentSlideData.title}
      </div>
    </div>
  );
};

export default EngagementCarousel;
