import { AnnouncementBar } from "@/components/AnnouncementBar";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { StoryShell } from "@/components/StoryShell";
import { WaitlistFinale } from "@/components/WaitlistFinale";
import { ForEveryone } from "@/components/chapters/ForEveryone";
import { Gap } from "@/components/chapters/Gap";
import { Hero } from "@/components/chapters/Hero";
import { Measures } from "@/components/chapters/Measures";
import { MeetBand } from "@/components/chapters/MeetBand";
import { OnePlace } from "@/components/chapters/OnePlace";
import { PlainLanguage } from "@/components/chapters/PlainLanguage";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div id="top" />
      <AnnouncementBar />
      <Nav />
      <main id="main">
        <StoryShell>
          <Hero />
          <Gap />
          <MeetBand />
          <Measures />
          <PlainLanguage />
          <OnePlace />
          <ForEveryone />
        </StoryShell>
        <WaitlistFinale />
        <div className="border-t border-line">
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  );
}
