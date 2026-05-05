function StepProgress() {
  return (
    <div className="flex flex-col items-center gap-6 relative">

      {/* LINE */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-[#c6a96b33]" />

      {[1, 2, 3, 4].map((step, i) => (
        <div key={i} className="relative z-10 flex flex-col items-center">
          <div className="
            w-10 h-10 rounded-full 
            border border-[#c6a96b] 
            flex items-center justify-center
            text-[#c6a96b] text-sm
            bg-black
          ">
            {step}
          </div>
        </div>
      ))}
    </div>
  );
}
export default StepProgress;