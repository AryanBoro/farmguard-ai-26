import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import TestingSection from "@/components/landing/TestingSection";

const Index: React.FC = () => {
  const navigate = useNavigate();

  const scrollToTesting = useCallback(() => {
    const el = document.getElementById("testing-guide");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const goToScan = useCallback(() => navigate("/scan"), [navigate]);
  const goToDashboard = useCallback(() => navigate("/dashboard"), [navigate]);

  return (
    <div className="relative min-h-screen">
      <AnimatedShaderBackground />

      {/* Global gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background z-[1] pointer-events-none" />

      <div className="relative z-[2]">
        <HeroSection
          onScan={goToScan}
          onDashboard={goToDashboard}
          onTestingGuide={scrollToTesting}
        />
        <FeaturesSection />
        <TestingSection onScan={goToScan} />

        {/* Footer */}
        <footer className="py-12 px-4 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FarmGuard AI — Protecting crops with intelligence.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
