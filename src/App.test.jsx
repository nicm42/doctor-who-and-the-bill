import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from './App';

describe('Testing set up', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('should be two buttons on the page and default heading and subtitle', () => {
    expect(screen.getAllByRole('button')).toHaveLength(2);
    screen.getByRole('button', { name: /Show Doctor Who regulars/i });
    expect(screen.getByRole('button', { name: /Show Doctor Who regulars/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show The Bill regulars/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', {
        name: /Doctor Who regulars who have been in The Bill and The Bill regulars who have been in Doctor Who/i,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Press a button to see Doctor Who regulars who have been in The Bill or The Bill regulars who have been in Doctor Who/i,
      ),
    ).toBeInTheDocument();
  });

  test('pressing the Doctor Who button should show the relevant text', async () => {
    await userEvent.click(await screen.getByRole('button', { name: /Show Doctor Who regulars/i }));
    expect(
      screen.queryByRole('heading', { name: /Doctor Who regulars who have been in The Bill/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Here are the regulars from Doctor Who who have been in The Bill and the episodes they've been in/i,
      ),
    ).toBeInTheDocument();
    expect(document.title).toEqual('Doctor Who in The Bill');
  });

  test('pressing The Bill button should show the relevant text', async () => {
    await userEvent.click(await screen.getByRole('button', { name: /Show The Bill regulars/i }));
    expect(
      screen.queryByRole('heading', { name: /The Bill regulars who have been in Doctor Who/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Here are the regulars from The Bill who have been in Doctor Who and the episodes they've been in/i,
      ),
    ).toBeInTheDocument();
    expect(document.title).toEqual('The Bill in Doctor Who');
  });

  test('Has some cards only after pressing a button', async () => {
    expect(screen.queryAllByTestId('card')).toHaveLength(0);
    await userEvent.click(await screen.getByRole('button', { name: /Show Doctor Who regulars/i }));
    expect(screen.queryAllByTestId('card')).not.toHaveLength(0);
  });
});
