import React from "react";
import Header from "../components/Header";
import Hero from "../components/sections/Hero";
import Services from "../components/sections/Services";
import RoutesSection from "../components/sections/Routes";
import BookingForm from "../components/sections/BookingForm";
import WhyUs from "../components/sections/WhyUs";
import Footer from "../components/sections/Footer";
import StickyMobileCTA from "../components/StickyMobileCTA";

export default function Landing() {
  return (
    <div className="bg-white text-slate-900" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <Header />
      <main>
        <Hero />
        <Services />
        <RoutesSection />
        <WhyUs />
        <BookingForm />
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
