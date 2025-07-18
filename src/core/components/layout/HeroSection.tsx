
import { cn } from '@/lib/utils';
import { RoughNotation } from 'react-rough-notation';
import { AnimatedShinyText } from '../ui/animated-shiny-text';
import { TextEffect } from '../ui/text-effect';

const HeroSection = () => {
  return (
    <div className="pt-12 text-center">
      <div className="z-10 mb-6 flex items-center justify-center">
        <div
          className={cn(
            'rounded-full border text-sm transition-all ease-in',
            'border-[var(--border)] bg-[var(--card)] text-[var(--card-headline)]',
            'dark:border-[var(--border)] dark:bg-[var(--card)]',
          )}
        >
          <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out">
            <span>Powered by Gemini</span>
            <img
              src={'/public/icons/gemini.svg'}
              alt="gemini"
              className="ml-1 size-3 transition-transform duration-300 ease-in-out"
            />
          </AnimatedShinyText>
        </div>
      </div>

      <h1
        className="text-4xl font-[500] tracking-tight 2xs:text-5xl md:text-6xl lg:text-7xl"
        
      >
        SaaS Idea{' '}
        <RoughNotation
          type="underline"
          show={true}
          color="var(--highlight)"
          strokeWidth={5}
          padding={[-14, 0]}
          animationDuration={2500}
          animationDelay={400}
        >
          <span>Scanner</span>
        </RoughNotation>
        <span className="block">was never easier</span>
      </h1>

      <TextEffect
        per="char"
        className="max-w-md mx-auto mt-5 text-base sm:text-lg md:mt-7 md:text-xl md:max-w-3xl"
        
        preset="fade"
      >
        Get comprehensive analysis of your SaaS ideas with AI-powered insights, market validation,
        and strategic recommendations.
      </TextEffect>
    </div>
  );
};

export default HeroSection;
