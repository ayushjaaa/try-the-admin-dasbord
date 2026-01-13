import React from 'react';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught by boundary:', error, errorInfo);
        this.state = { error, errorInfo };
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div className="error-content">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        <h2>Oops! Something went wrong</h2>
                        <p>We're sorry for the inconvenience. The application encountered an unexpected error.</p>
                        {this.state.error && (
                            <details className="error-details">
                                <summary>Error Details</summary>
                                <pre>{this.state.error.toString()}</pre>
                            </details>
                        )}
                        <div className="error-actions">
                            <button className="reset-btn" onClick={this.handleReset}>
                                Try Again
                            </button>
                            <button className="home-btn" onClick={() => window.location.href = '/'}>
                                Go Home
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
