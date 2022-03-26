import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeafletBase from './LeafletBase';

describe('<LeafletBase />', () => {
  test('it should mount', () => {
    render(<LeafletBase />);
    
    const leafletBase = screen.getByTestId('LeafletBase');

    expect(leafletBase).toBeInTheDocument();
  });
});