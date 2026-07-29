import { lazy, Suspense } from 'react';
import { Outlet } from '@tanstack/react-router';

// project-imports
import Loader from 'components/Loader';
import ScrollTop from 'components/ScrollTop';
import { SimpleLayoutType } from 'config';

const Header = lazy(() => import('components/pages/Header'));
const FooterBlock = lazy(() => import('components/pages/FooterBlock'));

// ==============================|| LAYOUT - SIMPLE / LANDING ||============================== //

export default function SimpleLayout({ layout = SimpleLayoutType.SIMPLE }: { layout?: SimpleLayoutType }) {
  return (
    <Suspense fallback={<Loader />}>
      <ScrollTop>
        <>
          <Header />
          <Outlet />
          <FooterBlock isFull={layout === SimpleLayoutType.LANDING} />
        </>
      </ScrollTop>
    </Suspense>
  );
}
