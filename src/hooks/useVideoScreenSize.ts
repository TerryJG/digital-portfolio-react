import { useState, useEffect } from 'react';

type ScreenSize = {
  width: string;
  height: string;
  transform?: string;
};

export const useVideoScreenSize = () => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({ width: '100vw', height: '100vh' });

  useEffect(() => {
    const updateScreenSize = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      let size: ScreenSize;

      // For desktop web, enlarge video to cover the viewport
      const aspectRatio = 16 / 9;
      if (screenWidth / screenHeight > aspectRatio) {
        size = { width: '100vw', height: `${(100 * screenWidth / aspectRatio / screenHeight)}vh` };
      } else {
        size = { width: `${(100 * screenHeight * aspectRatio / screenWidth)}vw`, height: '100vh' };
      }

      setScreenSize(size);
    };

    // Initial update
    updateScreenSize();

    // Event listener for resize
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);

  return screenSize;
};