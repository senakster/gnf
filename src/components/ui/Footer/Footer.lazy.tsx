import React, { lazy, Suspense } from 'react';

const LazyFooter = lazy(() => import('./Footer'));

type Props = any;    
const Footer = (props: JSX.IntrinsicAttributes & Props & { children?: React.ReactNode; }) => (
    <Suspense fallback={null}>
        <LazyFooter {...props} />
    </Suspense>
);

export default Footer;
