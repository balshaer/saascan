import { AnimatedShinyText } from '@/core/components/magicui/animated-shiny-text';
import { cn } from '@/lib/utils';

export function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex min-h-64 items-center justify-center">
      <div
        className={cn(
          'rounded-full border text-base transition-all ease-in',
          'border-[var(--border)] bg-[var(--card)] text-[var(--card-headline)]',
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 text-[var(--card-headline)] transition ease-out">
          <span className="text-[var(--card-headline)]">Powered by Gemini</span>
          <img
            src={'/public/icons/gemini.svg'}
            alt="gemini"
            className="ml-1 size-3 transition-transform duration-300 ease-in-out"
          />
        </AnimatedShinyText>
      </div>
    </div>
  );
}
