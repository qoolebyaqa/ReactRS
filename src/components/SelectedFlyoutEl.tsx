import { useDispatch, useSelector } from "react-redux";
import { GlobalStateType } from "../types";
import { pokeActions } from "../store/PokeSlice";

function SelectedFlyoutEl() {
  const selectedItems = useSelector((state: GlobalStateType) => state.PokeStore.selectedItems)
  const blobUrl = useSelector((state: GlobalStateType) => state.PokeStore.blobUrl)
  const dispatch = useDispatch();
  function handleUnselect() {
    dispatch(pokeActions.clearSelectedItems())
  }
  return ( <div className="animateEL">
    <p>{selectedItems.length} items are selected</p>
    <div>
      <button onClick={handleUnselect} style={{marginRight: "20px"}}>Unselect All</button>
      <button><a href={blobUrl} download={`${selectedItems.length}_pokemon${selectedItems.length > 1 ? 's' : ''}.csv`}>Download</a></button>
    </div>
  </div> );
}

export default SelectedFlyoutEl;