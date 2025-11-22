import { useEffect } from 'react';
import { useFallbackImage } from '../../hooks/useFallbackImage';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  fallback?: string;
}

export default function FallbackImage({ src, fallback, alt, ...props }: FallbackImageProps) {
  const { src: finalSrc, setInitialSrc, handleError } = useFallbackImage(fallback);

  useEffect(() => {
    setInitialSrc(src);
  }, [src, setInitialSrc]);

  return (
    <img {...props} src={finalSrc || fallback} alt={alt} onError={handleError} loading="lazy" />
  );
}
