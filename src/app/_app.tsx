import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import ErrorBoundary from '../components/ErrorBoundary';

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Layout: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  return (
    <ErrorBoundary>
    <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;