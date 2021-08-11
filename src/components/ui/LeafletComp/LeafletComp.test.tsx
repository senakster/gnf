import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LeafletComp from './LeafletComp';

describe('<LeafletComp />', () => {
  test('it should mount', () => {
    render(<LeafletComp />);
    
    const leafletComp = screen.getByTestId('LeafletComp');

    expect(leafletComp).toBeInTheDocument();
  });
});