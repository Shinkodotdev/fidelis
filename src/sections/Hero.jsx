import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import BookModel from "../components/BookModel";

gsap.registerPlugin(ScrollTrigger);

/* ================= CURVE NODE ================= */
function CurveNode({ label, icon, t }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
      const path = document.getElementById("mainCurve");
      if (!path) return;

      const length = path.getTotalLength();
      const point = path.getPointAtLength(t * length);

      setPos({ x: point.x, y: point.y });
    };

    const id = requestAnimationFrame(update);
    return () => cancelAnimationFrame(id);
  }, [t]);

  return (
    <div className="curve-node" style={{ left: pos.x, top: pos.y }}>
      <div className="curve-icon">{icon}</div>
      <span className="curve-label">{label}</span>
    </div>
  );
}

/* ================= HERO ================= */
export default function Hero() {
  const heroRef = useRef();
  const contentRef = useRef();
  const glowRef = useRef();
  const bookRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  /* 🔹 MOUSE */
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  /* 🔹 TEXT + GLOW */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 }
      );

      gsap.to(glowRef.current, {
        opacity: 0.6,
        duration: 3,
        repeat: -1,
        yoyo: true,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* 🔹 SCROLL BOOK */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.delayedCall(0.2, () => {
        if (!bookRef.current) return;

        gsap.to(bookRef.current.position, {
          z: -2,
          y: -0.5,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to(bookRef.current.rotation, {
          y: "+=1",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* 🔹 CURVE PULSE */
  useEffect(() => {
    const path = document.getElementById("mainCurve");
    const pulse = document.querySelector(".curve-pulse");

    if (!path || !pulse) return;

    const length = path.getTotalLength();

    gsap.to({ t: 0 }, {
      t: 1,
      duration: 4,
      repeat: -1,
      ease: "none",
      onUpdate() {
        const point = path.getPointAtLength(this.targets()[0].t * length);
        pulse.setAttribute("cx", point.x);
        pulse.setAttribute("cy", point.y);
      }
    });
  }, []);

  return (
    <section ref={heroRef} className="relative w-full h-screen overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/bg.png')" }}
      />
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 z-10 bg-black/60" />
      {/* 3D BOOK */}
      <div className="absolute right-0 top-0 w-[55%] h-full z-20">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <pointLight position={[2, 2, 3]} intensity={5} color="#c6a96b" />
          <Environment preset="city" />
          <BookModel ref={bookRef} mouse={mouse} />
        </Canvas>
      </div>
      {/* TEXT */}
      <div className="relative z-50 max-w-[1400px] mx-auto px-24 h-full flex items-center">
        <div ref={contentRef} className="max-w-lg">
          <p className="text-xs tracking-[0.25em] text-gray-500 mb-4">INTRODUCING</p>
          <h1 className="text-[96px] font-display gold-text text-glow mb-6">Fidelis</h1>
          <p className="text-gray-400 mb-10 text-lg">
            The all-in-one system built to empower churches, strengthen communities, and advance the Kingdom.
          </p>
          <button className="btn-gold">Explore the System →</button>
        </div>
      </div>

    </section>
  );
}