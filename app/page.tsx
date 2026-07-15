import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Venues from "@/components/Venues";
import Cuisine from "@/components/Cuisine";
import Gallery from "@/components/Gallery";
import Packages from "@/components/Packages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <Venues />
      <Cuisine />
      <Gallery />
      <Packages />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
