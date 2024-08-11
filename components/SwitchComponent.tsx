'use client'
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { IURL } from "../types";
import { collectURL } from "../fnHelpers/fnHelpers";
interface ISwitchProps {
  selectedDefaultTitle: string, 
  selectedStyles: string, 
  unselectedTitle: string, 
  unselectedStyles: string,
  inputName: string,
}

function SwitchComponent({selectedDefaultTitle, selectedStyles, unselectedTitle, unselectedStyles, inputName}: ISwitchProps) {
  const query = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  function queryControl(theme: string) {
    const updatedURL: IURL = {
      pathname,
      query: {theme}
    }
    if(query.get('page')) updatedURL.query.page = Number(query.get('page'));
    if(query.get('search')) updatedURL.query.search = String(query.get('search'));
    if(query.get('checked')) updatedURL.query.checked = String(query.get('checked'))
    router.push(collectURL(updatedURL))
    router.refresh();
  }
  const [theme, setTheme] = useState<string>(query.get('theme')?.toString() || 'light')
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
