
interface ISwitchProps {
  selectedDefaultTitle: string, 
  selectedStyles: string, 
  unselectedTitle: string, 
  unselectedStyles: string,
  inputName: string,
  changeState: (val:boolean) => void,
  stateVisible: boolean
}

function SwitchComponent({selectedDefaultTitle, selectedStyles, unselectedTitle, unselectedStyles, inputName, changeState, stateVisible}: ISwitchProps) {
  return (
    <>
      <div className="hidden">
        <label htmlFor={inputName}>
          <input type="checkbox" name={inputName} id={inputName} checked={stateVisible} onChange={() => {}}/>
          <input type="checkbox" name={inputName} id={inputName + '1'} checked={!stateVisible} onChange={() => {}}/>
        </label>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '60px'}}>
        <button className={` ${!stateVisible ? selectedStyles : unselectedStyles}`}  onClick={() => changeState(false)}>{unselectedTitle}</button>
        <button className={`${stateVisible ? selectedStyles : unselectedStyles}`} onClick={() => changeState(true)}>{selectedDefaultTitle}</button>
      </div>
    </>
  );
}

export default SwitchComponent;
