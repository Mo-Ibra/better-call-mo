"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";
import Image from "next/image";

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    function animate() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${particle.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView();
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" id="hero">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(16,185,129,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.1),transparent_50%)]" />
        <ParticleBackground />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            {/* Main Tagline */}
            <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-balance">
              <span className="text-foreground">Better Call</span>{" "}
              <span className="text-primary neon-glow">Mo!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              {"Need a website that actually works? I'm your developer."}
            </p>

            <div className="mb-12">
              <h3 className="text-lg font-semibold text-center lg:text-left mb-6 text-primary">
                Our Stack
              </h3>
              <div className="flex items-center justify-center lg:justify-start gap-6 flex-wrap">
                {/* Next.js */}
                <div className="group flex flex-col items-center gap-3 bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 min-w-[120px]">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image
                      src="/images/next-js-logo-black-and-white.jpg"
                      alt="Next.js"
                      width={48}
                      height={48}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    Next.js
                  </span>
                </div>

                {/* Tailwind CSS */}
                <div className="group flex flex-col items-center gap-3 bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 min-w-[120px]">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image
                      src="/images/tailwind-css-logo-blue-wind-icon.jpg"
                      alt="Tailwind CSS"
                      width={48}
                      height={48}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    Tailwind CSS
                  </span>
                </div>

                {/* ShadCN */}
                <div className="group flex flex-col items-center gap-3 bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 min-w-[120px]">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image
                      src="/images/shadcn-ui-logo-modern-component-library-icon.jpg"
                      alt="ShadCN"
                      width={48}
                      height={48}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-center">
                    ShadCN
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 neon-glow"
                onClick={scrollToContact}
              >
                {"Let's Build Something"}
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                onClick={() => {
                  const element = document.getElementById("projects");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View My Work
              </Button>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main image */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <Image
                  src="/images/saul-goodman-mo.png"
                  alt="Better Call Mo - Professional Web Developer"
                  width={300}
                  height={500}
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-16">
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
