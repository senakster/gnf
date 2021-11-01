import React, { lazy, Suspense } from 'react';

const LazySearch = lazy(() => import('./Search'));

const Search = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySearch {...props} />
  </Suspense>
);

export default Search;
