import { render, screen } from '@testing-library/react';
import RootLayout from '../layout';

// Mock ReduxProvider
jest.mock('../../providers/ReduxProvider', () => {
  return function MockReduxProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid="redux-provider">{children}</div>;
  };
});

// Mock fonts
jest.mock('next/font/google', () => ({
  Geist: () => ({
    variable: '--font-geist-sans',
  }),
  Geist_Mono: () => ({
    variable: '--font-geist-mono',
  }),
}));

describe('RootLayout', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div data-testid="test-child">Test Content</div>
      </RootLayout>
    );
    
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
    expect(screen.getByTestId('redux-provider')).toBeInTheDocument();
  });

  it('applies correct font variables', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );
    
    const body = container.querySelector('body');
    expect(body).toHaveClass('antialiased');
  });

  it('has correct HTML structure', () => {
    const { container } = render(
      <RootLayout>
        <div>Test</div>
      </RootLayout>
    );
    
    expect(container.querySelector('html')).toHaveAttribute('lang', 'en');
    expect(container.querySelector('body')).toBeInTheDocument();
  });

  it('wraps children with ReduxProvider', () => {
    render(
      <RootLayout>
        <div data-testid="content">Content</div>
      </RootLayout>
    );
    
    const reduxProvider = screen.getByTestId('redux-provider');
    expect(reduxProvider).toBeInTheDocument();
    expect(screen.getByTestId('content')).toBeInTheDocument();
  });
});
