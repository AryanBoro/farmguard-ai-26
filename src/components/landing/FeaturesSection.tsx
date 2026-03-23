import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Leaf, Shield, Zap, Eye, Sprout, TreePine, Wheat, Apple, Flower2, CloudRain } from "lucide-react";

const PARTNERS = [
  { name: "AgriTech", icon: Sprout },
  { name: "CropSense", icon: Wheat },
  { name: "GreenField", icon: TreePine },
  { name: "HarvestAI", icon: Apple },
  { name: "FloraLab", icon: Flower2 },
  { name: "RainWatch", icon: CloudRain },
];

const FEATURES = [
  {
    icon: Eye,
    title: "Instant Detection",
    description: "Upload any crop photo and get disease identification in under 2 seconds using state-of-the-art deep learning models.",
  },
  {
    icon: Shield,
    title: "35+ Diseases Covered",
    description: "Our model is trained on 14 crop types and over 35 disease classes, covering the most common agricultural threats.",
  },
  {
    icon: Leaf,
    title: "Treatment Plans",
    description: "Receive actionable treatment recommendations including organic options, prevention strategies, and immediate actions.",
  },
  {
    icon: Zap,
    title: "Completely Free",
    description: "No subscriptions, no hidden fees. FarmGuard AI is free to use for every farmer, researcher, and student.",
  },
];

const FeaturesSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section header */}
        <div className="text-center space-y-4">
          <motion.p
            className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Why FarmGuard AI
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground tracking-tight"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Protecting Crops,{" "}
            <span className="text-primary text-glow">Globally</span>
          </motion.h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="glass-strong rounded-2xl p-8 space-y-4 glass-glow group hover:-translate-y-1 transition-transform duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Partners marquee */}
        <motion.div
          className="glass-strong rounded-2xl p-6 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground uppercase tracking-[0.15em] mb-4 text-center">
            Protecting Farms Worldwide 🌍
          </p>
          <div className="overflow-hidden">
            <div className="flex animate-marquee w-max">
              {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-8 py-2 opacity-50 hover:opacity-100 transition-opacity"
                >
                  <partner.icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground whitespace-nowrap font-medium">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
