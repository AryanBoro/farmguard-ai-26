import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import TestingSection from "@/components/landing/TestingSection";

const Index: React.FC = () => {
  const navigate = useNavigate();
  const goToScan = useCallback(() => navigate("/scan"), [navigate]);
  const goToDashboard = useCallback(() => navigate("/dashboard"), [navigate]);

  return (
    <div className="relative bg-background">
      <AnimatedShaderBackground />

      {/* Gradient overlay for the shader */}
      <div className="fixed inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/70 z-[1] pointer-events-none" />

      {/* Cinematic GSAP Hero (pinned scroll section) */}
      <div className="relative z-[2]">
        <CinematicHero
          tagline1="Your crop doctor,"
          tagline2="in your pocket."
          cardHeading="Intelligence, in the field."
          cardDescription={
            <>
              FarmGuard AI uses deep learning to identify 35+ crop diseases across
              14 plant species in under 2 seconds — giving farmers instant,
              actionable treatment plans.
            </>
          }
          metricValue={96}
          metricLabel="% Accuracy"
          ctaHeading="Start scanning."
          ctaDescription="Upload any crop photo and get instant AI-powered disease detection, treatment recommendations, and prevention strategies."
          onScanClick={goToScan}
          onDashboardClick={goToDashboard}
        />
      </div>

      {/* Content after the pinned hero */}
      <div className="relative z-[2]">
        <TestingSection onScan={goToScan} />

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
