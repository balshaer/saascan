import React from "react";
import { cssVars } from "../../utils/cssVariables";
import { TextEffect } from "../ui/text-effect";

const HeroSection = () => {
  return (
    <div className="pt-12 text-center">
      <h1
        className="text-4xl font-extrabold tracking-tight 2xs:text-5xl md:text-6xl lg:text-7xl"
        style={{ color: cssVars.headline }}
      >
        SaaS Idea Scanner
        <span className="block">was never easier</span>
      </h1>

      <TextEffect
        per="char"
        className="max-w-md mx-auto mt-5 text-base sm:text-lg md:mt-7 md:text-xl md:max-w-3xl"
        style={{ color: cssVars.paragraph }}
        preset="fade"
      >
        Get comprehensive analysis of your SaaS ideas with AI-powered insights,
        market validation, and strategic recommendations.
      </TextEffect>
    </div>
  );
};

export default HeroSection;
