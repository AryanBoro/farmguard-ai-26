import React, { useRef, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { Download, ArrowRight, Leaf } from "lucide-react";

import appleBlackRot from "@/assets/samples/apple-black-rot.webp";
import healthyStrawberry from "@/assets/samples/healthy-strawberry.webp";
import pepperBacterialSpot from "@/assets/samples/pepper-bacterial-spot.webp";
import potatoEarlyBlight from "@/assets/samples/potato-early-blight.webp";
import squashPowderyMildew from "@/assets/samples/squash-powdery-mildew.webp";
import strawberryLeafScorch from "@/assets/samples/strawberry-leaf-scorch.webp";
import tomatoHealthy from "@/assets/samples/tomato-healthy.webp";

const SAMPLE_IMAGES = [
  { src: appleBlackRot, label: "Apple Black Rot", crop: "Apple" },
  { src: healthyStrawberry, label: "Healthy Strawberry", crop: "Strawberry" },
  { src: pepperBacterialSpot, label: "Pepper Bacterial Spot", crop: "Pepper" },
  { src: potatoEarlyBlight, label: "Potato Early Blight", crop: "Potato" },
  { src: squashPowderyMildew, label: "Squash Powdery Mildew", crop: "Squash" },
  { src: strawberryLeafScorch, label: "Strawberry Leaf Scorch", crop: "Strawberry" },
  { src: tomatoHealthy, label: "Tomato Healthy", crop: "Tomato" },
];

const CROP_DATA = [
  { name: "Apple", diseases: ["Apple Scab", "Black Rot", "Cedar Apple Rust", "Healthy"] },
  { name: "Blueberry", diseases: ["Healthy"] },
  { name: "Cherry", diseases: ["Powdery Mildew", "Healthy"] },
  { name: "Corn (Maize)", diseases: ["Cercospora Leaf Spot", "Common Rust", "Northern Leaf Blight", "Healthy"] },
  { name: "Grape", diseases: ["Black Rot", "Esca (Black Measles)", "Leaf Blight", "Healthy"] },
  { name: "Orange", diseases: ["Haunglongbing (Citrus Greening)"] },
  { name: "Peach", diseases: ["Bacterial Spot", "Healthy"] },
  { name: "Pepper (Bell)", diseases: ["Bacterial Spot", "Healthy"] },
  { name: "Potato", diseases: ["Early Blight", "Late Blight", "Healthy"] },
  { name: "Raspberry", diseases: ["Healthy"] },
  { name: "Soybean", diseases: ["Healthy"] },
  { name: "Squash", diseases: ["Powdery Mildew"] },
  { name: "Strawberry", diseases: ["Leaf Scorch", "Healthy"] },
  { name: "Tomato", diseases: ["Bacterial Spot", "Early Blight", "Late Blight", "Leaf Mold", "Septoria Leaf Spot", "Spider Mites", "Target Spot", "Yellow Leaf Curl Virus", "Mosaic Virus", "Healthy"] },
];

interface TestingSectionProps {
  onScan: () => void;
}

const TestingSection: React.FC<TestingSectionProps> = ({ onScan }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const handleDownload = useCallback(async (src: string, filename: string) => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Fallback: open in new tab
      window.open(src, "_blank");
    }
  }, []);

  return (
    <section
      id="testing-guide"
      ref={sectionRef}
      className="relative py-16 sm:py-24 lg:py-32 px-3 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.p
            className="text-sm uppercase tracking-[0.2em] text-primary font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            Testing Guide
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground tracking-tight"
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Test{" "}
            <span className="text-primary text-glow">FarmGuard AI</span>
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Download sample images below, then upload them on the Scan page
          </motion.p>
        </div>

        {/* Steps */}
        <motion.div
          className="glass-strong rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 glass-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-6">How to Test</h3>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 sm:justify-between">
            {[
              { step: "1", text: "Click a sample image to download it" },
              { step: "2", text: "Go to the Scan page" },
              { step: "3", text: "Upload the image and scan!" },
            ].map((s, i) => (
              <div key={s.step} className="flex items-center gap-2 sm:gap-3">
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm sm:text-base">
                  {s.step}
                </div>
                <p className="text-sm text-foreground font-medium">{s.text}</p>
                {i < 2 && (
                  <ArrowRight className="hidden sm:block w-4 h-4 text-muted-foreground ml-2" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Sample images grid */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Sample Images</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Click any image to download it
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {SAMPLE_IMAGES.map((img, i) => (
              <motion.div
                key={img.label}
                className="glass-strong rounded-xl overflow-hidden cursor-pointer group hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.05 }}
                onClick={() =>
                  handleDownload(
                    img.src,
                    `${img.label.toLowerCase().replace(/\s+/g, "-")}.webp`
                  )
                }
              >
                <div className="relative">
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-36 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Download className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-sm font-semibold text-foreground">{img.label}</p>
                  <p className="text-xs text-muted-foreground">{img.crop}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Supported Crops */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Supported Crops & Diseases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CROP_DATA.map((crop, i) => (
              <motion.div
                key={crop.name}
                className="glass-strong rounded-xl p-5 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.03 }}
              >
                <h4 className="text-lg font-semibold text-foreground">{crop.name}</h4>
                <div className="space-y-1.5">
                  {crop.diseases.map((disease) => (
                    <div key={disease} className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {disease === "Healthy" ? "✅ Healthy" : `🔴 ${disease}`}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button
            onClick={onScan}
            className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-[0_0_25px_-5px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_45px_-5px_hsl(var(--primary)/0.7)] hover:-translate-y-1"
          >
            <Leaf className="w-5 h-5" />
            Go to Scan Page
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestingSection;
