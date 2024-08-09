import { useRouter } from "next/router";
import { IPokeItem } from "../types";
import { convertToCSV } from "../fnHelpers/fnHelpers";
import LinkComponent from "./LinkComponents";

function SelectedFlyoutEl({allItems}:{allItems: IPokeItem[]}) {
  const router = useRouter();
  const itemsToDownload:IPokeItem[] = [];
  if (router.query.checked) {
    const selectedFromURL:string[] =  JSON.parse(router.query.checked as string)
    selectedFromURL.forEach((val:string) => {
      const itemToPush = allItems.find(item => item.name===val)
      if (itemToPush) itemsToDownload.push(itemToPush);
    })
  }  
  const csv = convertToCSV(itemsToDownload);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

  function handleUnselect() {
    const updatedURL = {
      pathname: router.pathname,
      query: {
        ...router.query
      }
    }
    delete updatedURL.query.checked;
    router.push(updatedURL)
  }
  return ( <div  className={`animateEL ${router.query.theme === 'dark' ? 'dark' : ''}`}>
    <p>{itemsToDownload.length} items are selected</p>
    <div>
      <button onClick={handleUnselect} style={{marginRight: "20px"}}>Unselect All</button>
      <LinkComponent file={blob} download={`${itemsToDownload.length}_pokemon${itemsToDownload.length > 1 ? 's' : ''}.csv`}>
      <button>Download</button></LinkComponent>
    </div>
  </div> );
}

export default SelectedFlyoutEl;