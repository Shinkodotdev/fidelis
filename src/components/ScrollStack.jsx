import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollStack({ children }) {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {

      const sections = gsap.utils.toArray(".stack-item");

      sections.forEach((section, i) => {
        gsap.set(section, {
          zIndex: sections.length - i,
        });

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=120%", // smoother scroll space
          pin: true,
          pinSpacing: false,
        });

        // EXIT ANIMATION (better depth)
        if (i !== sections.length - 1) {
          gsap.to(section, {
            scale: 0.92,
            y: -80,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=120%",
              scrub: true,
            },
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ perspective: "1200px" }} // 🔥 depth added
    >
      {children}
    </div>
  );
}

export function ScrollStackItem({ children }) {
  return (
    <div className="stack-item w-full h-screen flex items-center">
      {children}
    </div>
  );
}