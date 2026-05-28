import { Component } from "react";

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>Something went wrong.</h2>
          <button onClick={() => (window.location.href = "/")}>
            Go back to start
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
