import React from 'react';
import { errorLogger } from 'utils/errorHandler/errorLogger';

interface Props {
  children: React.ReactNode;
  preview?: boolean;
  onError?: () => void;
}

class ErrorBoundary extends React.Component<Props, { hasError: boolean; isClient: boolean }> {
  constructor(props: Props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false, isClient: false };
  }
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(errorInfo);
    errorLogger({ error });
    if (this.props.onError) {
      this.props.onError();
    }
  }
  componentDidMount(): void {
    if (this.props.preview) {
      this.setState({ ...this.state, isClient: true });
    }
  }

  render() {
    /**
     * since this component only works over the client, we need to use a check
     * so this only runs in preview mode and over the client
     */
    const { hasError, isClient } = this.state;
    if (this.props.preview && !isClient) {
      return <div />;
    }
    if (hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
