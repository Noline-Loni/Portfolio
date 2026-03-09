export default function GrainOverlay() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 z-[9999] h-full w-full opacity-[0.035]"
      aria-hidden="true"
    >
      <filter id="grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.65"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  )
}
