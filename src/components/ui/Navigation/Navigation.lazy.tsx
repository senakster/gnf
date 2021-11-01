import React, { lazy, Suspense } from 'react';
import Loading from 'components/global/Loading/Loading';

const LazyNavigation = lazy(() => import('./Navigation'));

type Props = any; 
const Navigation = (props: JSX.IntrinsicAttributes & Props & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyNavigation {...props} />
  </Suspense>
);

export default Navigation;
