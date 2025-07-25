import { useEffect, useState } from 'react';

function WordRotate({ words, interval = 2500 }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => setFade(false), interval - 600);
    const changeWordTimer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % words.length);
      setFade(true);
    }, interval);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(changeWordTimer);
    };
  }, [index, interval, words.length]);

  return (
    <span
      style={{
        transition: 'opacity 0.6s ease-in-out',
        opacity: fade ? 1 : 0,
        display: 'inline-block',
        minWidth: '10ch',
        fontWeight: '600',
        fontSize: '1.3rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2563eb',
        textAlign: 'center',
      }}
      aria-live="polite"
    >
      {words[index]}
    </span>
  );
}

export default function ProgressIndicator({ isAnalyzing }: { isAnalyzing?: boolean }) {
  if (!isAnalyzing) return null;
  return <div>Analyzing...</div>;
}
