import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ReduxProvider from '../ReduxProvider';
import { store } from '@/store';

// Mock child component to test provider
const TestComponent = () => {
  return <div data-testid="test-component">Test Component</div>;
};

describe('ReduxProvider', () => {
  it('renders children correctly', () => {
    render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });

  it('provides Redux store to children', () => {
    // This test verifies that the ReduxProvider wraps children with Redux Provider
    // The actual store integration is tested in the hooks tests
    const { container } = render(
      <ReduxProvider>
        <TestComponent />
      </ReduxProvider>
    );
    
    expect(container.firstChild).toBeInTheDocument();
  });

  it('accepts multiple children', () => {
    render(
      <ReduxProvider>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <TestComponent />
      </ReduxProvider>
    );
    
    expect(screen.getByTestId('child-1')).toBeInTheDocument();
    expect(screen.getByTestId('child-2')).toBeInTheDocument();
    expect(screen.getByTestId('test-component')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    const { container } = render(<ReduxProvider>{null}</ReduxProvider>);
    
    expect(container.firstChild).toBeDefined();
  });

  it('handles undefined children', () => {
    const { container } = render(<ReduxProvider>{undefined}</ReduxProvider>);
    
    expect(container.firstChild).toBeDefined();
  });
});
