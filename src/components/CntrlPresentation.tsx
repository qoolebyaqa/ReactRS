import { useSelector } from "react-redux";
import { GlobalStateType, Ichanges } from "../types";

function CntrlPresentation() {
  const controlledForm = useSelector(
    (state: GlobalStateType) => state.formStore.controlledForm
  );
  const base64Img = useSelector(
    (state: GlobalStateType) => state.formStore.uploadedFileControlled
  );
  const changesSelector = useSelector(
    (state: GlobalStateType) => state.formStore.changedKeysControlled
  );

  const changes = changesSelector.map((val:Ichanges) => val.title); 
  if(controlledForm)
    return (
      <>
        {(Object.values(controlledForm).filter(val => val !== '').length > 0 || base64Img !== '') && (
          <>
          <h3>React Hook Form</h3>
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
                  {controlledForm?.name
                    ? controlledForm.name
                    : 'YOUR NAME ______________________'}
                </h2>
                <h3 className={changes.includes('age') ? 'changeItem' : ''}>
                  {controlledForm?.age
                    ? controlledForm?.age
                    : 'YOUR AGE ______________________'}
                </h3>
                <h3 className={changes.includes('email') ? 'changeItem' : ''}>
                  {controlledForm?.email
                    ? controlledForm.email
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
                <p className={changes.includes('gender') ? 'changeItem' : ''}>{controlledForm?.gender ? `Your gender: ${controlledForm.gender}` : 'Your gender: ______________________'}</p>
                <div className={changes.includes('password') ? 'changeItem' : ''}>
                {controlledForm?.password ? (
                  <>
                    <p>Your pass: {controlledForm.password}</p>
                    <p>Confirmed as: {controlledForm.confrimPassword}</p>
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
                  {controlledForm?.acceptTerms
                    ? 'You agreed terms and conditions ✓'
                    : 'Please place acceptance on terms and conditions'}
                </p>
                <p className={changes.includes('country') ? 'changeItem' : ''}>
                  {controlledForm?.country
                    ? `You are from ${controlledForm.country}`
                    : 'You are from ______________________'}
                </p>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

export default CntrlPresentation;