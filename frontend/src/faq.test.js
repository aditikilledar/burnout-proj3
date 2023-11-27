import { render, screen } from '@testing-library/react';
import FAQ from './components/faq';

test('renders the landing page', () => {
  render(<FAQ />);
});