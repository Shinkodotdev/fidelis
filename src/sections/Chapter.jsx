import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StepProgress from "../components/StepProgress";

gsap.registerPlugin(ScrollTrigger);

export default function Chapter() {
  const sectionRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {

      // TEXT
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      // IMAGE
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 50%",
            scrub: 1,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0b0b0b] overflow-hidden
      flex items-center px-6 sm:px-10 lg:px-24 py-16"
    >
      {/* LIGHT */}
      <div className="hero-light opacity-40" />

      {/* CONTENT */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 w-full">

        {/* ================= TEXT ================= */}
        <div
          ref={contentRef}
          className="w-full lg:w-2/5 max-w-xl z-10 text-center lg:text-left"
        >
          <p className="text-xs text-gray-500 mb-3 tracking-widest">
            CHAPTER I
          </p>

          <h2 className="font-display mb-6 
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            The Challenge
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed 
            text-sm sm:text-base md:text-lg">
            Ministries were never meant to struggle with spreadsheets,
            disconnected tools, and scattered information. Yet too much
            time is lost managing systems instead of fulfilling the mission.
          </p>

          <button className="btn-gold w-full sm:w-auto">
            See the Problem →
          </button>
        </div>

        {/* ================= IMAGE ================= */}
        <div
          ref={imageRef}
          className="relative w-full lg:w-2/5
          h-[260px] sm:h-[350px] md:h-[450px] lg:h-[600px]
          rounded-xl overflow-hidden"
        >
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{ backgroundImage: "url('/Chapter.png')" }}
          />

          <div className="absolute inset-0 
            bg-[radial-gradient(circle_at_center,rgba(255,200,120,0.25),transparent_70%)]" />

          <div className="absolute inset-0 
            shadow-[0_40px_120px_rgba(0,0,0,0.8)]" />

          <div className="absolute inset-0 
            bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        </div>

        {/* ================= STEP PROGRESS ================= */}
        <div className="w-full lg:w-1/5 flex justify-center lg:justify-end">
          <StepProgress />
        </div>

      </div>
    </section>
  );
}