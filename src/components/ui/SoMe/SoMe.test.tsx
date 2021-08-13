import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SoMe from './SoMe';

describe('<SoMe />', () => {
  test('it should mount', () => {
    render(<SoMe />);
    
    const soMe = screen.getByTestId('SoMe');

    expect(soMe).toBeInTheDocument();
  });
});