import { useSelector } from 'react-redux';
import { GlobalStateType, IFormData } from '../types';

function UnctrlPresentation() {
  const uncotrolledForm: IFormData = useSelector(
    (state: GlobalStateType) => state.formStore.uncontrolledForm
  );
  const base64Img = useSelector(
    (state: GlobalStateType) => state.formStore.uploadedFile
  );
  return (
    <>
      {(Object.keys(uncotrolledForm).length > 0 || base64Img !== '') && (
        <>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}
          >
            <div
              style={{
                width: '320px',
                border: '2px solid #7cbbc0',
                borderRadius: '10px',
              }}
            >
              {base64Img ? (
                <img
                  src={base64Img}
                  alt='picture'
                  style={{ width: '80%' }}
                />
              ) : (
                <div>You did not upload the picture</div>
              )}
            </div>
            <div>
              <h2>
                {uncotrolledForm.name?.toString()
                  ? uncotrolledForm.name?.toString()
                  : 'YOUR NAME ______________________'}
              </h2>
              <h3>
                {uncotrolledForm.age?.toString()
                  ? uncotrolledForm.age?.toString()
                  : 'YOUR AGE ______________________'}
              </h3>
              <h3>
                {uncotrolledForm.email?.toString()
                  ? uncotrolledForm.email?.toString()
                  : 'YOUR EMAIL ______________________'}
              </h3>
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '50px',
              marginTop: '50px',
              fontSize: '22px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '20px',
              }}
            >
              <div>{uncotrolledForm.gender?.toString() ? `Your gender: ${uncotrolledForm.gender?.toString()}` : 'Your gender: ______________________'}</div>
              {uncotrolledForm.password?.toString() ? (
                <>
                  <p>Your pass: {uncotrolledForm.password?.toString()}</p>
                  <p>Confirmed as: {uncotrolledForm.confrimPassword?.toString()}</p>
                </>
              ) : (
                <>
                  <p>Your pass: ______________________</p>
                  <p>Confirmed as: ______________________</p>
                </>
              )}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '20px',
              }}
            >
              <p>
                {uncotrolledForm.acceptTerms?.toString()
                  ? 'You agreed terms and conditions ✓'
                  : 'Please place acceptance on terms and conditions'}
              </p>
              <p>
                {uncotrolledForm.country?.toString()
                  ? `You are from ${uncotrolledForm.country?.toString()}`
                  : 'You are from ______________________'}
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default UnctrlPresentation;
