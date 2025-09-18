import { render, screen } from '@testing-library/react';
import Home from '../page';

// Mock InsightCard
jest.mock('../../components/InsightCard', () => {
  return function MockInsightCard() {
    return <div data-testid="insight-card">Insight Card Component</div>;
  };
});

describe('Home Page', () => {
  it('renders InsightCard component', () => {
    render(<Home />);
    
    expect(screen.getByTestId('insight-card')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    const { container } = render(<Home />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
});
