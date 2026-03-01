import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ForWho } from "../components/ForWho";
import { CommonRisks } from "../components/CommonRisks";
import { OurApproach } from "../components/OurApproach";
import { WhatYouGet } from "../components/WhatYouGet";
import { PricingSection } from "../components/PricingSection";
import { ReportViewer } from "../components/ReportViewer";
import { About } from "../components/About";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ForWho />
        <CommonRisks />
        <OurApproach />
        <WhatYouGet />
        <PricingSection />
        <ReportViewer />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}