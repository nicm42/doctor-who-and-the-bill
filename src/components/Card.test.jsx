import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Card from './Card';

describe('Testing set up', () => {
  beforeEach(() => {
    render(
      <Card
        name="David Tennant"
        imgsrc="davidtennant.jpg"
        imgalt="David Tennant"
        episodes={['Deadline', 'Another Episode']}
      />,
    );
  });

  test('Should include name, image and button to open episodes', () => {
    expect(screen.getByText(/David Tennant/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'assets/davidtennant.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'David Tennant');
    expect(screen.getByRole('button', { name: /Show episodes/i })).toBeInTheDocument;
  });

  test('Should show episodes after Show episodes button pressed', async () => {
    await userEvent.click(await screen.getByRole('button', { name: /Show episodes/i }));
    expect(screen.getByRole('list', { name: /Episode list/i })).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    //expect(screen.getByText(/Deadline, Another Episode/i)).toBeInTheDocument();
  });

  test('Should close episodes after Close button pressed', async () => {
    await userEvent.click(await screen.getByRole('button', { name: /Show episodes/i }));
    await userEvent.click(await screen.getByLabelText('Close'));
    // Need to wait due to timeout before closing
    await waitFor(() => expect(screen.queryByRole('list', { name: /Episode list/i })).not.toBeInTheDocument());
  });

  test('Should close episodes after Overlay pressed', async () => {
    await userEvent.click(await screen.getByRole('button', { name: /Show episodes/i }));
    await userEvent.click(await screen.getByTestId('card-overlay'));
    // Need to wait due to timeout before closing
    await waitFor(() => expect(screen.queryByRole('list', { name: /Episode list/i })).not.toBeInTheDocument());
  });

  test('Should close episodes after Escape key pressed', async () => {
    await userEvent.click(await screen.getByRole('button', { name: /Show episodes/i }));
    await fireEvent.keyDown(document, { key: 'Escape' });
    // Need to wait due to timeout before closing
    await waitFor(() => expect(screen.queryByRole('list', { name: /Episode list/i })).not.toBeInTheDocument());
  });
});
