import React from "react";
import { motion } from "motion/react";
import { Leaf, ArrowRight, Shield, Zap, BarChart3 } from "lucide-react";

interface HeroSectionProps {
  onScan: () => void;
  onDashboard: () => void;
  onTestingGuide: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onScan, onDashboard, onTestingGuide }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundSize: "60px 60px",
          backgroundImage:
            "linear-gradient(to right, hsla(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(to bottom, hsla(var(--foreground) / 0.04) 1px, transparent 1px)",
          maskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Text */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm font-medium text-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                AI-Powered Crop Protection
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[0.9]"
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
            >
              <span className="text-foreground block">FARM</span>
              <span className="text-foreground block">GUARD{" "}</span>
              <span className="text-primary text-glow">AI</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Protect your crops with intelligent disease detection. Upload a photo,
              get instant diagnosis and treatment recommendations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <button
                onClick={onScan}
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-4 rounded-full font-bold text-base transition-all duration-300 shadow-[0_0_25px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_45px_-5px_hsl(var(--primary)/0.7)] hover:-translate-y-1 active:translate-y-0"
              >
                <Leaf className="w-5 h-5" />
                Scan Your Crop
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onDashboard}
                className="inline-flex items-center gap-2 glass text-foreground px-6 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-[hsla(220,15%,15%,0.6)] hover:-translate-y-1 active:translate-y-0"
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </button>

              <button
                onClick={onTestingGuide}
                className="inline-flex items-center gap-2 glass text-foreground px-6 py-4 rounded-full font-semibold transition-all duration-300 border border-primary/30 hover:bg-[hsla(220,15%,15%,0.6)] hover:-translate-y-1 active:translate-y-0"
              >
                <Zap className="w-5 h-5 text-primary" />
                Testing Guide
              </button>
            </motion.div>
          </div>

          {/* RIGHT — Stats Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Glow behind */}
            <div className="absolute -inset-4 bg-primary/8 rounded-3xl blur-2xl" />

            <div className="relative glass-strong rounded-3xl p-8 space-y-6 glass-glow">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">Real-Time Crop Analysis</h2>
                  <p className="text-sm text-muted-foreground">Powered by deep learning</p>
                </div>
              </div>

              {/* Accuracy bar */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Detection Accuracy</span>
                  <span className="text-primary font-bold text-lg">96%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: "0%" }}
                    animate={{ width: "96%" }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                  />
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-6">
                {[
                  { value: "14", label: "Crop Types" },
                  { value: "35+", label: "Diseases" },
                  { value: "<2s", label: "Scan Time" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  LIVE
                </span>
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground">
                  <Shield className="w-3 h-3" /> AI-POWERED
                </span>
                <span className="inline-flex items-center gap-1.5 glass rounded-full px-3 py-1.5 text-xs font-medium text-foreground">
                  <Zap className="w-3 h-3" /> FREE
                </span>
              </div>
            </div>

            {/* Feature mini-cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { icon: Shield, label: "Disease ID" },
                { icon: Zap, label: "Instant" },
                { icon: BarChart3, label: "Analytics" },
              ].map((f, i) => (
                <motion.div
                  key={f.label}
                  className="glass-strong rounded-xl p-4 flex flex-col items-center gap-2 text-center glass-glow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-foreground">{f.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <motion.div
            className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-1.5"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-1 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
