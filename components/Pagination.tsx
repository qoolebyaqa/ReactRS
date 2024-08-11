import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

function Pagination({totalLength}: {totalLength: number}) {
  const router = useRouter();
  const [curPage, setCurPage] = useState<number>(1);

  useEffect(() => {
    if(router.query.page) setCurPage(Number(router.query.page))
  }, [router.query.page])

  function onNext() {
    setCurPage(prev => prev+1);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page: curPage + 1}
    })
  }
  function onPrev() {
    setCurPage(prev => prev - 1);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page: curPage - 1}
    })
  }

  return ( 
    <div style={{display: "flex", gap: "4px", justifyContent: "center"}}>
      <button onClick={onPrev} disabled={curPage === 1}>↩</button>
      <p data-testid="test-2">{curPage}</p>
      <button onClick={onNext} disabled={curPage >= Math.ceil(totalLength / 10)}>↪</button>
    </div>);
}

export default Pagination;