import { useSelector } from 'react-redux';
import { GlobalStateType, Ichanges } from '../types';

function UnctrlPresentation() {
  const uncotrolledForm = useSelector(
    (state: GlobalStateType) => state.formStore.uncontrolledForm
  );
  const base64Img = useSelector(
    (state: GlobalStateType) => state.formStore.uploadedFile
  );
  const changesSelector = useSelector(
    (state: GlobalStateType) => state.formStore.changedKeys
  );
  const changes = changesSelector.map((val:Ichanges) => val.title);
  if(uncotrolledForm)
  return (
    <>
      {(Object.values(uncotrolledForm).filter(val => val !== '').length > 0 || base64Img !== '') && (
        <>
          <h3>Uncontrolled form</h3>
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '50px' }}
          >
            <div
              className={changes.includes('avatar') ? 'changeItem' : ''}
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
              <h2 
              className={changes.includes('name') ? 'changeItem' : ''}>
                {uncotrolledForm?.name
                  ? uncotrolledForm.name
                  : 'YOUR NAME ______________________'}
              </h2>
              <h3 className={changes.includes('age') ? 'changeItem' : ''}>
                {uncotrolledForm?.age
                  ? uncotrolledForm?.age
                  : 'YOUR AGE ______________________'}
              </h3>
              <h3 className={changes.includes('email') ? 'changeItem' : ''}>
                {uncotrolledForm?.email
                  ? uncotrolledForm.email
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
              <p className={changes.includes('gender') ? 'changeItem' : ''}>{uncotrolledForm?.gender ? `Your gender: ${uncotrolledForm.gender}` : 'Your gender: ______________________'}</p>
              <div className={changes.includes('password') ? 'changeItem' : ''}>
              {uncotrolledForm?.password ? (
                <>
                  <p>Your pass: {uncotrolledForm.password}</p>
                  <p>Confirmed as: {uncotrolledForm.confrimPassword}</p>
                </>
              ) : (
                <>
                  <p>Your pass: ______________________</p>
                  <p>Confirmed as: ______________________</p>
                </>
              )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '20px',
              }}
            >
              <p className={changes.includes('acceptTerms') ? 'changeItem' : ''}>
                {uncotrolledForm?.acceptTerms
                  ? 'You agreed terms and conditions ✓'
                  : 'Please place acceptance on terms and conditions'}
              </p>
              <p className={changes.includes('country') ? 'changeItem' : ''}>
                {uncotrolledForm?.country
                  ? `You are from ${uncotrolledForm.country}`
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
