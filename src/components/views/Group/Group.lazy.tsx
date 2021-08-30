import React, { lazy, Suspense } from 'react';
import Loading from 'components/global/Loading/Loading';

const LazyGroup = lazy(() => import('./Group'));

const Group = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyGroup {...props} />
  </Suspense>
);

export default Group;
