import { render } from '@testing-library/react';
import App from './App';

describe('Testing set up', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('should work', () => {
    expect(true).toBeTruthy();
  });
});
