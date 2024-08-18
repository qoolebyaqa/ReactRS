import { useSelector } from "react-redux";
import { GlobalStateType } from "../types";
import { forwardRef } from "react";
interface ICustomInput {
  type: string,
  label: string,
  labelValue: string,
  placeholder?: string,
  defaultValue?: string
}

const ControlledInput = forwardRef<HTMLInputElement | HTMLSelectElement, ICustomInput>(({ type, label, labelValue, placeholder, defaultValue, ...props }: ICustomInput, ref) => {
  const countries = useSelector((state:GlobalStateType) => state.formStore.countryList)
  switch (type) {
    case 'select': {
      return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <label htmlFor={label}>{labelValue}</label>
        <select name={label} id={label} defaultValue={defaultValue ? defaultValue : ''} ref={ref as React.Ref<HTMLSelectElement>} {...props} >
          <option/>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>)
    }
    case 'datalist': {
      return (
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <label htmlFor={label}>{labelValue}</label>
        <input list={type} id={label} name={label} defaultValue={defaultValue ? defaultValue : ''} ref={ref as React.Ref<HTMLInputElement>} {...props}/>
        <datalist id={type}>
          {countries.map(country => 
            <option value={country} key={country}/>
          )}
       </datalist>
      </div>)
    }
    default: {
      return (
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <label htmlFor={label}>{labelValue}</label>
          <input type={type} placeholder={placeholder}  defaultValue={defaultValue ? defaultValue : ''} defaultChecked={!!defaultValue} id={label} name={label}  {...props} ref={ref as React.Ref<HTMLInputElement>}
          onWheel={type === 'number' ? (e: React.WheelEvent<HTMLInputElement>) => (e.target as HTMLInputElement).blur():() => {}}/>
        </div>
      );
    }
  }
})

export default ControlledInput;
