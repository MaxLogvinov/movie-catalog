import { useState, useCallback } from 'react';

export function useFallbackImage(fallbackSrc: string = '/no-poster-found.jpg') {
  const [src, setSrc] = useState<string | null>(null);

  const setInitialSrc = useCallback(
    (initial: string) => {
      setSrc(initial !== 'N/A' ? initial : fallbackSrc);
    },
    [fallbackSrc]
  );

  const handleError = useCallback(() => {
    setSrc(fallbackSrc);
  }, [fallbackSrc]);

  return {
    src,
    setInitialSrc,
    handleError
  };
}
