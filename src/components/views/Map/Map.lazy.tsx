import React, { lazy, Suspense } from 'react';
import Loading from 'components/global/Loading/Loading';

const LazyMap = lazy(() => import('./Map'));

const Map = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyMap {...props} />
  </Suspense>
);

export default Map;
