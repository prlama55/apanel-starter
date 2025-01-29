/**
 *
 * App.js
 *
 */
import * as React from 'react';

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
  // @ts-expect-error ignore
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // @ts-expect-error ignore
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // @ts-expect-error ignore
  componentDidCatch(error, errorInfo) {
    console.error('🔥 Suspense Error Caught:', error, errorInfo);
  }

  render() {
    // @ts-expect-error ignore
    if (this.state.hasError) {
      return <div style={{ color: 'red' }}>Something went wrong! Check the console.</div>;
    }

    // @ts-expect-error ignore
    return this.props.children;
  }
}

const App = ({ strapi, store }: AppProps) => {
  React.useEffect(() => {
    const language = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY) || 'en';

    if (language) {
      document.documentElement.lang = language;
    }
  }, []);

  return (
    <Providers strapi={strapi} store={store}>
      <ErrorBoundary>
        <React.Suspense
          fallback={
            <div>
              {console.log('Suspense got me loaidng...')}
              <Page.Loading />
            </div>
          }
        >
          <Outlet />
        </React.Suspense>
      </ErrorBoundary>
    </Providers>
  );
};

export { App };
export type { AppProps };
