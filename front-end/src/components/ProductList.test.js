import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Products from './ProductList';

const renderList = () =>
  render(<MemoryRouter><Products /></MemoryRouter>);

beforeEach(() => {
  localStorage.setItem('token', JSON.stringify('fake-token'));
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});

const respondWith = (data) =>
  Promise.resolve({ json: () => Promise.resolve(data) });

test('renders the products in a real table', async () => {
  global.fetch.mockReturnValue(respondWith([
    { _id: '1', name: 'Shoes', price: '1300', category: 'shoe', company: 'bata' },
  ]));

  renderList();

  expect(await screen.findByRole('table')).toBeInTheDocument();
  expect(screen.getByRole('columnheader', { name: /name/i })).toBeInTheDocument();
  expect(screen.getByRole('cell', { name: 'Shoes' })).toBeInTheDocument();
});

test('shows an empty state when the catalogue is empty', async () => {
  global.fetch.mockReturnValue(respondWith([]));

  renderList();

  expect(await screen.findByText(/no products yet/i)).toBeInTheDocument();
  expect(screen.queryByRole('table')).not.toBeInTheDocument();
});

test('delete asks for confirmation and does not call the API until confirmed', async () => {
  global.fetch.mockReturnValue(respondWith([
    { _id: 'abc', name: 'Shoes', price: '1300', category: 'shoe', company: 'bata' },
  ]));

  renderList();
  await screen.findByRole('table');
  global.fetch.mockClear();

  await userEvent.click(screen.getByRole('button', { name: /delete shoes/i }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();

  await userEvent.click(screen.getByRole('button', { name: /^delete$/i }));

  await waitFor(() => {
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:5000/product/abc',
      expect.objectContaining({ method: 'Delete' })
    );
  });
});

test('cancelling the dialog leaves the product alone', async () => {
  global.fetch.mockReturnValue(respondWith([
    { _id: 'abc', name: 'Shoes', price: '1300', category: 'shoe', company: 'bata' },
  ]));

  renderList();
  await screen.findByRole('table');
  global.fetch.mockClear();

  await userEvent.click(screen.getByRole('button', { name: /delete shoes/i }));
  await userEvent.click(screen.getByRole('button', { name: /cancel/i }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(global.fetch).not.toHaveBeenCalled();
});
