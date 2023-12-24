import { render, screen } from '@testing-library/react';
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

  test('Should include name, image and at least one episode', () => {
    expect(screen.getByText(/David Tennant/i)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'assets/davidtennant.jpg');
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'David Tennant');
    expect(screen.getByText(/Deadline, Another Episode/i)).toBeInTheDocument();
  });
});
