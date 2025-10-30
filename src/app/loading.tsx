export default function Loading() {
  return (
    <div className="fixed inset-0 z-20000 grid place-items-center bg-black text-white">
      <div className="flex flex-col items-center gap-6">
        <div className="h-12 w-12 rounded-full border-2 border-white/20 border-t-white animate-spin" />
        <div className="text-center">
          <div className="text-sm tracking-[0.25em] text-white/60">JLINIE</div>
          <div className="mt-1 text-base text-white/70">Loading</div>
        </div>
      </div>
    </div>
  );
}
