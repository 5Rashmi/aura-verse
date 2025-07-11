"use client";
import Banner from "@/components/Banner";
import AuraGlobe from "@/components/ui/AuraGlobe";
import Exterior from "@/components/ui/environment/exterior/Exterior";
import { moodColors } from "@/constants/moodColors";
import { useRef } from "react";

export default function Home() {
  const mood = "calm";
  const { color, label, emoji } = moodColors[mood] || moodColors["neutral"];
  const globeRef = useRef<HTMLDivElement>(null);

  return (
    <main className="flex flex-col items-center w-full overflow-x-hidden">
      <section className="w-full mb-3">
        <Banner
          scrollToGlobe={() =>
            globeRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        />
      </section>

      <section ref={globeRef} className="w-full flex justify-center py-20">
        <AuraGlobe color={color} emoji={emoji} label={label} />
      </section>

      <section className="w-full flex justify-center py-20">
        <Exterior />
      </section>
    </main>
  );
}
