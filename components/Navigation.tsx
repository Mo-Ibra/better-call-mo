"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center">
          {/* Left: Logo */}
          <div className="flex-1">
            <Link
              href="/"
              className="text-2xl font-bold text-primary cursor-pointer inline-block"
            >
              <Image src="/favicon.svg" width={36} height={36} alt="logo" />
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#home"
              className="text-foreground hover:text-primary transition-colors"
              title="home"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-foreground hover:text-primary transition-colors"
              title="about"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="text-foreground hover:text-primary transition-colors"
              title="services"
            >
              Services
            </Link>
            <Link
              href="/#projects"
              className="text-foreground hover:text-primary transition-colors"
              title="projects"
            >
              Projects
            </Link>
            <Link
              href="/#faqs"
              className="text-foreground hover:text-primary transition-colors"
              title="faqs"
            >
              Faqs
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary transition-colors"
              title="blog"
            >
              Blog
            </Link>
          </div>

          {/* Right: Desktop Buttons */}
          <div className="flex-1 flex justify-end items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Link href="/ask-mo" title="Have a Question?">
                <Button
                  variant="ghost"
                  className="relative overflow-hidden group border border-white/5 bg-white/[0.03] backdrop-blur-sm hover:bg-primary/5 hover:border-primary/20 transition-all duration-500 rounded-xl px-6"
                >
                  <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                    <MessageSquare className="w-4 h-4" />
                    Have a Question?
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </Button>
              </Link>
              <Link href="#contact" title="contact">
                <Button className="bg-primary text-white font-black rounded-xl px-6 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95">
                  Hire Me!
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X aria-label="Toggle Menu" />
              ) : (
                <Menu aria-label="Toggle Menu" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute left-0 right-0 top-full bg-background border-t border-border shadow-md z-50 md:hidden"
            >
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                  title="home"
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                  title="about"
                >
                  About
                </Link>
                <Link
                  href="/#services"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                  title="services"
                >
                  Services
                </Link>
                <Link
                  href="/#projects"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                  title="projects"
                >
                  Projects
                </Link>
                <Link
                  href="/#faqs"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                  title="faqs"
                >
                  Faqs
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                  title="blog"
                >
                  Blog
                </Link>
                <div className="pt-2 flex flex-col gap-3">
                  <Link
                    href="/ask-mo"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                    title="ask-mo"
                  >
                    <Button
                      variant="ghost"
                      className="w-full flex items-center justify-center gap-2 border border-white/5 bg-white/[0.03] hover:bg-primary/5 hover:border-primary/20 py-6 rounded-2xl"
                    >
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <span className="font-bold">Ask Mo</span>
                    </Button>
                  </Link>
                  <Link
                    href="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="w-full"
                    title="contact"
                  >
                    <Button className="bg-primary hover:bg-white text-black font-black w-full py-6 rounded-2xl shadow-lg shadow-primary/10">
                      Hire Me!
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
