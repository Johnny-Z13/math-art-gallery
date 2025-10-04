import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 bg-[var(--bg-primary)] flex items-center justify-center p-8">
          <div className="glass rounded-2xl p-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-gradient mb-4">
              ⚠️ Something went wrong
            </h1>
            <p className="text-[var(--text-secondary)] mb-6">
              The mathematical art generator encountered an error. Please refresh the page to continue.
            </p>
            <div className="bg-[var(--bg-secondary)] p-4 rounded-lg mb-6 font-mono text-sm text-[var(--text-tertiary)] overflow-auto max-h-48">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="py-3 px-6 rounded-lg font-medium bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white btn-hover transition-all duration-200"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
