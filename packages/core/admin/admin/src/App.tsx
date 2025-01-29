/**
 *
 * App.js
 *
 */
import { Suspense, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { Page } from './components/PageHelpers';
import { Providers } from './components/Providers';
import { LANGUAGE_LOCAL_STORAGE_KEY } from './reducer';

import type { Store } from './core/store/configure';
import type { StrapiApp } from './StrapiApp';

interface AppProps {
  strapi: StrapiApp;
  store: Store;
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🔥 Suspense Error Caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red' }}>Something went wrong! Check the console.</div>;
    }

    return this.props.children;
  }
}
F;

const App = ({ strapi, store }: AppProps) => {
  useEffect(() => {
    const language = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY) || 'en';

    if (language) {
      document.documentElement.lang = language;
    }
  }, []);

  return (
    <Providers strapi={strapi} store={store}>
      <ErrorBoundary>
        <Suspense
          fallback={
            <>
              {console.log('Suspense got me loaidng...')}
              <Page.Loading />
            </>
          }
        >
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </Providers>
  );
};

export { App };
export type { AppProps };
