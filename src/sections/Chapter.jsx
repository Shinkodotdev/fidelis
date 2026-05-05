import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Chapter() {
  const sectionRef = useRef();
  const contentRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {

      // TEXT REVEAL
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      // IMAGE PARALLAX + SCALE
      gsap.fromTo(
        imageRef.current,
        { scale: 0.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen w-full bg-[#0b0b0b] flex items-center px-24 relative overflow-hidden"
    >

      {/* LIGHT GLOW (same style as hero) */}
      <div className="hero-light opacity-40" />

      <div className="flex justify-between items-center gap-20">

        {/* LEFT TEXT */}
        <div
          ref={contentRef}
          className="max-w-xl z-10"
        >
          <p className="text-xs text-gray-500 mb-3 tracking-widest">
            CHAPTER I
          </p>

          <h2 className="text-5xl font-display mb-6">
            The Challenge
          </h2>

          <p className="text-gray-400 mb-8 leading-relaxed">
            Ministries were never meant to struggle with spreadsheets,
            disconnected tools, and scattered information. Yet too much
            time is lost managing systems instead of fulfilling the mission.
          </p>

          <button className="btn-gold">
            See the Problem →
          </button>
        </div>

        {/* RIGHT IMAGE (OPEN BOOK) */}
        <div
            ref={imageRef}
            className="relative w-[900px] h-[650px] rounded-xl overflow-hidden"
            >
            {/* IMAGE */}
            <div
                className="absolute inset-0 bg-center bg-cover"
                style={{
                backgroundImage: "url('/Chapter.png')",
                }}
            />

            {/* GOLD GLOW */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,200,120,0.25),transparent_70%)]" />

            {/* SHADOW DEPTH */}
            <div className="absolute inset-0 shadow-[0_40px_120px_rgba(0,0,0,0.8)]" />

            {/* VIGNETTE */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
            </div>

      </div>
    </section>
  );
}