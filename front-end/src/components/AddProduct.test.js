import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AddProduct from './AddProduct';

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify({ _id: 'u1', name: 'Test' }));
  localStorage.setItem('token', JSON.stringify('fake-token'));
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});

test('every input has a real label', () => {
  render(<MemoryRouter><AddProduct /></MemoryRouter>);
  expect(screen.getByLabelText(/product name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/category/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/company/i)).toBeInTheDocument();
});

test('submitting empty marks fields invalid and describes the error', async () => {
  render(<MemoryRouter><AddProduct /></MemoryRouter>);

  await userEvent.click(screen.getByRole('button', { name: /add product/i }));

  const name = screen.getByLabelText(/product name/i);
  expect(name).toHaveAttribute('aria-invalid', 'true');
  expect(name).toHaveAccessibleDescription(/enter a product name/i);
  expect(global.fetch).not.toHaveBeenCalled();
});

test('a filled form posts to the API', async () => {
  global.fetch.mockReturnValue(Promise.resolve({ json: () => Promise.resolve({ _id: 'p1' }) }));

  render(<MemoryRouter><AddProduct /></MemoryRouter>);

  await userEvent.type(screen.getByLabelText(/product name/i), 'Shoes');
  await userEvent.type(screen.getByLabelText(/price/i), '1300');
  await userEvent.type(screen.getByLabelText(/category/i), 'shoe');
  await userEvent.type(screen.getByLabelText(/company/i), 'bata');
  await userEvent.click(screen.getByRole('button', { name: /add product/i }));

  expect(global.fetch).toHaveBeenCalledWith(
    'http://localhost:5000/add-product',
    expect.objectContaining({ method: 'post' })
  );
});
