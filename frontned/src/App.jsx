import Dashboard from './components/Dashboard/Dashboard';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import './styles/tokens.css';

function App() {
  return (
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  );
}

export default App;
