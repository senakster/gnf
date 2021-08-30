import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CardGenerator from './CardGenerator';

describe('<CardGenerator />', () => {
  test('it should mount', () => {
    render(<CardGenerator />);
    
    const cardGenerator = screen.getByTestId('CardGenerator');

    expect(cardGenerator).toBeInTheDocument();
  });
});