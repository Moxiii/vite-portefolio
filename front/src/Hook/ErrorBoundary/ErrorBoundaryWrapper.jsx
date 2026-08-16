import { useNavigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

export default function ErrorBoundaryWrapper({ children }) {
  const navigate = useNavigate();
  return <ErrorBoundary navigate={navigate}>{children}</ErrorBoundary>;
}