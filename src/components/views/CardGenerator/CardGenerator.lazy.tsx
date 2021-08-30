import Loading from 'components/global/Loading/Loading';
import React, { lazy, Suspense } from 'react';

const LazyCardGenerator = lazy(() => import('./CardGenerator'));

const CardGenerator = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyCardGenerator {...props} />
  </Suspense>
);

export default CardGenerator;
