"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NIKAH_TIME = new Date("2026-05-15T17:00:00+05:30").getTime();
const WALIMA_TIME = new Date("2026-05-17T17:00:00+05:30").getTime();

const fadeUp = {
 hidden: { opacity: 0, y: 20 },
 visible: {
   opacity: 1,
   y: 0,
   transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
 },
};

function GoldLine() {
 return (
   <div className="flex justify-center">
     <div className="w-16 h-px bg-[#D4AF37]/40" />
   </div>
 );
}
const slide =
 "h-[100dvh] w-full snap-start flex flex-col items-center justify-center px-4 sm:px-8 text-center";

const cornerClass = "w-12 h-12 sm:w-18 sm:h-18 md:w-20 md:h-20 opacity-60";


function Corners() {
 return (
   <>
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src="/corner.svg" alt="" className={`absolute top-4 left-4 sm:top-8 sm:left-8 ${cornerClass}`} />
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src="/corner.svg" alt="" className={`absolute top-4 right-4 sm:top-8 sm:right-8 ${cornerClass} -scale-x-100`} />
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src="/corner.svg" alt="" className={`absolute bottom-4 left-4 sm:bottom-8 sm:left-8 ${cornerClass} -scale-y-100`} />
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src="/corner.svg" alt="" className={`absolute bottom-4 right-4 sm:bottom-8 sm:right-8 ${cornerClass} scale-[-1]`} />
   </>
 );
}

function getTimeLeft(target: number) {
 const diff = Math.max(0, target - Date.now());
 return {
   days: Math.floor(diff / 86_400_000),
   hours: Math.floor((diff / 3_600_000) % 24),
   minutes: Math.floor((diff / 60_000) % 60),
   seconds: Math.floor((diff / 1_000) % 60),
 };
}

const emptySubscribe = () => () => {};

function Countdown() {
 const mounted = useSyncExternalStore(
   emptySubscribe,
   () => true,
   () => false,
 );

 const getPhase = useCallback(() => {
   const now = Date.now();
   if (now < NIKAH_TIME) return { label: "Until Nikah", target: NIKAH_TIME } as const;
   if (now < WALIMA_TIME) return { label: "Until Walima", target: WALIMA_TIME } as const;
   return null;
 }, []);

 const [phase, setPhase] = useState(getPhase);
 const [time, setTime] = useState(() => (phase ? getTimeLeft(phase.target) : null));

 useEffect(() => {
   const id = setInterval(() => {
     const p = getPhase();
     setPhase(p);
     setTime(p ? getTimeLeft(p.target) : null);
   }, 1000);
   return () => clearInterval(id);
 }, [getPhase]);

 if (!mounted) return null;

 const units = [
   { value: time?.days ?? 0, label: "Days" },
   { value: time?.hours ?? 0, label: "Hours" },
   { value: time?.minutes ?? 0, label: "Minutes" },
   { value: time?.seconds ?? 0, label: "Seconds" },
 ];

 return (
   <div className="flex flex-col items-center mt-4 sm:mt-10">
     {phase && time ? (
       <>
         <p className="font-[family-name:var(--font-inter)] text-xs sm:text-base tracking-[0.35em] uppercase text-[#D4AF37] mt-1 sm:mt-4">
           {phase.label}
         </p>


         <div className="flex items-start gap-4 sm:gap-10 mt-3 sm:mt-6">
           {units.map(({ value, label }) => (
             <div key={label} className="flex flex-col items-center">
               <span className="font-[family-name:var(--font-playfair)] text-4xl sm:text-6xl md:text-7xl font-normal text-[#1A3626] tabular-nums leading-none">
                 {String(value).padStart(2, "0")}
               </span>
               <span className="font-[family-name:var(--font-inter)] text-[0.6rem] sm:text-sm tracking-widest text-[#D4AF37] uppercase mt-1.5">
                 {label}
               </span>
             </div>
           ))}
         </div>
       </>
     ) : (
       <p className="font-[family-name:var(--font-playfair)] text-base sm:text-lg italic text-[#1A3626]/70 mt-4 leading-relaxed">
         The celebrations have concluded.
       </p>
     )}
   </div>
 );
}

export default function Home() {
 const [showSplash, setShowSplash] = useState(true);

 useEffect(() => {
   const timer = setTimeout(() => setShowSplash(false), 3000);
   return () => clearTimeout(timer);
 }, []);

 return (
   <>
     {/* ─── Splash ─── */}
     <AnimatePresence>
       {showSplash && (
         <motion.div
           key="splash"
           initial={{ y: 0 }}
           exit={{ y: "-100vh" }}
           transition={{
             duration: 1.2,
             ease: [0.22, 1, 0.36, 1] as const,
           }}
           className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAFAF7]"
         >
           <motion.p
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="font-[family-name:var(--font-amiri)] text-[#D4AF37] text-[1.75rem] sm:text-5xl md:text-6xl select-none px-6 leading-relaxed text-center max-w-[90vw]"
             dir="rtl"
             lang="ar"
           >
             بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
           </motion.p>
         </motion.div>
       )}
     </AnimatePresence>

     {/* ─── Snap-scroll container ─── */}
     <main className={`h-[100dvh] snap-y snap-mandatory scrollbar-hide ${showSplash ? "overflow-hidden" : "overflow-y-scroll"}`}>
       {/* ── 1. Hero ── */}
       <section className={`${slide} relative overflow-hidden`}>
         {/* Background image*/}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img src="/hero-bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
         {/* Ivory tint overlay */}
         <div className="absolute inset-0 bg-[#FAFAF7]/60" />

         <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.6 }}
           variants={fadeUp}
           className="relative z-10 flex flex-col items-center"
         >
           <p
             className="font-[family-name:var(--font-amiri)] text-[#1A3626] text-[1.4rem] sm:text-4xl md:text-5xl mb-6 sm:mb-16 leading-relaxed"
             dir="rtl"
             lang="ar"
           >
             بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
           </p>


           <h1 className="font-[family-name:var(--font-playfair)] text-[2rem] leading-[1.2] sm:text-6xl md:text-8xl font-normal tracking-tight leading-tight">
             Nadeem Akhtar Choudhury
             <span className="block text-[#1A3626] text-lg sm:text-3xl md:text-4xl font-[family-name:var(--font-playfair)] italic my-1.5 sm:my-4 md:my-6">
               &amp;
             </span>
             Sadaf Shabaz Khan
           </h1>

           <div className="mt-6 sm:mt-16 md:mt-20">
             {/* Horizontal ornament divider */}
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
               src="/ornament.svg?v=2"
               alt=""
               className="w-48 sm:w-80 md:w-96 mx-auto"
             />
           </div>
         </motion.div>
       </section>


       {/* ── 2. Countdown ── */}
       <section className={`${slide} relative`}>
         <Corners />
         <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.4 }}
           variants={fadeUp}
           className="flex flex-col items-center"
         >
           {/* Heart frame */}
           <div className="relative w-[85vw] h-[50vh] sm:w-[70vw] sm:h-[67vh] md:w-[50vw] md:h-[72vh] max-w-xl mx-auto">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img
               src="/heart.svg"
               alt=""
               className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 drop-shadow-[0_0_8px_rgba(212,175,55,0.3)]"
             />
           </div>


           <Countdown />
         </motion.div>
       </section>


       {/* ── 3. Quran Verse ── */}
       <section className={`${slide} relative`}>
         <Corners />
         <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.6 }}
           variants={fadeUp}
           className="max-w-2xl"
         >
           <GoldLine />


           <div
             className="font-[family-name:var(--font-amiri)] text-[1.35rem] leading-[1.8] sm:text-3xl md:text-4xl mt-4 sm:mt-16 text-[#1A3626] px-1 sm:px-2 space-y-3 sm:space-y-6"
             dir="rtl"
             lang="ar"
           >
             <p className="relative isolate">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا</p>
             <p className="relative isolate">لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً</p>
             <p className="relative isolate">ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ</p>
           </div>


           <p className="font-[family-name:var(--font-playfair)] text-sm sm:text-lg md:text-xl italic text-[#1A3626]/70 mt-3 sm:mt-10 leading-relaxed max-w-lg mx-auto px-1 sm:px-2">
             &ldquo;And among His signs is that He created for you mates from
             among yourselves, that you may dwell in tranquility with them, and
             He has put love and mercy between your hearts. Verily in that are
             signs for those who reflect.&rdquo;
           </p>


           <p className="font-[family-name:var(--font-inter)] text-[0.6rem] sm:text-sm tracking-[0.2em] uppercase text-[#D4AF37] mt-3 sm:mt-8">
             Surah Ar-Rum &middot; 30:21
           </p>
         </motion.div>
       </section>


       {/* ── 3. Events ── */}
       <section className={`${slide} relative`}>
         <Corners />
         <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.6 }}
           variants={fadeUp}
           className="w-full max-w-4xl"
         >
           <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-20 md:gap-0">
             {/* Nikah */}
             <div className="flex flex-col items-center text-center md:pr-10">
               <GoldLine />

               <p className="font-[family-name:var(--font-inter)] text-[0.6rem] sm:text-sm tracking-[0.35em] uppercase text-[#D4AF37] mt-3 sm:mt-8">
                 The Ceremony
               </p>

               <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-4xl md:text-5xl font-normal mt-1 sm:mt-3">
                 Nikah
               </h2>

               <div className="mt4 sm:mt-8 space-y-0.5 sm:space-y-1">
                 <p className="font-[family-name:var(--font-inter)] text-xs sm:text-base text-[#1A3626]/70">
                   Friday, 15th May 2026
                 </p>
                 <p className="font-[family-name:var(--font-inter)] text-[0.65rem] sm:text-sm text-[#1A3626]/50">
                   (27th Dhul-Qi&rsquo;dah, 1447 AH)
                 </p>
                 <p className="font-[family-name:var(--font-inter)] text-xs sm:text-base text-[#1A3626]/70 mt-1">
                   5:00 PM &ndash; 6:30 PM
                 </p>
               </div>

               <div className="mt-2 sm:mt-6 flex flex-col items-center">
                 <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                   <circle cx="12" cy="9" r="2.5" />
                 </svg>
                 <p className="font-[family-name:var(--font-playfair)] text-xs sm:text-lg text-[#1A3626] mt-1 sm:mt-2">
                   The Mount Riviera Hotel
                 </p>
                 <a
                   href="https://www.google.com/maps/search/?api=1&query=The+Mount+Riviera+Hotel+Triplicane+Chennai+600005"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-block mt-3 font-[family-name:var(--font-inter)] text-xs tracking-[0.2em] uppercase text-[#D4AF37] bg-[#1A3626]/80 border border-[#1A3626]/80 rounded-full px-4 py-1.5 transition-colors hover:bg-[#1A3626]/90"
                 >
                   Get Directions
                 </a>
               </div>
             </div>

             {/* Divider (desktop only) */}
             <div className="hidden md:flex items-stretch justify-center">
               <div className="w-px bg-[#D4AF37]/20" />
             </div>

             {/* Walima */}
             <div className="flex flex-col items-center text-center md:pl-10">
               <GoldLine />

               <p className="font-[family-name:var(--font-inter)] text-[0.6rem] sm:text-sm tracking-[0.35em] uppercase text-[#D4AF37] mt-3 sm:mt-8">
                 The Reception
               </p>

               <h2 className="font-[family-name:var(--font-playfair)] text-xl sm:text-4xl md:text-5xl font-normal mt-1 sm:mt-3">
                 Walima
               </h2>

               <div className="mt-4 sm:mt-8 space-y-0.5 sm:space-y-1">
                 <p className="font-[family-name:var(--font-inter)] text-xs sm:text-base text-[#1A3626]/70">
                   Sunday, 17th May 2026
                 </p>
                 <p className="font-[family-name:var(--font-inter)] text-[0.65rem] sm:text-sm text-[#1A3626]/50">
                   (29th Dhul-Qi&rsquo;dah, 1447 AH)
                 </p>
                 <p className="font-[family-name:var(--font-inter)] text-[0.6rem] sm:text-sm text-[#1A3626]/70 mt-1">
                   5:00 PM onwards
                 </p>
               </div>

               <div className="mt-2 sm:mt-6 flex flex-col items-center">
                 <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]/50" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                   <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Z" />
                   <circle cx="12" cy="9" r="2.5" />
                 </svg>
                 <p className="font-[family-name:var(--font-playfair)] text-xs sm:text-lg text-[#1A3626] mt-1 sm:mt-2">
                   Palmgrove Officers Institute
                 </p>
                 <a
                   href="https://www.google.com/maps/search/?api=1&query=Palmgrove+Officers+Institute+Island+Grounds+Chennai+600009"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-block mt-3 font-[family-name:var(--font-inter)] text-xs tracking-[0.2em] uppercase text-[#D4AF37] bg-[#1A3626]/80 border border-[#1A3626]/80 rounded-full px-4 py-1.5 transition-colors hover:bg-[#1A3626]/90"
                 >
                   Get Directions
                 </a>
               </div>
             </div>
           </div>
         </motion.div>
       </section>

       {/* ── 4. Footer ── */}
       <section className={`${slide} relative overflow-hidden`}>
         {/* Background image */}
         {/* eslint-disable-next-line @next/next/no-img-element */}
         <img src="/nikah.jpeg" alt="" className="absolute inset-0 w-full h-full object-cover" />
         {/* Ivory tint overlay */}
         <div className="absolute inset-0 bg-[#FAFAF7]/60" />

         <motion.div
           initial="hidden"
           whileInView="visible"
           viewport={{ once: false, amount: 0.6 }}
           variants={fadeUp}
           className="relative z-10 flex flex-col items-center justify-center text-center"
         >
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img
             src="/ornament.svg?v=2"
             alt=""
             className="w-48 sm:w-80 md:w-96 mb-4 sm:mb-8"
           />


           <p className="font-[family-name:var(--font-playfair)] text-xl sm:text-3xl md:text-4xl italic text-[#1A3626] leading-relaxed">
             We look forward to celebrating
             <br />
             with you.
           </p>


           <p className="font-[family-name:var(--font-playfair)] text-sm sm:text-lg md:text-xl tracking-[0.15em] sm:tracking-[0.2em] uppercase text-[#1A3626]/80 italic mt-5 sm:mt-12">
             Nadeem &amp; Sadaf
           </p>

           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img
             src="/ornament.svg?v=2"
             alt=""
             className="w-48 sm:w-80 md:w-96 mt-4 sm:mt-8"
           />
         </motion.div>
       </section>
     </main>
   </>
 );
}
