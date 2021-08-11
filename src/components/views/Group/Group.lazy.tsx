import React, { lazy, Suspense } from 'react';

const LazyGroup = lazy(() => import('./Group'));

const Group = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyGroup {...props} />
  </Suspense>
);

export default Group;
