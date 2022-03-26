import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card, {Props} from './Card';

describe('<Card />', () => {
  test('it should mount', () => {
    render(<Card data={{
      name: '',
      groupid: '1', 
      grouptype: '',
      description: 'Test Description', 
      municipality: 'København',
      variant: '',
    }}/>);
    
    const card = screen.getByTestId('Card');

    expect(card).toBeInTheDocument();
  });
});