'use client'
import { IPokeItem, Iquery, IURL } from "../types";
import { collectURL, convertToCSV } from "../fnHelpers/fnHelpers";
import LinkComponent from "./LinkComponents";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function SelectedFlyoutEl({allItems, searchParams}:{allItems: IPokeItem[], searchParams?: Iquery}) {
  const router = useRouter();
  const query = useSearchParams();  
  const pathname = usePathname();
  const itemsToDownload:IPokeItem[] = [];
  if (query.get('checked')) {
    const selectedFromURL:string[] =  JSON.parse(query.get('checked') as string)
    selectedFromURL.forEach((val:string) => {
      const itemToPush = allItems.find(item => item.name===val)
      if (itemToPush) itemsToDownload.push(itemToPush);
    })
  }  
  const csv = convertToCSV(itemsToDownload);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })

  function handleUnselect() {
    const updatedURL: IURL = {
      pathname: pathname,
      query: {}
    }
    if(query.get('page')) updatedURL.query.page = Number(searchParams?.page);
    if(query.get('search')) updatedURL.query.search = String(searchParams?.search);
    if(query.get('theme')) updatedURL.query.theme = String(searchParams?.theme)
    delete updatedURL.query.checked
    router.push(collectURL(updatedURL));
    router.refresh();
  }
  return ( <div  className={`animateEL ${searchParams?.theme === 'dark' ? 'dark' : ''}`}>
    <p>{itemsToDownload.length} items are selected</p>
    <div>
      <button onClick={handleUnselect} style={{marginRight: "20px"}}>Unselect All</button>
      <LinkComponent file={blob} download={`${itemsToDownload.length}_pokemon${itemsToDownload.length > 1 ? 's' : ''}.csv`}>
      <button>Download</button></LinkComponent>
    </div>
  </div> );
}

export default SelectedFlyoutEl;