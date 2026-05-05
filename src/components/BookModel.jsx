import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { forwardRef, useMemo } from "react";

const BookModel = forwardRef(function BookModel({ mouse }, ref) {
  const { scene } = useGLTF("/book.glb");
  const cloned = useMemo(() => scene.clone(), [scene]);

  // ✅ BASE POSITION (your layout control)
  const baseX = 0.4;     // 👈 more left
  const baseY = -0.9;    // 👈 lower
  const baseZ = 0;

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.getElapsedTime();

    // 🔹 FLOAT (relative to base position)
    const floatY = Math.sin(t) * 0.08;

    ref.current.position.x = baseX;
    ref.current.position.y = baseY + floatY;
    ref.current.position.z = baseZ;

    // 🔹 MOUSE ROTATION
    if (mouse?.current) {
      const targetY = mouse.current.x * 0.3;
      const targetX = -mouse.current.y * 0.2;

      ref.current.rotation.y += (targetY - ref.current.rotation.y) * 0.08;
      ref.current.rotation.x += (targetX - ref.current.rotation.x) * 0.08;
    }

    // 🔹 SUBTLE AUTO ROTATION
    ref.current.rotation.y += 0.002;
  });

  return (
    <primitive
      ref={ref}
      object={cloned}
      scale={0.14}
      rotation={[0.25, -0.6, 0]}
    />
  );
});

export default BookModel;

useGLTF.preload("/book.glb");