import React, { lazy, Suspense } from 'react';
import Loading from 'components/global/Loading/Loading';

const LazyLeafletComp = lazy(() => import('./LeafletComp'));

type Props = any; 
const LeafletComp = (props: JSX.IntrinsicAttributes & Props & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyLeafletComp {...props} />
  </Suspense>
);

export default LeafletComp;
