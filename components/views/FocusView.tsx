import React, { useEffect, useState, useRef } from 'react';
import { Icon } from '../ui/Icon';

export const FocusView: React.FC = () => {
  const DEFAULT_TIME = 25 * 60; // 25 minutes
  const [timeLeft, setTimeLeft] = useState(DEFAULT_TIME);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Force dark mode for this view
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Optional: Play sound or notify
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(DEFAULT_TIME);
  };
  const addTime = () => setTimeLeft(prev => prev + 5 * 60);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
      m: mins < 10 ? `0${mins}` : mins,
      s: secs < 10 ? `0${secs}` : secs
    };
  };

  const timeDisplay = formatTime(timeLeft);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      {/* Timer */}
      <div className="flex items-baseline justify-center gap-2 sm:gap-6 w-full mb-16 select-none">
        <div className="flex flex-col items-center group">
          <span className="text-[6rem] md:text-[10rem] font-display font-black leading-none tracking-tighter text-neutral-800 group-hover:text-white transition-colors">00</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest bg-white text-black px-2 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">Giờ</span>
        </div>
        <span className="text-[6rem] md:text-[8rem] font-black leading-none -translate-y-4 md:-translate-y-8">:</span>
        <div className="flex flex-col items-center relative">
          <span className="text-[6rem] md:text-[10rem] font-display font-black leading-none tracking-tighter relative z-10">{timeDisplay.m}</span>
          <div className="absolute -inset-x-4 bottom-4 h-1/3 bg-neo-lime/30 z-0"></div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest bg-neo-lime text-black border border-black px-2 py-0.5 z-10 mt-2">Phút</span>
        </div>
        <span className="text-[6rem] md:text-[8rem] font-black leading-none -translate-y-4 md:-translate-y-8">:</span>
        <div className="flex flex-col items-center group">
          <span className="text-[6rem] md:text-[10rem] font-display font-black leading-none tracking-tighter text-white transition-colors">{timeDisplay.s}</span>
          <span className="font-mono text-xs font-bold uppercase tracking-widest bg-white text-black px-2 py-0.5 opacity-100 transition-opacity">Giây</span>
        </div>
      </div>

      {/* Task Info */}
      <div className="flex flex-col items-center gap-8 max-w-4xl text-center mb-16">
         <div className="inline-flex items-center gap-3 px-4 py-2 border-2 border-white bg-neutral-900 shadow-[4px_4px_0px_0px_#ffffff]">
            <div className={`w-3 h-3 border border-black ${isActive ? 'bg-neo-lime animate-pulse' : 'bg-red-500'}`}></div>
            <span className="font-mono text-xs font-bold uppercase tracking-widest">{isActive ? 'ĐANG TẬP TRUNG' : 'ĐÃ TẠM DỪNG'}</span>
         </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center gap-6 pb-20">
         <button 
           onClick={resetTimer}
           className="w-16 h-16 border-2 border-white bg-neutral-900 hover:bg-neo-red hover:text-white hover:border-white transition-all shadow-[4px_4px_0px_0px_#ffffff] hover:shadow-[2px_2px_0px_0px_#ffffff] flex items-center justify-center group"
         >
            <Icon name="restart_alt" size={30} className="group-hover:-rotate-180 transition-transform duration-500" />
         </button>
         
         <div className="flex gap-4">
            <button 
               onClick={toggleTimer}
               className={`h-16 px-10 border-2 border-white font-bold text-lg uppercase flex items-center gap-3 shadow-[4px_4px_0px_0px_#ffffff] active:translate-y-1 active:shadow-none transition-all
                  ${isActive ? 'bg-white text-black hover:bg-neutral-200' : 'bg-neo-lime text-black hover:bg-lime-400'}
               `}
            >
               <Icon name={isActive ? 'pause' : 'play_arrow'} size={24} />
               {isActive ? 'Tạm dừng' : 'Bắt đầu'}
            </button>
         </div>

         <button 
           onClick={addTime}
           className="w-16 h-16 border-2 border-white bg-neutral-900 hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_#ffffff] flex items-center justify-center font-mono font-bold"
         >
            +5p
         </button>
      </div>
    </div>
  );
};