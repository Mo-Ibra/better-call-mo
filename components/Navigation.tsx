"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold text-primary cursor-pointer"
          >
            {"<Mo />"}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/#home"
              className="text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/#services"
              className="text-foreground hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="/#projects"
              className="text-foreground hover:text-primary transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#faqs"
              className="text-foreground hover:text-primary transition-colors"
            >
              Faqs
            </Link>
            <Link
              href="/blog"
              className="text-foreground hover:text-primary transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Hire Me button */}
          <div className="hidden md:block">
            <Link href="#contact">
              <Button className="bg-primary hover:bg-primary/90">
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
                >
                  Home
                </Link>
                <Link
                  href="/#about"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/#services"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Services
                </Link>
                <Link
                  href="/#projects"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
                <Link
                  href="/#faqs"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Faqs
                </Link>
                <Link
                  href="/blog"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-foreground hover:text-primary transition-colors"
                >
                  Faqs
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button className="bg-primary hover:bg-primary/90 w-full">
                    Contact Mo
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
