import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import FAQs from "@/components/Faqs";
import ClientContactModal from "@/components/ClientContactModal";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Projects />
      <FAQs />
      <ClientContactModal />
      <Footer />
    </>
  );
}
