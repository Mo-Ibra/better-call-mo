"use client";

import { useEffect, useState } from "react";
import Contact from "./Contact";
import ContactModal from "./ContactModal";

export default function ClientContactModal() {
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
      <Contact openQuiz={openQuiz} />
      <ContactModal isOpen={isQuizOpen} onClose={closeQuiz} />
    </>
  );
}
