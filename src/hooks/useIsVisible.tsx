import { useEffect, useRef, useState } from 'react';

export default (isInitiallyVisible: boolean) => {
  const [isVisible, setIsVisible] = useState(isInitiallyVisible);
  const ref = useRef<HTMLElement>(null);

  // eslint-disable-next-line
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isVisible, setIsVisible };
};
