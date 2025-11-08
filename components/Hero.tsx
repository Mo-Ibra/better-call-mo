"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Star, Users, Clock, CheckCircle } from "lucide-react";
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

function MainRandomImage() {
  return (
    <Image
      src="/images/saul-3.webp"
      alt="Better Call Mo - Professional Web Developer"
      width={1000}
      height={1000}
      className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
      priority
    />
  );
}

export default function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    element?.scrollIntoView();
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-12 lg:pt-0"
      id="hero"
    >
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
              <span className="text-primary md:rounded-2xl md:shadow-[0_0_20px_rgba(16,185,129,0.3)]">Mo!</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-balance">
              Need a website that actually works? I&apos;m your developer!
            </p>

            {/* Social Proof Stats */}
            <div className="md:mb-12 mb-5">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold text-primary">15+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Satisfied Clients
                  </p>
                </div>

                <div className="bg-card/90 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Star className="w-6 h-6 text-primary" />
                    <span className="text-2xl font-bold text-primary">5.0</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Average Rating
                  </p>
                </div>
              </div>

              {/* Urgency Banner */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 rounded-xl p-6 mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_70%)]" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-primary animate-pulse" />
                    <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                      Limited Availability
                    </span>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-2">
                    Currently accepting only{" "}
                    <span className="text-primary">2 new clients</span> this
                    month
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Don&apos;t miss out - secure your spot before it&apos;s too late!
                  </p>
                </div>
              </div>

              {/* Quick Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Fast delivery - Most projects completed in 2-4 weeks
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Affordable - only get paid when you see something alive.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    100% satisfaction guarantee - We don&apos;t stop until you&apos;re
                    happy
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-muted-foreground">
                    Free consultation - Let&apos;s discuss your project today
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-lg px-8 py-6 neon-glow animate-pulse"
                onClick={scrollToContact}
              >
                {"Book Your Spot Now"}
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
                <MainRandomImage />
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
