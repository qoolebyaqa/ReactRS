import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { collectChangesHook, convertTo64, formSchema, inputs } from '../helpers';
import ControlledInput from '../components/ControlledInput';
import { GlobalStateType, IFormInputs } from '../types';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../store/formSlice';
import { useNavigate } from 'react-router';
function Controlled() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cotrolledForm = useSelector(
    (state: GlobalStateType) => state.formStore.controlledForm
  );
  const uploadedFile = useSelector(
    (state: GlobalStateType) => state.formStore.uploadedFileControlled
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange",
    resolver: yupResolver(formSchema),
  });
  async function submitHandler(formData: IFormInputs) {
    formData.acceptTerms === 'false' ? formData.acceptTerms = '' : formData.acceptTerms = 'checked' 
    const changes = await collectChangesHook(cotrolledForm, formData)
    const fileStr = (formData.avatar as unknown as FileList)[0] && await convertTo64((formData.avatar as unknown as FileList)[0])
    if((fileStr !== uploadedFile) && fileStr) { changes?.push({title: 'avatar', value: fileStr.toString()})}
    dispatch(formActions.setChangedKeysControlled(changes));
    delete formData.avatar;
    dispatch(formActions.setControlledForm(formData));
    if(fileStr) dispatch(formActions.setUploadedFileControlled(fileStr));    
    navigate('/ReactRS/?form=ctrl')       
  }
  return (
    <section
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>React hook form</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: '50%',
        }}
        onSubmit={handleSubmit(submitHandler)}
      >
        {inputs.map((input) => {
          return (
            <div
              key={input.id}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <ControlledInput
                {...register(input.label as keyof IFormInputs)}
                defaultValue={cotrolledForm ? cotrolledForm[input.label as keyof IFormInputs] as string : ''}
                label={input.label}
                labelValue={input.labelValue}
                type={input.type}
              />
              {errors[input.label as keyof IFormInputs] ? (
                <p
                  style={{ height: '20px', alignSelf: 'end', color: 'red' }}
                  className="error"
                >
                  {errors[input.label as keyof IFormInputs]?.message}
                </p>
              ) : (
                <p
                  style={{ height: '20px', alignSelf: 'end', color: 'green' }}
                ></p>
              )}
            </div>
          );
        })}
        <ControlledInput
          type="file"
          label="avatar"
          labelValue="Upload avatar"
          {...register("avatar")}
        />
        {errors.avatar ? (
          <p style={{ height: '20px', alignSelf: 'end', color: 'red' }} className='error'>
            {errors.avatar.message}
          </p>
        ) : (
          <p style={{ height: '20px', alignSelf: 'end', color: 'green' }}></p>
        )}
        <button disabled={Object.keys(errors).length > 0}>Submit</button>
      </form>
    </section>
  );
}

export default Controlled;
