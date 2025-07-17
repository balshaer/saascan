import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { cssVars } from '../utils/cssVariables';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: cssVars.hover }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4" style={{ color: cssVars.headline }}>
          404
        </h1>
        <p className="text-xl mb-4" style={{ color: cssVars.paragraph }}>
          Oops! Page not found
        </p>
        <a href="/" className="underline hover:opacity-75" style={{ color: cssVars.accent }}>
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
