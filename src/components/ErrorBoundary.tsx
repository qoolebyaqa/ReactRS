import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}
interface ErrorBoundaryState {
  error: null | Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props:ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }
  
  componentDidCatch(error: Error) {
    this.setState({
      error: error
    })
  }
  
  render() {
    if (this.state.error) {
      return (
        <h2>Something went wrong.</h2>
      );
    }
    return this.props.children;
  }  
}

export default ErrorBoundary;