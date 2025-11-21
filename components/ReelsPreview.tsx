
import React, { useState, useEffect, useRef } from 'react';
import { PostData } from '../types';

// --- Ícones específicos para a UI do Reels ---
const BackIcon = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>;
const CameraIcon = () => <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ReelsHeartIcon = () => <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const ReelsCommentIcon = () => <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_429_11233)"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 12C3 13.4876 3.36093 14.891 4 16.1272L3 21L7.8728 20C9.10904 20.6391 10.5124 21 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></g><defs><clipPath id="clip0_429_11233"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>;
const ReelsShareIcon = () => <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.61109 12.4L10.8183 18.5355C11.0462 19.6939 12.6026 19.9244 13.1565 18.8818L19.0211 7.84263C19.248 7.41555 19.2006 6.94354 18.9737 6.58417M9.61109 12.4L5.22642 8.15534C4.41653 7.37131 4.97155 6 6.09877 6H17.9135C18.3758 6 18.7568 6.24061 18.9737 6.58417M9.61109 12.4L18.9737 6.58417" stroke="currentColor" strokeWidth="2"/></svg>;
const HomeIcon = () => <svg className="w-7 h-7 opacity-85" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const SearchIcon = () => <svg className="w-7 h-7 opacity-85" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const ReelsNavIcon = () => <svg className="w-7 h-7 opacity-85" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4z" /></svg>;
const AddIcon = () => <svg className="w-7 h-7 opacity-85" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>;

interface ReelsPreviewProps {
  postData: PostData;
}

export const ReelsPreview: React.FC<ReelsPreviewProps> = ({ postData }) => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const pressTimer = useRef<number | null>(null);

  // Progress Bar State
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (postData.files.length > 0 && postData.files[0].type.startsWith('video/')) {
      const url = URL.createObjectURL(postData.files[0]);
      setVideoUrl(url);
      
      // Reset state
      setCurrentTime(0);
      setDuration(0);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [postData.files]);

  // Video Event Handlers
  const handleTimeUpdate = () => {
    if (videoRef.current && !isDragging) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Video Interaction
  const handleMouseDown = () => {
    pressTimer.current = window.setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 200);
  };

  const handleMouseUpOrLeave = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
    if (videoRef.current && videoRef.current.paused && !isDragging) {
      videoRef.current.play();
    }
  };

  // Progress Bar Logic
  const updateProgress = (clientX: number) => {
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, x / width));
    const newTime = percentage * (videoRef.current.duration || 0);
    
    setCurrentTime(newTime);
    videoRef.current.currentTime = newTime;
  };

  const handleProgressBarMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation(); // Stop bubbling so video toggle doesn't trigger
    setIsDragging(true);
    if (videoRef.current) videoRef.current.pause();
    updateProgress(e.clientX);
  };

  // Global Drag Handling
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        updateProgress(e.clientX);
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (videoRef.current) videoRef.current.play();
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="w-[380px] h-[800px] bg-black rounded-[40px] border-2 border-zinc-800 overflow-hidden relative flex flex-col font-sans text-white shadow-2xl">
      {/* Video Content */}
      <div 
        className="absolute inset-0 z-0"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {videoUrl ? (
          <video
            ref={videoRef}
            key={videoUrl}
            src={videoUrl}
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
          />
        ) : (
          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
            <p className="text-zinc-500">Nenhum vídeo selecionado</p>
          </div>
        )}
      </div>

      {/* Overlay */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* Header */}
        <header className="flex justify-between items-center p-4 font-semibold text-lg bg-gradient-to-b from-black/50 to-transparent">
          <BackIcon />
          <span>Reels</span>
          <CameraIcon />
        </header>

        {/* Main content Spacer */}
        <div className="flex-1"></div>

        {/* Actions & Footer Wrapper */}
        <div className="flex flex-col bg-gradient-to-t from-black/90 via-black/40 to-transparent pb-2">
          <div className="flex items-end">
            {/* Footer (username, caption) */}
            <footer className="flex-1 p-4 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <img src={`https://picsum.photos/seed/${postData.username}/32/32`} alt="avatar" className="w-8 h-8 rounded-full border-2 border-white" />
                <span className="font-bold">{postData.username}</span>
                <span className="border border-white rounded-md px-2 py-0.5 text-xs font-semibold cursor-pointer pointer-events-auto">Seguir</span>
              </div>
              <p className="text-sm line-clamp-2">{postData.caption}</p>
            </footer>

            {/* Actions (Like, Comment, etc) */}
            <div className="flex flex-col items-center gap-6 text-sm text-white p-4">
              <div className="flex flex-col items-center gap-1 cursor-pointer pointer-events-auto">
                <ReelsHeartIcon />
                <span>{postData.likes}</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer pointer-events-auto">
                <ReelsCommentIcon />
                <span>{postData.comments}</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer pointer-events-auto">
                <ReelsShareIcon />
                <span>{postData.shares}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div 
             className="px-4 w-full h-6 flex items-center pointer-events-auto cursor-pointer group"
             onMouseDown={handleProgressBarMouseDown}
             ref={progressBarRef}
           >
              {/* Track */}
              <div className="relative w-full h-1 bg-white/30 rounded-full overflow-visible">
                {/* Progress Fill */}
                <div 
                   className="absolute top-0 left-0 h-full bg-white rounded-full" 
                   style={{ width: `${progressPercent}%` }} 
                />
                {/* Thumb - white ball */}
                <div 
                   className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg scale-100 transition-transform duration-75"
                   style={{ left: `calc(${progressPercent}% - 6px)` }}
                />
              </div>
           </div>
        </div>

        {/* Bottom Nav */}
        <nav className="flex justify-around items-center py-2.5 border-t border-zinc-800 bg-black pointer-events-auto">
          <HomeIcon />
          <SearchIcon />
          <ReelsNavIcon />
          <AddIcon />
          <img src={`https://picsum.photos/seed/${postData.username}/28/28`} alt="avatar" className="w-7 h-7 rounded-full border-2 border-zinc-400" />
        </nav>
      </div>

      {/* Bottom phone indicator */}
      <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[120px] h-1 bg-zinc-700 rounded-full z-20"></div>
    </div>
  );
};
