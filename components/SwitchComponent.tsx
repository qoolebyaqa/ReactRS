import { useRouter } from "next/router";
import { useState } from "react";
interface ISwitchProps {
  selectedDefaultTitle: string, 
  selectedStyles: string, 
  unselectedTitle: string, 
  unselectedStyles: string,
  inputName: string,
}

function SwitchComponent({selectedDefaultTitle, selectedStyles, unselectedTitle, unselectedStyles, inputName}: ISwitchProps) {
  const router = useRouter();
  function queryControl(theme: string) {
    const updatedURL = {
      pathname: router.pathname,
      query: {...router.query, theme: theme}
    }
    router.push(updatedURL)
  }
  const [theme, setTheme] = useState<string>(router.query.theme?.toString() || 'light')
  return (
    <>
      <div style={{visibility: "hidden"}}>
        <label htmlFor={inputName}>
          <input type="checkbox" name={inputName} id={inputName} checked={theme === 'light'} onChange={() => {}}/>
          <input type="checkbox" name={inputName} id={inputName + '1'} checked={theme === 'dark'} onChange={() => {}}/>
        </label>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
        <button className={`${theme === 'light' ? selectedStyles : unselectedStyles}`}  onClick={() => {setTheme('light'); queryControl('light')}}>{unselectedTitle}</button>
        <button className={`${theme === 'dark' ? selectedStyles : unselectedStyles}`} onClick={() => {setTheme('dark'); queryControl('dark')}}>{selectedDefaultTitle}</button>
      </div>
    </>
  );
}

export default SwitchComponent;
