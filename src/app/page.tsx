import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TapShowcase from "@/components/TapShowcase";
import Products from "@/components/Products";
import CardCustomizer from "@/components/CardCustomizer";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col w-full">
        <Hero />
        <TapShowcase />
        <Products />
        <CardCustomizer />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
