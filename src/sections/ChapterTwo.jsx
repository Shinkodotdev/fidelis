import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SystemOrbit from "../components/SystemOrbit";
import StepProgress from "../components/StepProgress";
import BookModel from "../components/BookModel";

gsap.registerPlugin(ScrollTrigger);

export default function ChapterTwo() {
  const sectionRef = useRef();
  const bookRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // TEXT ANIMATION (scoped)
      gsap.from(
        sectionRef.current.querySelectorAll(".fade-up"),
        {
          opacity: 0,
          y: 60,
          duration: 1,
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );

      // BOOK ANIMATION (disable on mobile)
      if (!isMobile && bookRef.current) {
        gsap.to(bookRef.current.rotation, {
          y: "+=1",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        gsap.to(bookRef.current.position, {
          y: -0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#050505]
      px-6 sm:px-10 lg:px-24 py-20 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row items-center gap-16">

        {/* ================= LEFT ================= */}
        <div className="w-full lg:w-1/3 text-center lg:text-left">
          <p className="fade-up text-xs tracking-widest text-gray-500 mb-3">
            CHAPTER II
          </p>

          <h2 className="fade-up font-display text-3xl sm:text-4xl md:text-5xl mb-6">
            The System
          </h2>

          <p className="fade-up text-gray-400 leading-relaxed mb-8 text-sm sm:text-base">
            Fidelis is a unified platform that brings every part of your
            ministry together—people, communication, events, giving, and data—
            so you can operate with clarity and focus on what truly matters.
          </p>

          <button className="fade-up btn-gold w-full sm:w-auto">
            Explore the System →
          </button>
        </div>

        {/* ================= CENTER (BOOK + ORBIT) ================= */}
        <div className="relative w-full lg:w-1/3 flex justify-center items-center">

          {/* 🔥 BOOK BACKGROUND */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              <ambientLight intensity={0.4} />
              <directionalLight position={[5, 5, 5]} intensity={1.5} />
              <pointLight position={[2, 2, 3]} intensity={3} color="#c6a96b" />
              <Environment preset="city" />

              <BookModel ref={bookRef} />
            </Canvas>
          </div>

          {/* 🔥 ORBIT (FRONT) */}
          <div className="relative z-10 fade-up">
            <SystemOrbit />
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-row gap-10">

          {/* FEATURES */}
          <div className="flex flex-col gap-6 text-center lg:text-left">
            {[
              {
                title: "Centralized Records",
                desc: "Keep every member and family connected.",
              },
              {
                title: "Smart Communication",
                desc: "Reach the right people at the right time.",
              },
              {
                title: "Events Management",
                desc: "Plan, organize, and manage with ease.",
              },
              {
                title: "Giving & Contributions",
                desc: "Secure, transparent, and simple.",
              },
              {
                title: "Analytics & Reports",
                desc: "Gain insights to make better decisions.",
              },
              {
                title: "Roles & Permissions",
                desc: "Ensure the right access for the right people.",
              },
            ].map((item, i) => (
              <div key={i} className="fade-up">
                <h4 className="text-[#e7d3a3] font-semibold">
                  {item.title}
                </h4>
                <p className="text-gray-500 text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* STEP PROGRESS */}
          <div className="hidden lg:flex justify-end fade-up">
            <StepProgress />
          </div>

        </div>
      </div>
    </section>
  );
}