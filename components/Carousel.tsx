import React, { useState, useEffect } from 'react';
import { AspectRatio } from '../types';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CarouselProps {
  files: File[];
  aspectRatio: AspectRatio;
}

export const Carousel: React.FC<CarouselProps> = ({ files, aspectRatio }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mediaUrls, setMediaUrls] = useState<string[]>([]);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    // Reset index when files change to avoid out of bounds
    setCurrentIndex(0);
    
    const urls = files.map(file => URL.createObjectURL(file));
    setMediaUrls(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < files.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStartPos(e.clientX);
    setDragOffset(0);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragOffset(e.clientX - dragStartPos);
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50; // User must drag at least 50px to trigger a slide change
    if (dragOffset < -threshold) {
      goToNext();
    } else if (dragOffset > threshold) {
      goToPrevious();
    }
    
    setDragOffset(0); // Reset offset to snap back or to the new slide
  };

  const aspectRatioClass = aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[3/4]';
  const mediaObjectClass = aspectRatio === '1:1' ? 'object-cover' : 'object-contain';
  
  const sliderStyle = {
    transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
    transition: isDragging ? 'none' : 'transform 0.5s ease-in-out',
  };

  if (mediaUrls.length === 0) {
    return <div className={`w-full bg-zinc-800 flex items-center justify-center ${aspectRatioClass}`}>No media</div>;
  }

  return (
    <div 
      className={`relative w-full bg-black group overflow-hidden ${aspectRatioClass}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      <div 
        className="flex h-full"
        style={sliderStyle}
      >
        {mediaUrls.map((url, index) => {
          const file = files[index];
          return (
            <div key={url} className="w-full h-full flex-shrink-0 flex items-center justify-center select-none">
              {file.type.startsWith('video/') ? (
                <video src={url} autoPlay loop muted playsInline className={`w-full h-full ${mediaObjectClass}`} draggable="false" />
              ) : (
                <img src={url} alt={`slide ${index}`} className={`w-full h-full ${mediaObjectClass}`} draggable="false" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Navigation */}
      {files.length > 1 && (
        <>
          {currentIndex > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon />
            </button>
          )}
          {currentIndex < files.length - 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              onMouseDown={(e) => e.stopPropagation()}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
              aria-label="Next slide"
            >
              <ChevronRightIcon />
            </button>
          )}
        </>
      )}

      {/* Dots */}
      {files.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {files.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                currentIndex === index ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
