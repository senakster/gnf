import React, { lazy, Suspense } from 'react';
import Loading from 'components/global/Loading/Loading';

const LazyHome = lazy(() => import('./Home'));

const Home = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyHome {...props} />
  </Suspense>
);

export default Home;
