import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nav from './components/Nav.js';

test('nav shows auth links when logged out', () => {
  localStorage.clear();
  render(<MemoryRouter><Nav /></MemoryRouter>);
  expect(screen.getByText(/Login/i)).toBeInTheDocument();
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
});
