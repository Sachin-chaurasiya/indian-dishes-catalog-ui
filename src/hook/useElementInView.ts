import { useEffect, useRef, useState } from 'react';

export const useElementInView = (options: IntersectionObserverInit) => {
  const elementRef = useRef(null);

  const [isInView, setIsInView] = useState<boolean>(false);

  const handleObserve = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;

    setIsInView(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserve, options);
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [elementRef, options]);

  return { elementRef, isInView };
};
