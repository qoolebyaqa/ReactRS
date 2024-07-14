import { Outlet, useNavigation } from 'react-router';
import MainComponent from '../components/MainComponent';
import ErrorBoundary from '../components/ErrorBoundary';

function RootLayout() {
  const navigation = useNavigation();
  return (
    <>
      <main style={{ display: 'flex', margin: '0 auto' }}  data-testid="main-item">
        <ErrorBoundary>
        <MainComponent /></ErrorBoundary>
        {navigation.state === 'loading' ? <p style={{
        border: 'solid 1px',
        borderRadius: '15px',
        color: 'black',
        background: 'white',
        padding: '5px',
        marginTop: '210px',
        height: '400px',
        width: '300px',
      }}>Loading... -_-</p> : <Outlet />}
      </main>
    </>
  );
}

export default RootLayout;
