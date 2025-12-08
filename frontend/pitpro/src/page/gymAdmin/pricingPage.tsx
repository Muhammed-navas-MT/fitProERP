import Footer from "@/components/gymAdmin/landing/Footer";
import Hero from "@/components/gymAdmin/landing/Hero";
import { PricingCards } from "@/components/gymAdmin/landing/pricingCards";
import { PricingHero } from "@/components/gymAdmin/landing/pricingHero";

export default function PricingPage() {
    return(
        <main className="bg-black">
            <Hero/>
            <PricingHero/>
            <PricingCards/>
            <Footer/>
        </main>
    )
}