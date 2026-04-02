import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
    position: absolute; inset: 0; width: 100%; height: 100%;
    pointer-events: none; z-index: 50; opacity: 0.04; mix-blend-mode: overlay;
  }

  .bg-grid-farmguard {
    background-size: 60px 60px;
    background-image: 
      linear-gradient(to right, hsla(160, 80%, 45%, 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, hsla(160, 80%, 45%, 0.04) 1px, transparent 1px);
    mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
    color: hsl(180, 20%, 95%);
    text-shadow: 
      0 10px 30px hsla(160, 80%, 45%, 0.15),
      0 2px 4px hsla(180, 20%, 95%, 0.1);
  }

  .text-silver-matte {
    background: linear-gradient(180deg, hsl(180, 20%, 95%) 0%, hsla(180, 20%, 95%, 0.4) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: 
      drop-shadow(0px 10px 20px hsla(160, 80%, 45%, 0.12))
      drop-shadow(0px 2px 4px hsla(180, 20%, 95%, 0.08));
  }

  .text-card-silver-matte {
    background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transform: translateZ(0);
    filter: 
      drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
      drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .premium-depth-card {
    background: linear-gradient(145deg, #0D2818 0%, #0A101D 100%);
    box-shadow: 
      0 40px 100px -20px rgba(0,0,0,0.9),
      0 20px 40px -20px rgba(0,0,0,0.8),
      inset 0 1px 2px rgba(255,255,255,0.12),
      inset 0 -2px 4px rgba(0,0,0,0.8);
    border: 1px solid rgba(255,255,255,0.04);
    position: relative;
  }

  .card-sheen {
    position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
    background: radial-gradient(800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(34,197,94,0.06) 0%, transparent 40%);
    mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
    background-color: #111;
    box-shadow: 
      inset 0 0 0 2px #52525B,
      inset 0 0 0 7px #000,
      0 40px 80px -15px rgba(0,0,0,0.9),
      0 15px 25px -5px rgba(0,0,0,0.7);
    transform-style: preserve-3d;
  }

  .hardware-btn {
    background: linear-gradient(90deg, #404040 0%, #171717 100%);
    box-shadow: 
      -2px 0 5px rgba(0,0,0,0.8),
      inset -1px 0 1px rgba(255,255,255,0.15),
      inset 1px 0 2px rgba(0,0,0,0.8);
    border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
    background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
    background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
    box-shadow: 
      0 10px 20px rgba(0,0,0,0.3),
      inset 0 1px 1px rgba(255,255,255,0.05),
      inset 0 -1px 1px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.01) 100%);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    box-shadow: 
      0 0 0 1px rgba(255,255,255,0.1),
      0 25px 50px -12px rgba(0,0,0,0.8),
      inset 0 1px 1px rgba(255,255,255,0.2),
      inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light, .btn-modern-dark {
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
    background: linear-gradient(180deg, hsl(160, 80%, 50%) 0%, hsl(160, 80%, 40%) 100%);
    color: #0A101D;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), 0 0 30px -5px hsla(160,80%,45%,0.3), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.1);
  }
  .btn-modern-light:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), 0 0 45px -5px hsla(160,80%,45%,0.5), inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.1);
  }
  .btn-modern-light:active {
    transform: translateY(1px);
    box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.15);
  }
  .btn-modern-dark {
    background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
    color: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
    transform: translateY(-3px);
    background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
    box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
    transform: translateY(1px);
    background: #18181B;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9);
  }

  .progress-ring {
    transform: rotate(-90deg);
    transform-origin: center;
    stroke-dasharray: 402;
    stroke-dashoffset: 402;
    stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
  onScanClick?: () => void;
  onDashboardClick?: () => void;
}

export function CinematicHero({
  tagline1 = "Protect your crops,",
  tagline2 = "not just your hopes.",
  cardHeading = "Intelligence, in the field.",
  cardDescription = (
    <>
      FarmGuard AI uses deep learning to identify 35+ crop diseases across 14
      plant species in under 2 seconds — giving farmers instant, actionable
      treatment plans.
    </>
  ),
  metricValue = 96,
  metricLabel = "% Accuracy",
  ctaHeading = "Start scanning.",
  ctaDescription = "Upload any crop photo and get instant AI-powered disease detection, treatment recommendations, and prevention strategies.",
  onScanClick,
  onDashboardClick,
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(0);

  // Mouse interaction for card sheen & mockup 3D tilt
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (window.scrollY > window.innerHeight * 2) return;
      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(() => {
        if (mainCardRef.current && mockupRef.current) {
          const rect = mainCardRef.current.getBoundingClientRect();
          mainCardRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
          mainCardRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
          const xVal = (e.clientX / window.innerWidth - 0.5) * 2;
          const yVal = (e.clientY / window.innerHeight - 0.5) * 2;
          gsap.to(mockupRef.current, {
            rotationY: xVal * 12,
            rotationX: -yVal * 12,
            ease: "power3.out",
            duration: 1.2,
          });
        }
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // GSAP Cinematic Scroll Timeline
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    const ctx = gsap.context(() => {
      // Initial states
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget"], { autoAlpha: 0 });
      gsap.set(".cta-wrapper", { autoAlpha: 0, scale: 0.8, filter: "blur(30px)" });

      // Intro animation
      const introTl = gsap.timeline({ delay: 0.3 });
      introTl
        .to(".text-track", { duration: 1.8, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 1.4, clipPath: "inset(0 0% 0 0)", ease: "power4.inOut" }, "-=1.0");

      // Scroll timeline — shorter on mobile
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=4500" : "+=7000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      scrollTl
        // Fade hero text, bring card up
        .to([".hero-text-wrapper", ".bg-grid-farmguard"], { scale: 1.15, filter: "blur(20px)", opacity: 0.2, ease: "power2.inOut", duration: 2 }, 0)
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 2 }, 0)

        // Expand card to fullscreen
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 1.5 })

        // Bring in phone mockup with dramatic 3D entrance
        .fromTo(".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: isMobile ? 20 : 50, rotationY: isMobile ? -10 : -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 2.5 },
          "-=0.8"
        )

        // Phone widgets appear
        .fromTo(".phone-widget",
          { y: 40, autoAlpha: 0, scale: 0.95 },
          { y: 0, autoAlpha: 1, scale: 1, stagger: 0.15, ease: "back.out(1.2)", duration: 1.5 },
          "-=1.5"
        )

        // Animate progress ring & counter
        .to(".progress-ring", { strokeDashoffset: 60, duration: 2, ease: "power3.inOut" }, "-=1.2")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 2, ease: "expo.out" }, "-=2.0")

        // Floating badges fly in (skip on very small screens)
        .fromTo(".floating-badge",
          { y: 100, autoAlpha: 0, scale: 0.7, rotationZ: -10 },
          { y: 0, autoAlpha: isMobile ? 0 : 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 1.5, stagger: 0.2 },
          "-=2.0"
        )

        // Card text slides in
        .fromTo(".card-left-text", { x: isMobile ? 0 : -50, y: isMobile ? 30 : 0, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, ease: "power4.out", duration: 1.5 }, "-=1.5")
        .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.8 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 1.5 }, "<")

        // Pause to let user absorb
        .to({}, { duration: isMobile ? 1.5 : 2.5 })

        // Transition to CTA
        .set(".hero-text-wrapper", { autoAlpha: 0 })
        .set(".cta-wrapper", { autoAlpha: 1 })
        .to({}, { duration: 1.5 })

        // Fade out card content
        .to([".mockup-scroll-wrapper", ".floating-badge", ".card-left-text", ".card-right-text"], {
          scale: 0.9, y: -40, z: -200, autoAlpha: 0, ease: "power3.in", duration: 1.2, stagger: 0.05,
        })

        // Card shrinks back with CTA
        .to(".main-card", {
          width: isMobile ? "96vw" : isTablet ? "92vw" : "85vw",
          height: isMobile ? "96vh" : isTablet ? "92vh" : "85vh",
          borderRadius: isMobile ? "24px" : isTablet ? "32px" : "40px",
          ease: "expo.inOut",
          duration: 1.8,
        }, "pullback")
        .to(".cta-wrapper", { scale: 1, filter: "blur(0px)", ease: "expo.inOut", duration: 1.8 }, "pullback")

        // Card flies away
        .to(".main-card", { y: -window.innerHeight - 300, ease: "power3.in", duration: 1.5 });

    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div ref={containerRef} className={cn("relative h-screen overflow-hidden", className)} {...props}>
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />

      {/* Grid background */}
      <div className="bg-grid-farmguard absolute inset-0 z-0" />

      {/* Film grain texture */}
      <div className="film-grain" />

      {/* ===== HERO TEXT (fades on scroll) ===== */}
      <div className="hero-text-wrapper absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-2">
          {/* Brand badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2"
            style={{
              background: "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(34,197,94,0.02) 100%)",
              border: "1px solid rgba(34,197,94,0.15)",
              backdropFilter: "blur(12px)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "hsl(160,80%,45%)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "hsl(160,80%,45%)" }} />
            </span>
            <span className="text-sm font-semibold tracking-wide" style={{ color: "hsl(160,80%,45%)" }}>FARMGUARD AI</span>
          </div>

          <h1 className="text-track text-silver-matte text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85]">
            {tagline1}
          </h1>
          <h1 className="text-days text-silver-matte text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85]">
            {tagline2}
          </h1>
        </div>
      </div>

      {/* ===== MAIN CARD (slides up, expands, then flies away) ===== */}
      <div
        ref={mainCardRef}
        className="main-card premium-depth-card absolute bottom-0 left-1/2 -translate-x-1/2 z-20 overflow-hidden"
        style={{ width: "min(85vw, 96vw)", height: "min(85vh, 96vh)", borderRadius: "clamp(24px, 4vw, 40px)" }}
      >
        <div className="card-sheen" />

        {/* Card inner content */}
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1200px" }}>

          {/* LEFT TEXT — repositioned on mobile to bottom */}
          <div className="card-left-text absolute left-4 right-4 bottom-4 sm:bottom-auto sm:right-auto sm:left-6 md:left-12 sm:top-1/2 sm:-translate-y-1/2 z-30 max-w-xs sm:max-w-sm space-y-2 sm:space-y-4">
            <h2 className="text-card-silver-matte text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-[0.9]">
              {cardHeading}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base leading-relaxed max-w-[280px] hidden sm:block">
              {cardDescription}
            </p>
          </div>

          {/* PHONE MOCKUP */}
          <div className="mockup-scroll-wrapper relative z-20" ref={mockupRef}>
            <div className="iphone-bezel rounded-[50px] p-[8px] relative" style={{ width: "280px", height: "560px" }}>
              {/* Hardware buttons */}
              <div className="hardware-btn absolute right-[-4px] top-[120px] w-[4px] h-[70px] rounded-r-[2px]" />
              <div className="hardware-btn absolute right-[-4px] top-[200px] w-[4px] h-[40px] rounded-r-[2px]" />
              <div className="hardware-btn absolute left-[-4px] top-[160px] w-[4px] h-[55px] rounded-l-[2px]" />

              {/* Screen */}
              <div className="rounded-[42px] overflow-hidden relative w-full h-full" style={{ background: "linear-gradient(180deg, #0D1B0F 0%, #0A101D 100%)" }}>
                {/* Screen glare */}
                <div className="screen-glare absolute inset-0 z-40 rounded-[42px] pointer-events-none" />

                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[100px] h-[28px] bg-black rounded-full z-30" />

                {/* Status bar */}
                <div className="absolute top-4 left-8 right-8 flex justify-between items-center z-20">
                  <span className="text-[10px] text-white/60 font-semibold">9:41</span>
                  <div className="flex gap-1 items-center">
                    <div className="w-4 h-2 rounded-[1px] border border-white/40 relative">
                      <div className="absolute inset-[1px] right-[2px] rounded-[0.5px]" style={{ background: "hsl(160,80%,45%)" }} />
                    </div>
                  </div>
                </div>

                {/* App content */}
                <div className="absolute inset-0 pt-14 px-4 flex flex-col gap-3">
                  {/* Header widget */}
                  <div className="phone-widget widget-depth rounded-2xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsla(160,80%,45%,0.15)" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(160,80%,45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2.5 0 6c-1.5 3.5-3 4.5-3 4.5" />
                          <path d="M15.5 12.5c1-1 2.5-3 2.5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold">FarmGuard AI</p>
                        <p className="text-zinc-500 text-[10px]">Crop Scanner</p>
                      </div>
                    </div>
                    <p className="text-zinc-400 text-[10px] leading-relaxed">Upload a photo of your crop to detect diseases instantly.</p>
                  </div>

                  {/* Accuracy widget with ring */}
                  <div className="phone-widget widget-depth rounded-2xl p-4 flex items-center gap-4">
                    <div className="relative w-[72px] h-[72px] flex-shrink-0">
                      <svg width="72" height="72" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="64" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                        <circle className="progress-ring" cx="70" cy="70" r="64" fill="none" stroke="hsl(160,80%,45%)" strokeWidth="10" />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="counter-val text-white text-lg font-black">0</span>
                        <span className="text-zinc-500 text-[8px] font-medium">{metricLabel}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold">Detection Rate</p>
                      <p className="text-zinc-500 text-[10px]">14 crops • 35+ diseases</p>
                    </div>
                  </div>

                  {/* Scan result widget */}
                  <div className="phone-widget widget-depth rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">Latest Scan</p>
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "hsla(160,80%,45%,0.15)", color: "hsl(160,80%,45%)" }}>HEALTHY</span>
                    </div>
                    <p className="text-white text-sm font-bold">Tomato Plant</p>
                    <p className="text-zinc-500 text-[10px] mt-1">No diseases detected — 98.2% confidence</p>
                  </div>

                  {/* Disease alert widget */}
                  <div className="phone-widget widget-depth rounded-2xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-zinc-500 text-[10px] uppercase tracking-wider font-semibold">Alert</p>
                      <span className="text-[9px] px-2 py-0.5 rounded-full font-bold" style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444" }}>WARNING</span>
                    </div>
                    <p className="text-white text-sm font-bold">Apple Black Rot</p>
                    <p className="text-zinc-500 text-[10px] mt-1">Severity: Moderate — Treatment available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT TEXT */}
          <div className="card-right-text absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-30 hidden md:block max-w-xs space-y-6">
            <div className="space-y-2">
              <p className="text-zinc-500 text-xs uppercase tracking-widest font-semibold">Powered by</p>
              <p className="text-white text-lg font-bold">Deep Learning</p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Trained on thousands of crop images with state-of-the-art convolutional neural networks.
              </p>
            </div>
            <div className="flex gap-3">
              {["14 Crops", "35+ Diseases", "<2s Scan"].map((t) => (
                <span key={t} className="text-[10px] px-3 py-1.5 rounded-full font-semibold" style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "hsl(160,80%,45%)",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* FLOATING BADGES */}
          <div className="floating-badge floating-ui-badge absolute top-8 right-8 sm:top-12 sm:right-16 z-30 rounded-2xl px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsla(160,80%,45%,0.15)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(160,80%,45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div>
              <p className="text-white text-xs font-bold">Live Analysis</p>
              <p className="text-zinc-500 text-[10px]">Real-time detection</p>
            </div>
          </div>

          <div className="floating-badge floating-ui-badge absolute bottom-8 left-8 sm:bottom-12 sm:left-16 z-30 rounded-2xl px-5 py-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsla(160,80%,45%,0.15)" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="hsl(160,80%,45%)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <p className="text-white text-xs font-bold">100% Free</p>
              <p className="text-zinc-500 text-[10px]">No hidden fees</p>
            </div>
          </div>

          {/* CTA WRAPPER (appears after card content fades) */}
          <div className="cta-wrapper absolute inset-0 z-40 flex flex-col items-center justify-center px-6 text-center">
            <h2 className="text-card-silver-matte text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.85] mb-6">
              {ctaHeading}
            </h2>
            <p className="text-zinc-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10">
              {ctaDescription}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="btn-modern-light rounded-full px-8 py-4 text-base font-bold flex items-center gap-2" onClick={onScanClick}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 17 3.5s1.5 2.5 0 6c-1.5 3.5-3 4.5-3 4.5" />
                  <path d="M15.5 12.5c1-1 2.5-3 2.5-5" />
                </svg>
                Scan Your Crop
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="btn-modern-dark rounded-full px-8 py-4 text-base font-bold flex items-center gap-2" onClick={onDashboardClick}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                View Dashboard
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default CinematicHero;
