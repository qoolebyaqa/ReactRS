'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { collectURL } from '../fnHelpers/fnHelpers';
import { IURL } from '../types';

function Pagination({totalLength}: {totalLength: number}) {
  
  const query = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [curPage, setCurPage] = useState<number>(1);

  useEffect(() => {
    if(query.get("page")) setCurPage(Number(query.get("page")))
  }, [query.get("page")])

  function onNext() {
    setCurPage(prev => prev+1);
    const updatedURL: IURL = {
      pathname: pathname,
      query: {page: curPage + 1}
    }
    if(query.get('checked')) updatedURL.query.checked = String(query.get('checked'))
    if(query.get('search')) updatedURL.query.search = String(query.get('search'))
    if(query.get('theme')) updatedURL.query.theme = String(query.get('theme'))
    router.push(collectURL(updatedURL))
    router.refresh()
  }
  function onPrev() {
    setCurPage(prev => prev - 1);
    const updatedURL: IURL = {
      pathname: pathname,
      query: {page: curPage - 1}
    }
    if(query.get('checked')) updatedURL.query.checked = String(query.get('checked'))
    if(query.get('search')) updatedURL.query.search = String(query.get('search'))
    if(query.get('theme')) updatedURL.query.theme = String(query.get('theme'))
    router.push(collectURL(updatedURL))
    router.refresh()
  }

  return ( 
    <div style={{display: "flex", gap: "4px", justifyContent: "center"}}>
      <button onClick={onPrev} disabled={curPage === 1}>↩</button>
      <p data-testid="test-2">{curPage}</p>
      <button onClick={onNext} disabled={curPage >= Math.ceil(totalLength / 10)}>↪</button>
    </div>);
}

export default Pagination;