const OrbAura = () => {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden"
      style={{ zIndex: 3 }}
      aria-hidden="true"
    >
      {/* Wrapper: orb center sits at the bottom edge so only top half is visible.
          Size = 100% of viewport width-ish, scaled to be larger than the viewport for a hemisphere feel. */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[140vw] h-[140vw] max-w-[1600px] max-h-[1600px]">
        {/* Outer breathing aura */}
        <div
          className="absolute inset-0 rounded-full opacity-60 animate-orb-breathe"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.45) 0%, hsl(var(--accent) / 0.25) 35%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        {/* Mid glow ring */}
        <div
          className="absolute inset-[8%] rounded-full opacity-80 animate-orb-pulse"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, hsl(var(--primary) / 0.55) 0%, hsl(var(--accent) / 0.35) 45%, transparent 72%)",
            filter: "blur(30px)",
          }}
        />

        {/* Core orb — matches site gradient (primary -> accent) */}
        <div
          className="absolute inset-[18%] rounded-full animate-orb-pulse-slow"
          style={{
            background: "var(--gradient-primary)",
            boxShadow:
              "0 0 120px 20px hsl(var(--primary) / 0.55), inset 0 -40px 80px hsl(var(--accent) / 0.5), inset 0 40px 80px hsl(var(--primary) / 0.4)",
          }}
        />

        {/* Inner highlight (top of orb where it peeks above the fold) */}
        <div
          className="absolute inset-[24%] rounded-full mix-blend-screen opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 25%, hsl(0 0% 100% / 0.45) 0%, transparent 45%)",
          }}
        />

        {/* Rotating conic shimmer for sci-fi vibe */}
        <div
          className="absolute inset-[20%] rounded-full opacity-40 mix-blend-screen animate-orb-spin"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.6) 60deg, transparent 120deg, hsl(var(--accent) / 0.6) 200deg, transparent 260deg, hsl(var(--primary) / 0.5) 320deg, transparent 360deg)",
            filter: "blur(20px)",
          }}
        />

        {/* Equator soft band */}
        <div
          className="absolute left-[18%] right-[18%] top-[49%] h-[2px] rounded-full opacity-70"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), hsl(var(--accent) / 0.8), transparent)",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* Subtle scanline veil for sci-fi feel */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, hsl(var(--foreground)) 0px, hsl(var(--foreground)) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
};

export default OrbAura;
