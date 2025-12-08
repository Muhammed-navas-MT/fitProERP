import CTA from "@/components/gymAdmin/landing/CAT";
import Features from "@/components/gymAdmin/landing/Features";
import Footer from "@/components/gymAdmin/landing/Footer";
import Hero from "@/components/gymAdmin/landing/Hero";
import Stats from "@/components/gymAdmin/landing/Stats";

export default function Home() {
  return (
    <main className="bg-black">
      <Hero/>
      <Features/>
      <Stats/>
      <CTA/>
      <Footer/>
    </main>
  )
}
