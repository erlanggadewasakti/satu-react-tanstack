import { ReactElement, useEffect } from 'react';
import { useLocation } from '@tanstack/react-router';

// ==============================|| NAVIGATION - SCROLL TO TOP ||============================== //

export default function ScrollTop({ children }: { children: ReactElement | null }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return children || null;
}
