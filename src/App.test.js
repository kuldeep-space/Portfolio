import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio application without crashing', () => {
  render(<App />);
  const brandElements = screen.getAllByText(/KULDEEP/i);
  expect(brandElements.length).toBeGreaterThan(0);
});
