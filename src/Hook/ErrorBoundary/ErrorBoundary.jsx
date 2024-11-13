import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Met à jour l'état pour afficher le message d'erreur
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez enregistrer l'erreur ici
    console.error("Une erreur a été capturée dans ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quel message d'erreur personnalisé
      return (
        <>
          <h1>oops</h1>
        </>
      );
    }

    return this.props.children;
  }
}

// Export par défaut
export default ErrorBoundary;
