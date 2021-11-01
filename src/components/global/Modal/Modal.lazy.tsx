import React, { lazy, Suspense } from 'react';
import Loading from 'components/global/Loading/Loading';

const LazyModal = lazy(() => import('./Modal'));

type Props = any;
const Modal = (props: JSX.IntrinsicAttributes & Props & { children?: React.ReactNode; }) => (
  <Suspense fallback={<Loading />}>
    <LazyModal {...props} />
  </Suspense>
);

export default Modal;