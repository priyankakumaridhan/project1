import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeToggle from './ThemeToggle';

const mockMatchMedia = (matches) => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    onchange: null,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
};

beforeEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute('data-theme');
});

test('falls back to the system preference when nothing is stored', () => {
  mockMatchMedia(true);
  render(<ThemeToggle />);
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
});

test('a stored preference beats the system preference', () => {
  mockMatchMedia(true);
  localStorage.setItem('theme', 'light');
  render(<ThemeToggle />);
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});

test('clicking flips the theme and persists it', async () => {
  mockMatchMedia(false);
  render(<ThemeToggle />);
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');

  await userEvent.click(screen.getByRole('button'));

  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  expect(localStorage.getItem('theme')).toBe('dark');
});

test('the button describes the action it will take', () => {
  mockMatchMedia(false);
  render(<ThemeToggle />);
  expect(screen.getByRole('button')).toHaveAccessibleName(/switch to dark theme/i);
});
