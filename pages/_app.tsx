import { AppProps } from 'next/app';
import '../index.css';
import { NextComponentType, NextPageContext } from 'next';

type AppPropsWithLayout = AppProps & {
  Component: NextComponentType<NextPageContext> & {
    Layout: React.ComponentType;
  };
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  return (
    <Component {...pageProps} />
  );
}

export default MyApp;