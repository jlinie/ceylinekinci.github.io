export default function HeroWord() {
  return (
    <div className="pointer-events-none fixed inset-0 z-1000 flex items-center justify-center select-none">
      <h1
        style={{ fontFamily: "'Syne', sans-serif", color: "#02182E",}}
        className="
          text-black
          text-[clamp(1.4rem,4vw,5rem)] 
          font-extrabold
          leading-[0.9]
          tracking-tight
          uppercase
        "
      >
        CEYLIN
      </h1>
    </div>
  );
}
