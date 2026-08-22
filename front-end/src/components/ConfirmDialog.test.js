import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ConfirmDialog from './ConfirmDialog';

const setup = (overrides = {}) => {
  const props = {
    title: 'Delete product?',
    message: 'This cannot be undone.',
    confirmLabel: 'Delete',
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    ...overrides,
  };
  render(<ConfirmDialog {...props} />);
  return props;
};

test('renders as a modal dialog with its title and message', () => {
  setup();
  const dialog = screen.getByRole('dialog');
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(screen.getByText('Delete product?')).toBeInTheDocument();
  expect(screen.getByText('This cannot be undone.')).toBeInTheDocument();
});

test('focus starts on Cancel, not on the destructive action', () => {
  setup();
  expect(screen.getByRole('button', { name: /cancel/i })).toHaveFocus();
});

test('Escape cancels', async () => {
  const { onCancel } = setup();
  await userEvent.keyboard('{Escape}');
  expect(onCancel).toHaveBeenCalledTimes(1);
});

test('the confirm button fires onConfirm', async () => {
  const { onConfirm } = setup();
  await userEvent.click(screen.getByRole('button', { name: /delete/i }));
  expect(onConfirm).toHaveBeenCalledTimes(1);
});

test('Tab cycles within the dialog', async () => {
  setup();
  const cancel = screen.getByRole('button', { name: /cancel/i });
  const confirm = screen.getByRole('button', { name: /delete/i });
  await userEvent.tab();
  expect(confirm).toHaveFocus();
  await userEvent.tab();
  expect(cancel).toHaveFocus();
});
