import { Nav } from "./components/sections/Nav";
import { Hero } from "./components/sections/Hero";
import { Features } from "./components/sections/Features";
import { Pipeline } from "./components/sections/Pipeline";
import { Privacy } from "./components/sections/Privacy";
import { Engineering } from "./components/sections/Engineering";
import { Faq } from "./components/sections/Faq";
import { CTA } from "./components/sections/CTA";
import { Footer } from "./components/sections/Footer";

export default function App() {
  return (
    <>
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[var(--z-overlay)] focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Pipeline />
        <Features />
        <Privacy />
        <Engineering />
        <Faq />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
