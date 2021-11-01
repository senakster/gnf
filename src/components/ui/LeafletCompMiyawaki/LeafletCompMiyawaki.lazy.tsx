import React, { lazy, Suspense } from 'react';
import Loading from 'components/global/Loading/Loading';

const LazyLeafletCompMiyawaki = lazy(() => import('./LeafletCompMiyawaki'));

type Props = any; 
const LeafletCompMiyawaki = (props: JSX.IntrinsicAttributes & Props & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyLeafletCompMiyawaki {...props} />
  </Suspense>
);

export default LeafletCompMiyawaki;
