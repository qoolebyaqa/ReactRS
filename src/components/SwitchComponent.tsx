import { useContext } from "react";
import { MyThemeContext } from "../App";
interface ISwitchProps {
  selectedDefaultTitle: string, 
  selectedStyles: string, 
  unselectedTitle: string, 
  unselectedStyles: string,
  inputName: string,
}

function SwitchComponent({selectedDefaultTitle, selectedStyles, unselectedTitle, unselectedStyles, inputName}: ISwitchProps) {
  const {theme, updateTheme} = useContext(MyThemeContext);
  return (
    <>
      <div className="hidden">
        <label htmlFor={inputName}>
          <input type="checkbox" name={inputName} id={inputName} checked={theme} onChange={() => {}}/>
          <input type="checkbox" name={inputName} id={inputName + '1'} checked={!theme} onChange={() => {}}/>
        </label>
      </div>
      <div className="flex justify-center w-full">
        <button className={`rounded-r-xl w-2/4 ${!theme ? selectedStyles : unselectedStyles}`}  onClick={() => updateTheme(false)}>{unselectedTitle}</button>
        <button className={`rounded-l-xl w-2/4 ${theme ? selectedStyles : unselectedStyles}`} onClick={() => updateTheme(true)}>{selectedDefaultTitle}</button>
      </div>
    </>
  );
}

export default SwitchComponent;
