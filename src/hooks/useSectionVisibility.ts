import { useEffect, useRef, useState, useCallback } from 'react';

export function useVisibility() {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  const setRefs = useCallback((node: HTMLElement | null) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasInView = isInView;
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && !wasInView) {
          console.log(`Element entered view`);
        } else if (!entry.isIntersecting && wasInView) {
          console.log(`Element left view`);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isInView]);

  return [setRefs, isInView] as const;
}

export function useSectionVisibility(sectionCount: number) {
  const [sectionsInView, setSectionsInView] = useState<boolean[]>(new Array(sectionCount).fill(false));
  const refs = useRef<(HTMLElement | null)[]>(new Array(sectionCount).fill(null));

  const setRef = useCallback((index: number) => (node: HTMLElement | null) => {
    refs.current[index] = node;
  }, []);

  useEffect(() => {
    const observers = refs.current.map((_, index) => {
      return new IntersectionObserver(
        ([entry]) => {
          setSectionsInView(prev => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            
            if (entry.isIntersecting && !prev[index]) {
              console.log(`Section ${index + 1} entered view`);
            } else if (!entry.isIntersecting && prev[index]) {
              console.log(`Section ${index + 1} left view`);
            }

            return newState;
          });
        },
        { threshold: 0.1 }
      );
    });

    refs.current.forEach((ref, index) => {
      if (ref) {
        observers[index].observe(ref);
      }
    });

    return () => {
      observers.forEach((observer, index) => {
        if (refs.current[index]) {
          observer.unobserve(refs.current[index]!);
        }
      });
    };
  }, []);

  return { setRef, sectionsInView };
}