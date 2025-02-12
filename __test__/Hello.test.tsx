// __tests__/Hello.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';

function Hello() {
  return <Text>Hello Expo with TypeScript!</Text>;
}

describe('Hello component', () => {
  it('renders text correctly', () => {
    render(<Hello />);
    expect(screen.getByText('Hello Expo with TypeScript!')).toBeTruthy();
  });
});
