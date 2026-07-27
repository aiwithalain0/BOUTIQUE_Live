'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Pause, Volume2, VolumeX, Sparkles, ShieldCheck, MessageCircle } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { useShop } from '@/context/ShopContext';
import { TextType } from '@/components/TextType';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [, setIsLoaded] = useState(false);
  const { setShopTheLookOpen } = useShop();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    setIsMuted(true);

    const playVideo = async () => {
      try {
        await video.play();
        setIsPlaying(true);
        setIsLoaded(true);
      } catch (error) {
        setIsPlaying(false);

        const handleUserInteraction = () => {
          if (videoRef.current) {
            videoRef.current
              .play()
              .then(() => {
                setIsPlaying(true);
                setIsLoaded(true);
              })
              .catch((e) => console.log('Playback error on touch:', e));
          }
          window.removeEventListener('click', handleUserInteraction);
          window.removeEventListener('touchstart', handleUserInteraction);
          window.removeEventListener('keydown', handleUserInteraction);
        };

        window.addEventListener('click', handleUserInteraction, { once: true });
        window.addEventListener('touchstart', handleUserInteraction, { once: true });
        window.addEventListener('keydown', handleUserInteraction, { once: true });
      }
    };

    playVideo();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#222831] pt-28 pb-12">
      {/* 1. Full-screen Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoaded(true)}
          style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
          className="absolute inset-0 w-full h-full filter brightness-90 transition-opacity duration-1000"
        >
          <source
            src="https://res.cloudinary.com/trxo3miy/video/upload/v1784974741/kling_20260725_VIDEO_A_real_act_4405_0_azixqg.mp4"
            type="video/mp4"
          />
        </video>

        {/* High-contrast gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-10" />
      </div>



      {/* 2. Hero Content Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full text-center lg:text-left my-auto py-12">
        <div className="max-w-3xl">
          <Reveal direction="left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EDE2]/90 backdrop-blur-md border border-[#C2D0C0] text-[#435B47] text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-xl">
              <span className="w-2.5 h-2.5 rounded-full bg-[#86A386] animate-ping" />
              <Sparkles className="w-4 h-4 text-[#435B47]" />
              <span>Haute Couture & Atelier 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-serif font-bold text-white leading-[1.08] tracking-tight mb-6 drop-shadow-lg">
              Handcrafted Heritage, <br />
              <span className="text-[#86A386] font-italic">
                <TextType
                  text={['Modern Silhouettes', 'Sustainable Silk', 'Bespoke Bridal Couture', 'Royal Ethnic Wear']}
                  typingSpeed={70}
                  pauseDuration={2500}
                  loop={true}
                />
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/95 leading-relaxed max-w-2xl mb-10 font-light drop-shadow">
              Discover bespoke bridal couture, embroidered jacket sets, and artisan apparel tailored for your most iconic moments.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link
                href="/collections"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-bold text-white bg-[#435B47] hover:bg-[#354938] transition-all duration-300 shadow-2xl hover:scale-105 border border-[#86A386]"
              >
                <Sparkles className="w-5 h-5 text-white" />
                <span>Explore Collections</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
              </Link>

              <button
                onClick={() => setShopTheLookOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-semibold text-[#222831] bg-[#F3EDE2]/90 hover:bg-[#F3EDE2] backdrop-blur-md transition-all duration-300 border border-[#C2D0C0] shadow-xl hover:scale-105"
              >
                <ShieldCheck className="w-5 h-5 text-[#435B47]" />
                <span>Shop The Look</span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom Connect Atelier Social Handles Bar */}
      <div className="relative z-20 w-full py-2.5 bg-black/60 backdrop-blur-md border-t border-white/10 mt-auto mb-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-white/90">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#86A386] animate-pulse" />
            <span className="tracking-widest uppercase text-[11px] text-[#86A386]">Connect Atelier:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-6">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#86A386] transition-colors pointer-events-auto">
              <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 flex items-center justify-center text-[10px] text-white font-bold shadow">IG</span>
              <span>@CotswoldAtelier</span>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#86A386] transition-colors pointer-events-auto">
              <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white font-bold shadow">FB</span>
              <span>/CotswoldCouture</span>
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#86A386] transition-colors pointer-events-auto">
              <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-[10px] text-white font-bold shadow">PT</span>
              <span>@CotswoldBridal</span>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#86A386] transition-colors pointer-events-auto">
              <span className="w-5 h-5 rounded-full bg-black border border-white/30 flex items-center justify-center text-[10px] text-white font-bold shadow">TK</span>
              <span>@CotswoldStyle</span>
            </a>
            <a href="https://wa.me/" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors pointer-events-auto">
              <span className="w-5 h-5 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow"><MessageCircle className="w-3 h-3" /></span>
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Bottom Controls Bar */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pt-4">
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3EDE2]/90 hover:bg-[#F3EDE2] backdrop-blur-md border border-[#C2D0C0] text-[#222831] text-xs font-medium transition-all shadow-lg"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#435B47]" />
                <span>Pause Video</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#435B47]" />
                <span>Play Video</span>
              </>
            )}
          </button>

          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            className="p-2 rounded-full bg-[#F3EDE2]/90 hover:bg-[#F3EDE2] backdrop-blur-md border border-[#C2D0C0] text-[#222831] transition-all shadow-lg"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#222831]/80" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#435B47]" />
            )}
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F3EDE2]/90 backdrop-blur-md border border-[#C2D0C0] text-[#222831] text-xs pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-[#86A386] animate-pulse" />
          <span>3D Atelier Stream Active</span>
        </div>
      </div>
    </section>
  );
}

