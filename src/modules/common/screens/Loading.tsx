import React, { memo } from 'react';

const BAR_BASE_CLASSES = 'w-5 h-2 mx-[5px] bg-[var(--button)] rounded-[5px] animate-loading-wave';

const animationDelays = ['0s', '0.1s', '0.2s', '0.3s'] as const;

const LoadingBar = memo(({ delay }: { delay: string }) => (
  <div
    className={BAR_BASE_CLASSES}
    style={{ animationDelay: delay }}
  />
));

const Loading: React.FC = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-[var(--background)] z-50">
    <div className="flex w-[300px] h-[100px] items-end justify-center">
      {animationDelays.map((delay) => (
        <LoadingBar key={delay} delay={delay} />
      ))}
    </div>
  </div>
);

export default memo(Loading);
