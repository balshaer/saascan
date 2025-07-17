export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)] z-50">
      <div className="flex w-[300px] h-[100px] items-end justify-center">
        <div className="w-5 h-2 mx-[5px] bg-[var(--button)] rounded-[5px] animate-loading-wave" />
        <div className="w-5 h-2 mx-[5px] bg-[var(--button)] rounded-[5px] animate-loading-wave [animation-delay:0.1s]" />
        <div className="w-5 h-2 mx-[5px] bg-[var(--button)] rounded-[5px] animate-loading-wave [animation-delay:0.2s]" />
        <div className="w-5 h-2 mx-[5px] bg-[var(--button)] rounded-[5px] animate-loading-wave [animation-delay:0.3s]" />
      </div>
    </div>
  );
}
