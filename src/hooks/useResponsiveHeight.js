import { useLayoutEffect, useCallback } from 'react';

const useResponsiveHeight = (containerRef, selector) => {
  const setHeight = useCallback(() => {
    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll(selector);
      if (elements.length > 0) {
        // Reset heights to auto to get the natural height
        elements.forEach(el => {
          el.style.height = 'auto';
        });

        // Get the max height
        const maxHeight = Math.max(...Array.from(elements).map(el => el.offsetHeight));

        // Set all elements to the max height
        elements.forEach(el => {
          el.style.height = `${maxHeight}px`;
        });
      }
    }
  }, [containerRef, selector]);

  useLayoutEffect(() => {
    setHeight();
    window.addEventListener('resize', setHeight);

    // Also run on image load, as that can change height
    const images = containerRef.current?.querySelectorAll('img');
    images?.forEach(img => img.addEventListener('load', setHeight));

    return () => {
      window.removeEventListener('resize', setHeight);
      images?.forEach(img => img.removeEventListener('load', setHeight));
    };
  }, [setHeight, containerRef]);
};

export default useResponsiveHeight;
