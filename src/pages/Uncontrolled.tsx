import { FormEvent, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { collectChanges, convertTo64, formSchema, inputs } from '../helpers';
import { ValidationError } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../store/formSlice';
import { GlobalStateType, IFormData } from '../types';
import { useNavigate } from 'react-router';




function Uncontrolled() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const uncotrolledForm = useSelector(
    (state: GlobalStateType) => state.formStore.uncontrolledForm
  );
  const uploadedFile = useSelector(
    (state: GlobalStateType) => state.formStore.uploadedFile
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (formRef.current) {
      const formData = {
        ...Object.fromEntries(new FormData(formRef.current).entries()),
      }
      formData.acceptTerms !== '' ? formData.acceptTerms = '' : formData.acceptTerms = 'checked' 
      try {
        const validForm = await formSchema.isValid(formData);
        if (validForm) {          
          const changes = await collectChanges(uncotrolledForm, formData)
          const fileStr = (formData.avatar as File).name !== '' && await convertTo64(formData.avatar as File)
          if((fileStr !== uploadedFile) && fileStr) { changes?.push({title: 'avatar', value: fileStr.toString()})}
          dispatch(formActions.setChangedKeys(changes));
          setErrors({});
          delete formData.avatar;
          dispatch(formActions.setUncontrolForm(formData));
          if(fileStr) dispatch(formActions.setUploadedFile(fileStr));
          navigate('/ReactRS/?form=unctrl')
        } else {
          await formSchema.validate(formData, { abortEarly: false });
        }
      } catch (validationError) {
        if (validationError instanceof ValidationError) {
          const newErrors: { [key: string]: string } = {};
          validationError.inner.forEach((err) => {
            if (err.path) {
              newErrors[err.path] = err.message;
            }
          });
          setErrors(newErrors);
        }
      }
    } 
  }
  return (
    <section
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h2>Uncontrolled</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: '50%',
        }}
        ref={formRef}
      >
        {inputs.map((input) => {
          return (
            <div
              key={input.id}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <CustomInput
                label={input.label}
                labelValue={input.labelValue}
                type={input.type}
                defaultValue={uncotrolledForm ? uncotrolledForm[input.label as keyof IFormData] as string : ''} 
              />
              {errors[input.label] ? (
                <p style={{ height: '20px', alignSelf: 'end', color: 'red' }} className='error'>
                  {errors[input.label]}
                </p>
              ) : (
                <p style={{ height: '20px', alignSelf: 'end', color: 'green' }}></p>
              )}
            </div>
          );
        })}
        <CustomInput type='file' label='avatar' labelValue='Upload avatar'/>
        {errors.avatar ? (
                <p style={{ height: '20px', alignSelf: 'end', color: 'red' }} className='error'>
                  {errors.avatar}
                </p>
              ) : (
                <p style={{ height: '20px', alignSelf: 'end', color: 'green' }}></p>
              )}
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </section>
  );
}

export default Uncontrolled;
