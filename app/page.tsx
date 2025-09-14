"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FAQs from "@/components/Faqs";
import { useEffect, useState } from "react";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const openQuiz = () => setIsQuizOpen(true);

  const closeQuiz = () => {
    setIsQuizOpen(false);
  };

  // Handle body overflow when modal opens/closes
  useEffect(() => {
    if (isQuizOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isQuizOpen]);

  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <FAQs />
      <Contact openQuiz={openQuiz} />
      <ContactModal isOpen={isQuizOpen} onClose={closeQuiz} />
      <Footer />
    </>
  );
}
