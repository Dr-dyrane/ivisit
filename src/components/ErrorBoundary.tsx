import React, { Component, ErrorInfo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Container } from './ui/Container';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center transition-colors duration-300">
          <Container>
            <Card className="max-w-2xl mx-auto text-center py-12">
              <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Something went wrong</h2>
              <p className="text-muted-foreground mb-8">
                {this.state.error?.message || 'We apologize for the inconvenience. Please try refreshing the page.'}
              </p>
              <Button
                onClick={() => window.location.reload()}
                variant="accent"
              >
                Refresh Page
              </Button>
            </Card>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}