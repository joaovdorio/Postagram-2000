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

  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file));
    setMediaUrls(urls);

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [files]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? files.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === files.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  
  const aspectRatioClass = aspectRatio === '1:1' ? 'aspect-square' : 'aspect-[3/4]';

  if (mediaUrls.length === 0) {
    return <div className={`w-full bg-zinc-800 flex items-center justify-center ${aspectRatioClass}`}>No media</div>;
  }

  return (
    <div className={`relative w-full bg-black group overflow-hidden ${aspectRatioClass}`}>
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {mediaUrls.map((url, index) => {
          const file = files[index];
          return (
            <div key={url} className="w-full h-full flex-shrink-0 flex items-center justify-center">
              {file.type.startsWith('video/') ? (
                <video src={url} autoPlay loop muted playsInline className="w-full h-full object-contain" />
              ) : (
                <img src={url} alt={`slide ${index}`} className="w-full h-full object-contain" />
              )}
            </div>
          );
        })}
      </div>
      
      {/* Navigation */}
      {files.length > 1 && (
        <>
          <button 
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </button>
          <button 
            onClick={goToNext}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}

      {/* Dots */}
      {files.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
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