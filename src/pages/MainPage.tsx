import { Link, useSearchParams } from 'react-router-dom';
import CntrlPresentation from '../components/CntrlPresentation';
import UnctrlPresentation from '../components/UnctrlPresentation';

function MainPage() {
  const [searchParams] = useSearchParams();
  return (
    <>
      <h2>Main Page</h2>
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/ReactRS/?form=unctrl">
          <button>Uncontrolled</button>
        </Link>
        <Link to="/ReactRS/?form=ctrl">
          <button>React Hook Form</button>
        </Link>
      </div>
      {searchParams.get('form') === 'unctrl' && <UnctrlPresentation />}
      {searchParams.get('form') === 'ctrl' && <CntrlPresentation />}
    </>
  );
}

export default MainPage;