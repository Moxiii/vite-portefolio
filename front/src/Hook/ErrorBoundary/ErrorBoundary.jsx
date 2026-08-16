import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Une erreur a été capturée dans ErrorBoundary:", error, errorInfo);
    this.props.navigate("/404", {state: { error:error.message }});
  }

  render() {
    if (this.state.hasError) {
      return null
    }

    return this.props.children;
  }
}



