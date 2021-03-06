import React from 'react';
import ErrorRenderer from './Error';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState((preState) => ({
      ...preState,
      hasError: [error, info.componentStack],
    }));
  }
  componentDidUpdate(prevProps) {
    const { children } = this.props;
    if (children !== prevProps.children) {
      this.setState({ hasError: undefined }); // eslint-disable-line react/no-did-update-set-state
    }
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return <ErrorRenderer>{hasError}</ErrorRenderer>;
    }
    return this.props.children;
  }
}
