function SystemOrbit() {
  const nodes = [
    { label: "Records", angle: 0 },
    { label: "Communication", angle: 60 },
    { label: "Events", angle: 120 },
    { label: "Giving", angle: 180 },
    { label: "Analytics", angle: 240 },
    { label: "Permissions", angle: 300 },
  ];

  const radius = 110;

  return (
    <div className="relative w-[260px] sm:w-[320px] md:w-[360px] aspect-square">

      {/* SVG SYSTEM */}
      <svg viewBox="0 0 300 300" className="w-full h-full">

        {/* OUTER RING */}
        <circle cx="150" cy="150" r="120"
          stroke="#c6a96b33" strokeWidth="1" fill="none" />

        {/* INNER RING */}
        <circle cx="150" cy="150" r="80"
          stroke="#c6a96b55" strokeWidth="1" fill="none" />

        {/* CENTER GLOW */}
        <circle cx="150" cy="150" r="30"
          fill="rgba(198,169,107,0.15)" />

        {/* CONNECTION LINES */}
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 150 + Math.cos(rad) * radius;
          const y = 150 + Math.sin(rad) * radius;

          return (
            <line
              key={i}
              x1="150"
              y1="150"
              x2={x}
              y2={y}
              stroke="#c6a96b44"
              strokeWidth="1"
            />
          );
        })}

        {/* NODES */}
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 150 + Math.cos(rad) * radius;
          const y = 150 + Math.sin(rad) * radius;

          return (
            <g key={i}>
              <circle cx={x} cy={y} r="10"
                fill="#0b0b0b"
                stroke="#c6a96b"
                strokeWidth="1"
              />
            </g>
          );
        })}

        {/* CENTER ICON */}
        <text
          x="150"
          y="155"
          textAnchor="middle"
          fontSize="18"
          fill="#c6a96b"
        >
          ✦
        </text>
      </svg>
    </div>
  );
}
export default SystemOrbit;