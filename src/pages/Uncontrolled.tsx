import { FormEvent, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { convertTo64, formSchema, inputs } from '../helpers';
import { ValidationError } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { formActions } from '../store/formSlice';
import { GlobalStateType, IFormData } from '../types';




function Uncontrolled() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 
  const uncotrolledForm: IFormData = useSelector(
    (state: GlobalStateType) => state.formStore.uncontrolledForm
  );
  const uploadedFile = useSelector(
    (state: GlobalStateType) => state.formStore.uploadedFile
  );
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (formRef.current) {
      const formData: IFormData = {
        ...Object.fromEntries(new FormData(formRef.current).entries()),
      };
      let base64Img = uploadedFile || ''
      if (formData.acceptTerms === '') formData.acceptTerms = 'confirmed';
      if ((formData.avatar as File).name === '') {
        delete formData.avatar;
      } else {
        const fileSize = (formData.avatar as File).size;
        const fileName = (formData.avatar as File).name;
        const base64 = await convertTo64(formData.avatar as Blob);
        base64Img = base64 ? base64.toString() : ''
        formData.avatar = {
          size: fileSize,
          name: fileName,
          baseImg: base64 ? base64 : '',
        };
      }
      if(formData.password && formData.confrimPassword === '') formData.confrimPassword = ' '
      for (const prop in formData) {
        if (formData[prop] === '' && prop) delete formData[prop];
      }
      try {
        const validForm = await formSchema.isValid(formData);
        if (validForm) {
          setErrors({});
          dispatch(formActions.setUncontrolForm(formData));
          dispatch(formActions.setUploadedFile(base64Img));
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
                defaultValue={uncotrolledForm[input.label] as string}
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
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </section>
  );
}

export default Uncontrolled;
